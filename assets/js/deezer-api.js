// Deezer API Helper Module
// No API key required - works on GitHub Pages

class DeezerAPI {
  constructor() {
    this.baseURL = "https://api.deezer.com";
    this.cache = new Map();
    this.corsProxy = "https://corsproxy.io/?"; // Free CORS proxy
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
      const url = `${this.corsProxy}${this.baseURL}/artist/${artistId}`;
      const response = await fetch(url);

      if (!response.ok) {
        console.warn(`Deezer API error for ID ${artistId}: ${response.status}`);
        return null;
      }

      const artist = await response.json();

      const artistData = {
        id: artist.id,
        name: artist.name,
        picture: artist.picture_medium || artist.picture,
        picture_small: artist.picture_small,
        picture_big: artist.picture_big || artist.picture_xl,
      };

      // Cache the result
      this.cache.set(cacheKey, artistData);
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
  async enrichArtists(artists, fallbackImagePath = "") {
    const enrichedArtists = [];

    for (const artist of artists) {
      let artistData = null;

      // Fetch by Deezer ID only
      if (artist.deezerId) {
        artistData = await this.getArtistById(artist.deezerId);
      }

      // Build enriched artist object
      const enrichedArtist = {
        name: artist.name,
        deezerId: artist.deezerId,
        image:
          artistData?.picture ||
          (artist.image
            ? `../../fel/concerts/images/artists/${artist.image}`
            : fallbackImagePath),
        picture_small: artistData?.picture_small,
        picture_big: artistData?.picture_big,
        manualImage: artist.image, // Keep manual image as fallback
      };

      enrichedArtists.push(enrichedArtist);

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
  async preloadAllArtists(data) {
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
            if (artist.deezerId && !uniqueArtists.has(artist.deezerId)) {
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
    const artistsArray = Array.from(uniqueArtists.values());

    // Process in batches of 10 to avoid overwhelming the API
    const batchSize = 10;
    for (let i = 0; i < artistsArray.length; i += batchSize) {
      const batch = artistsArray.slice(i, i + batchSize);
      const enriched = await this.enrichArtists(batch);

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
  }
}

// Export for use in other scripts
const deezerAPI = new DeezerAPI();
