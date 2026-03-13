// Deezer API Helper Module
// No API key required - works on GitHub Pages

class DeezerAPI {
    constructor() {
        this.baseURL = "https://api.deezer.com";
        this.cache = new Map();
        this.jsonpTimeoutMs = 8000;
        this.cacheTTLms = 7 * 24 * 60 * 60 * 1000; // 7 days
        this.storageKey = "deezer_artist_cache_v1";
        this.persistentCache = {};

        this.loadPersistentCache();
    }

    loadPersistentCache() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) return;

            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== "object") return;

            const now = Date.now();
            const hydrated = {};

            Object.entries(parsed).forEach(([key, entry]) => {
                if (!entry || typeof entry !== "object") return;

                const { ts, data } = entry;
                if (!ts || !data) return;

                if (now - ts <= this.cacheTTLms) {
                    hydrated[key] = entry;
                    this.cache.set(key, data);
                }
            });

            this.persistentCache = hydrated;
            localStorage.setItem(
                this.storageKey,
                JSON.stringify(this.persistentCache),
            );
        } catch {
            // Ignore localStorage failures (privacy mode, quota, etc.)
        }
    }

    saveCacheEntry(cacheKey, data) {
        try {
            this.persistentCache[cacheKey] = { ts: Date.now(), data };
            localStorage.setItem(
                this.storageKey,
                JSON.stringify(this.persistentCache),
            );
        } catch {
            // Ignore localStorage failures (privacy mode, quota, etc.)
        }
    }

    /**
     * Deezer client-side JSONP request helper (works on static hosting)
     * @param {string} endpoint - API endpoint path, e.g. /artist/27
     * @returns {Promise<Object>} Parsed Deezer payload
     */
    jsonpRequest(endpoint) {
        return new Promise((resolve, reject) => {
            const callbackName = `deezerJsonp_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
            const script = document.createElement("script");
            let isSettled = false;

            const cleanup = () => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                clearTimeout(timeoutId);
                delete window[callbackName];
            };

            window[callbackName] = (data) => {
                isSettled = true;
                cleanup();
                resolve(data);
            };

            const timeoutId = setTimeout(() => {
                if (isSettled) return;
                cleanup();
                reject(new Error("Deezer JSONP request timed out"));
            }, this.jsonpTimeoutMs);

            script.onerror = () => {
                if (isSettled) return;
                cleanup();
                reject(new Error("Failed to load Deezer JSONP script"));
            };

            script.src = `${this.baseURL}${endpoint}?output=jsonp&callback=${callbackName}`;
            document.head.appendChild(script);
        });
    }

    /**
     * Get artist by Deezer ID
     * @param {number} artistId - Deezer artist ID
     * @returns {Promise<Object|null>} Artist data or null if not found
     */
    async getArtistById(artistId) {
        const cacheKey = `id_${artistId}`;

        // Check cache first
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const artist = await this.jsonpRequest(`/artist/${artistId}`);

            if (!artist || artist.error || !artist.id) {
                const errorMessage =
                    artist?.error?.message || "Unknown Deezer API error";
                console.warn(
                    `Deezer API error for ID ${artistId}: ${errorMessage}`,
                );
                return null;
            }

            const artistData = {
                id: artist.id,
                name: artist.name,
                picture: artist.picture_medium || artist.picture,
                picture_small: artist.picture_small,
                picture_big: artist.picture_big || artist.picture_xl,
            };

            // Cache the result
            this.cache.set(cacheKey, artistData);
            this.saveCacheEntry(cacheKey, artistData);
            return artistData;
        } catch (error) {
            console.error(`Error fetching artist ID ${artistId}:`, error);
            return null;
        }
    }

    /**
     * Batch fetch artists with rate limiting
     * @param {Array<Object>} artists - Array of artist objects with deezerId
     * @param {string} fallbackImagePath - Path to fallback image
     * @returns {Promise<Array<Object>>} Array of enriched artist objects
     */
    async enrichArtists(
        artists,
        fallbackImagePath = "",
        onArtistLoaded = null,
    ) {
        const enrichedArtists = [];

        for (const artist of artists) {
            let artistData = null;

            // Fetch by Deezer ID only
            if (artist.deezerId) {
                artistData = await this.getArtistById(artist.deezerId);
            }

            // Build enriched artist object
            const apiName = artistData?.name;
            const localName = artist.name;

            if (apiName && apiName !== localName) {
                console.info(
                    `[Deezer] Name mismatch for "${localName}" (ID: ${artist.deezerId}): api returned "${apiName}"`,
                );
            }

            const image =
                artistData?.picture ||
                (artist.picture
                    ? `../../assets/images/artists/${artist.picture}`
                    : fallbackImagePath);

            if (artist.deezerId && !artistData?.picture && !artist.picture) {
                console.info(
                    `[Deezer] No image found for "${localName}" (ID: ${artist.deezerId})`,
                );
            }

            const enrichedArtist = {
                name: apiName || localName,
                deezerId: artist.deezerId,
                image,
                picture_small: artistData?.picture_small,
                picture_big: artistData?.picture_big,
                localPicture: artist.picture, // Keep local picture as fallback
            };

            enrichedArtists.push(enrichedArtist);

            if (onArtistLoaded && enrichedArtist.deezerId) {
                onArtistLoaded(enrichedArtist.deezerId, enrichedArtist);
            }

            // Rate limiting: wait 100ms between requests
            await new Promise((resolve) => setTimeout(resolve, 100));
        }

        return enrichedArtists;
    }

    /**
     * Preload artist images from artistsData object or concerts array
     * @param {Object|Array} data - Either artistsData object or array of concert objects
     * @returns {Promise<Map>} Map of Deezer IDs to enriched data
     */
    async preloadAllArtists(
        data,
        onArtistLoaded = null,
        priorityArtistIds = [],
    ) {
        const uniqueArtists = new Map();

        // Handle artistsData object (new format)
        if (!Array.isArray(data)) {
            Object.values(data).forEach((artist) => {
                if (artist.deezerId && !uniqueArtists.has(artist.deezerId)) {
                    uniqueArtists.set(artist.deezerId, artist);
                }
            });
        }
        // Handle concerts array (legacy format)
        else {
            data.forEach((concert) => {
                if (concert.artists && Array.isArray(concert.artists)) {
                    concert.artists.forEach((artist) => {
                        if (
                            artist.deezerId &&
                            !uniqueArtists.has(artist.deezerId)
                        ) {
                            uniqueArtists.set(artist.deezerId, artist);
                        }
                    });
                }
            });
        }

        console.log(
            `Preloading ${uniqueArtists.size} unique artists from Deezer...`,
        );

        const enrichedMap = new Map();
        const prioritySet = new Set(priorityArtistIds);
        const artistsArray = Array.from(uniqueArtists.values()).sort(
            (left, right) => {
                const leftPriority = prioritySet.has(left.deezerId) ? 1 : 0;
                const rightPriority = prioritySet.has(right.deezerId) ? 1 : 0;
                return rightPriority - leftPriority;
            },
        );

        // Process in batches of 10 to avoid overwhelming the API
        const batchSize = 10;
        for (let i = 0; i < artistsArray.length; i += batchSize) {
            const batch = artistsArray.slice(i, i + batchSize);
            const enriched = await this.enrichArtists(
                batch,
                "",
                onArtistLoaded,
            );

            enriched.forEach((artist) => {
                if (artist.deezerId) {
                    enrichedMap.set(artist.deezerId, artist);
                }
            });

            console.log(
                `Loaded ${Math.min(i + batchSize, artistsArray.length)}/${artistsArray.length} artists`,
            );
        }

        return enrichedMap;
    }

    /**
     * Clear the cache
     */
    clearCache() {
        this.cache.clear();
        this.persistentCache = {};

        try {
            localStorage.removeItem(this.storageKey);
        } catch {
            // Ignore localStorage failures
        }
    }
}

// Export for use in other scripts
const deezerAPI = new DeezerAPI();
