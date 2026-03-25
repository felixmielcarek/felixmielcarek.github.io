// Concerts page functionality

function slugifyPart(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildPlaceId({ location, festival, city }) {
  const parts = [location, festival, city]
    .filter(Boolean)
    .map((part) => slugifyPart(part))
    .filter(Boolean);

  return parts.join("__");
}

function normalizeConcertsWithPlaces(rawConcerts, seedPlaces = {}) {
  const placesMap = new Map();

  Object.entries(seedPlaces).forEach(([placeId, seed]) => {
    placesMap.set(placeId, {
      id: placeId,
      location: seed.location || "",
      festival: seed.festival || "",
      city: seed.city || "",
      lat: seed.lat ?? null,
      lng: seed.lng ?? null,
      count: 0,
    });
  });

  const normalizedConcerts = rawConcerts.map((concert) => {
    const placeId = concert.placeId || buildPlaceId(concert);

    if (!placeId) {
      console.warn("Concert has no place identity:", concert);
    }

    const existing = placesMap.get(placeId) || {
      id: placeId,
      location: "",
      festival: "",
      city: "",
      lat: null,
      lng: null,
      count: 0,
    };

    const merged = {
      ...existing,
      location: existing.location || concert.location || "",
      festival: existing.festival || concert.festival || "",
      city: existing.city || concert.city || "",
      lat: existing.lat ?? null,
      lng: existing.lng ?? null,
      count: (existing.count || 0) + 1,
    };

    placesMap.set(placeId, merged);

    return {
      ...concert,
      placeId,
    };
  });

  return {
    concerts: normalizedConcerts,
    places: Object.fromEntries(placesMap.entries()),
  };
}

const { concerts: concertsData, places: placesData } =
  normalizeConcertsWithPlaces(concertsRawData, placesSeedData);

let currentFilter = "all";
let currentArtistFilter = null;
let enrichedArtistsMap = new Map();

function getTopArtists(limit = 10) {
  const appearances = new Map();

  concertsData.forEach((concert) => {
    concert.artists.forEach((artistId) => {
      appearances.set(artistId, (appearances.get(artistId) || 0) + 1);
    });
  });

  return Array.from(appearances.entries())
    .map(([artistId, count]) => ({
      artistId,
      count,
      artist: artistsData[artistId],
    }))
    .filter(({ artist }) => Boolean(artist))
    .sort((left, right) => {
      if (right.count !== left.count) {
        return right.count - left.count;
      }

      return left.artist.name.localeCompare(right.artist.name);
    })
    .slice(0, limit);
}

function getArtistDisplayState(artist) {
  let imagePath = "";
  let displayName = artist.name;
  let useSkeleton = false;

  if (artist.deezerId) {
    const enrichedArtist = enrichedArtistsMap.get(artist.deezerId);
    if (enrichedArtist) {
      if (enrichedArtist.image) {
        imagePath = enrichedArtist.image;
      }
      if (enrichedArtist.name) {
        displayName = enrichedArtist.name;
      }
    } else {
      useSkeleton = true;
    }
  } else if (artist.picture) {
    imagePath = `../../assets/images/artists/${artist.picture}`;
  }

  return {
    deezerId: artist.deezerId,
    imagePath,
    displayName,
    useSkeleton,
  };
}

function getArtistMediaHTML({ imagePath, displayName, useSkeleton }) {
  if (useSkeleton) {
    return `<div class="artist-img-skeleton"></div>`;
  }

  if (imagePath) {
    return `<img src="${imagePath}" alt="${displayName}" onerror="this.replaceWith(Object.assign(document.createElement('div'), {className:'artist-avatar-placeholder', textContent:'?' }))">`;
  }

  return `<div class="artist-avatar-placeholder">?</div>`;
}

// Initialize the page
async function init() {
  calculateStats();
  initConcertsMap();
  renderTopArtists();
  generateYearFilters();
  setupFilterListeners();

  // Render immediately with skeleton placeholders for images
  renderConcerts();

  // Preload artist data from Deezer API progressively
  if (typeof deezerAPI !== "undefined") {
    try {
      const topArtistDeezerIds = getTopArtists()
        .map(({ artist }) => artist.deezerId)
        .filter(Boolean);

      enrichedArtistsMap = await deezerAPI.preloadAllArtists(
        artistsData,
        (deezerId, enrichedArtist) => {
          enrichedArtistsMap.set(deezerId, enrichedArtist);
          updateArtistTilesForId(deezerId, enrichedArtist);
        },
        topArtistDeezerIds,
      );
      console.log("✓ All artist images loaded from Deezer API");
    } catch (error) {
      console.warn(
        "Failed to load from Deezer API, using manual images:",
        error,
      );
    }
  }
}

function initConcertsMap() {
  const mapContainer = document.getElementById("concerts-map");
  if (!mapContainer || typeof L === "undefined") return;

  const places = Object.values(placesData);
  const mappablePlaces = places
    .map((place) => ({
      ...place,
      lat: Number(place.lat),
      lng: Number(place.lng),
    }))
    .filter(
      (place) => Number.isFinite(place.lat) && Number.isFinite(place.lng),
    );

  const map = L.map("concerts-map", {
    center: [46.8, 2.3],
    zoom: 6,
    zoomControl: true,
    attributionControl: false,
  });

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 18,
  }).addTo(map);

  if (mappablePlaces.length === 0) {
    return;
  }

  function makeIcon(count) {
    const size = Math.min(14 + count * 1.5, 30);
    const height = Math.round(size * 1.35);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="${size}" height="${height}">
            <path d="M12 0C7.16 0 3 4.16 3 9c0 6.75 9 15 9 15s9-8.25 9-15c0-4.84-4.16-9-9-9z"
                  fill="#ffc0cb" fill-opacity="0.9" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
            <circle cx="12" cy="9" r="3.5" fill="#121212"/>
        </svg>`;

    return L.divIcon({
      html: svg,
      className: "",
      iconSize: [size, height],
      iconAnchor: [size / 2, height],
      popupAnchor: [0, -height],
    });
  }

  const markerBounds = [];

  mappablePlaces.forEach((place) => {
    const label = place.location || place.festival || place.city || "Unknown";

    const popup = L.popup({
      className: "concert-map-popup",
      closeButton: false,
      offset: [0, -4],
    }).setContent(
      `<div class="map-popup-inner">
                <div class="map-popup-venue">${label}</div>
                <div class="map-popup-city"><i class="bi bi-pin-map"></i> ${place.city || "Unknown city"}</div>
                <div class="map-popup-count">${place.count} concert${place.count > 1 ? "s" : ""}</div>
            </div>`,
    );

    L.marker([place.lat, place.lng], {
      icon: makeIcon(place.count || 1),
    })
      .bindPopup(popup)
      .addTo(map);

    markerBounds.push([place.lat, place.lng]);
  });

  if (markerBounds.length > 1) {
    map.fitBounds(markerBounds, { padding: [28, 28] });
  } else if (markerBounds.length === 1) {
    map.setView(markerBounds[0], 10);
  }
}

// Update all rendered tiles for a given Deezer ID when its data arrives
function updateArtistTilesForId(deezerId, enrichedArtist) {
  document
    .querySelectorAll(`[data-deezer-id="${deezerId}"]`)
    .forEach((tile) => {
      // Update name
      const nameSpan = tile.querySelector(".artist-name, .top-artist-name");
      if (nameSpan && enrichedArtist.name) {
        nameSpan.textContent = enrichedArtist.name;
      }

      // Replace skeleton/placeholder with image or fallback
      const target =
        tile.querySelector(".artist-img-skeleton") ||
        tile.querySelector("img, .artist-avatar-placeholder");
      if (!target) return;

      if (enrichedArtist.image) {
        const img = document.createElement("img");
        img.src = enrichedArtist.image;
        img.alt = enrichedArtist.name || "";
        img.className = "artist-img-entering";
        img.onerror = () =>
          img.replaceWith(
            Object.assign(document.createElement("div"), {
              className: "artist-avatar-placeholder",
              textContent: "?",
            }),
          );
        img.onload = () => img.classList.add("artist-img-loaded");
        target.replaceWith(img);
      } else {
        target.replaceWith(
          Object.assign(document.createElement("div"), {
            className: "artist-avatar-placeholder",
            textContent: "?",
          }),
        );
      }
    });
}

function renderTopArtists() {
  const container = document.getElementById("top-artists-list");
  if (!container) return;

  const topArtists = getTopArtists();

  container.innerHTML = topArtists
    .map(({ artistId, count, artist }) => {
      const { deezerId, imagePath, displayName, useSkeleton } =
        getArtistDisplayState(artist);
      const deezerAttr = deezerId ? `data-deezer-id="${deezerId}"` : "";
      const activeClass = currentArtistFilter === artistId ? " active-artist-filter" : "";

      return `
                <article class="top-artist-card${activeClass}" ${deezerAttr} data-artist-id="${artistId}" style="cursor: pointer;">
                    <div class="top-artist-photo">
                        <div class="top-artist-badge">${count}</div>
                        ${getArtistMediaHTML({ imagePath, displayName, useSkeleton })}
                    </div>
                    <div class="top-artist-content">
                        <div class="top-artist-name">${displayName}</div>
                    </div>
                </article>
            `;
    })
    .join("");
}

// Calculate statistics
function calculateStats() {
  const totalConcerts = concertsData.length;
  const uniqueArtists = new Set();
  const uniqueFestivals = new Set();
  const uniqueCities = new Set();

  concertsData.forEach((concert) => {
    const place = placesData[concert.placeId];
    concert.artists.forEach((artistId) => uniqueArtists.add(artistId));
    if (place?.festival) uniqueFestivals.add(place.festival);
    if (place?.city) uniqueCities.add(place.city);
  });

  document.getElementById("total-concerts").textContent = totalConcerts;
  document.getElementById("total-artists").textContent = uniqueArtists.size;
  document.getElementById("total-festivals").textContent = uniqueFestivals.size;
  document.getElementById("total-cities").textContent = uniqueCities.size;
}

// Generate year filter buttons
function generateYearFilters() {
  const years = [
    ...new Set(concertsData.map((c) => new Date(c.date).getFullYear())),
  ].sort((a, b) => b - a);
  const filterContainer = document.getElementById("year-filters");

  years.forEach((year) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary";
    btn.setAttribute("data-year", year);
    btn.textContent = year;
    filterContainer.appendChild(btn);
  });
}

// Setup filter button listeners
function setupFilterListeners() {
  // Year filters
  document.getElementById("year-filters").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      // Update active state
      document.querySelectorAll("#year-filters button").forEach((btn) => {
        btn.classList.remove("active-filter");
      });
      e.target.classList.add("active-filter");

      // Update filter and render
      currentFilter = e.target.getAttribute("data-year");
      renderConcerts();
    }
  });

  // Artist filters
  document.getElementById("top-artists-list").addEventListener("click", (e) => {
    const artistCard = e.target.closest(".top-artist-card");
    if (artistCard) {
      const artistId = artistCard.getAttribute("data-artist-id");
      
      // Toggle artist filter
      if (currentArtistFilter === artistId) {
        currentArtistFilter = null;
      } else {
        currentArtistFilter = artistId;
      }
      
      renderTopArtists();
      renderConcerts();
    }
  });

  // Reset filters button
  const resetBtn = document.getElementById("reset-filters-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      currentArtistFilter = null;
      
      renderTopArtists();
      renderConcerts();
    });
  }
}

// Render concerts
function renderConcerts() {
  const container = document.getElementById("concerts-container");
  const noResults = document.getElementById("no-results");
  container.innerHTML = "";

  // Filter concerts by year
  let filteredConcerts =
    currentFilter === "all"
      ? concertsData
      : concertsData.filter(
          (c) => new Date(c.date).getFullYear().toString() === currentFilter,
        );

  // Filter concerts by artist
  if (currentArtistFilter) {
    filteredConcerts = filteredConcerts.filter((c) =>
      c.artists.includes(currentArtistFilter)
    );
  }

  // Sort by date (newest first)
  filteredConcerts.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filteredConcerts.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  filteredConcerts.forEach((concert) => {
    const col = document.createElement("div");
    col.className = "col-lg-6 col-md-6 col-12 mb-4";

    const date = new Date(concert.date);
    const dateStr = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let artistsHTML = "";
    concert.artists.forEach((artistId) => {
      // Get artist data from artistsData
      const artist = artistsData[artistId];
      if (!artist) {
        console.warn(`Artist ID "${artistId}" not found in artistsData`);
        return;
      }

      const { deezerId, imagePath, displayName, useSkeleton } =
        getArtistDisplayState(artist);

      if (!deezerId && !artist.picture) {
        console.info(
          `[Concerts] No image available for artist "${artist.name}" (no Deezer ID or local picture)`,
        );
      }

      const deezerAttr = deezerId ? `data-deezer-id="${deezerId}"` : "";

      // Build artist tile (image + name below)
      artistsHTML += `
            <div class="artist-tile" ${deezerAttr}>
              ${getArtistMediaHTML({ imagePath, displayName, useSkeleton })}
              <span class="artist-name">${displayName}</span>
            </div>
            `;
    });

    const place = placesData[concert.placeId] || {
      location: concert.location || "",
      festival: concert.festival || "",
      city: concert.city || "",
    };

    let locationHTML = "";
    if (place.location) {
      locationHTML = `
                <div class="info-item">
                    <i class="bi bi-geo-alt-fill"></i>
                    <span>${place.location}</span>
                </div>
            `;
    }

    let festivalHTML = "";
    if (place.festival) {
      festivalHTML = `
                <div class="info-item">
                    <i class="bi bi-calendar-event"></i>
                    <span>${place.festival}</span>
                </div>
            `;
    }

    let noteHTML = "";
    if (concert.note) {
      noteHTML = `
                <div class="concert-note">
                    <i class="bi bi-lightbulb"></i> ${concert.note}
                </div>
            `;
    }

    col.innerHTML = `
            <div class="concert-card">
          <div class="concert-header">
            <div class="concert-header-left">
              ${locationHTML}
              ${festivalHTML}
            </div>
            <div class="concert-header-right">
              <div class="concert-date">
                <i class="bi bi-calendar3"></i> ${dateStr}
              </div>
              <div class="concert-city">
                                <i class="bi bi-pin-map"></i> ${place.city || "Unknown city"}
              </div>
            </div>
                </div>
                
                <div class="artists-section">
                    <div class="artists-title">
                        <i class="bi bi-people-fill"></i> Artists (${concert.artists.length})
                    </div>
                    <div class="artists-list">
                        ${artistsHTML}
                    </div>
                </div>
                
                ${noteHTML}
            </div>
        `;

    container.appendChild(col);
  });
}

// Initialize on page load
init();
