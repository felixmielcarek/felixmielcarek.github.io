# 🎵 Concerts Data Guide

## Overview

Your concerts page uses a **normalized structure** with Deezer API integration:

- ✅ Define each artist once in `artistsData`
- ✅ Reference artists by ID in concerts
- ✅ Automatic images from Deezer (when `deezerId` provided)
- ✅ No duplication, consistent data

---

## Quick Start

### 1. Add Artist to Database

In `assets/js/concerts.js`, add to `artistsData` object:

```javascript
const artistsData = {
    orelsan: {
        name: "Orelsan",
        deezerId: 4495513, // Optional - enables Deezer images
    },
    "local-artist": {
        name: "Local Artist", // No deezerId = name only, no image
    },
};
```

**Artist ID Rules:**

- Lowercase, alphanumeric + hyphens only
- Must be unique
- Examples: `orelsan`, `bigflo-oli`, `alt-j`

### 2. Add Place to Places Catalog (Places Feature)

In `assets/js/concerts.js`, add (or reuse) a place in `placesSeedData`:

```javascript
const placesSeedData = {
    "cooperative-de-mai": {
        location: "Coopérative de mai",
        city: "Clermont-Ferrand",
        lat: 45.788303, // Optional but recommended for map/stats
        lng: 3.100651, // Optional but recommended for map/stats
    },
    "my-new-venue": {
        location: "My New Venue",
        city: "Paris",
        // lat/lng optional
    },
};
```

**Place ID Rules:**

- Lowercase, alphanumeric + hyphens only
- Must be unique
- Use stable IDs so multiple concerts can point to the same place

### 3. Add Concert

In `assets/js/concerts.js`, add to `concertsRawData` array:

```javascript
const concertsRawData = [
    {
        date: "2026-03-20",
        artists: ["orelsan", "local-artist"], // Use artist IDs
        placeId: "my-new-venue", // Reference an entry from placesSeedData
        festival: "Festival Name", // Optional
        note: "Amazing show!", // Optional
    },
];
```

### 4. Optional Fallback (No Manual placeId)

If you omit `placeId`, it is auto-generated from `location`, `festival`, and `city`.

```javascript
{
    date: "2026-04-10",
    artists: ["orelsan"],
    location: "Olympia",
    city: "Paris",
}
```

This works, but explicit `placeId` + `placesSeedData` is preferred for consistency and map coordinates.

---

## Finding Deezer IDs

1. Go to [deezer.com](https://www.deezer.com)
2. Search for the artist
3. URL shows ID: `deezer.com/artist/4495513` → ID is `4495513`

## Complete Example

```javascript
// Artists database
const artistsData = {
    orelsan: { name: "Orelsan", deezerId: 4495513 },
    angele: { name: "Angèle", deezerId: 9635624 },
    vald: { name: "Vald", deezerId: 5534982 },
};

// Places catalog
const placesSeedData = {
    "cooperative-de-mai": {
        location: "Coopérative de mai",
        city: "Clermont-Ferrand",
        lat: 45.788303,
        lng: 3.100651,
    },
    "zenith-d-auvergne": {
        location: "Zénith d'Auvergne",
        city: "Cournon",
        lat: 45.728506,
        lng: 3.203434,
    },
};

// Concerts data (raw)
const concertsRawData = [
    {
        date: "2025-06-28",
        artists: ["orelsan", "angele"],
        festival: "Europavox",
        placeId: "cooperative-de-mai",
    },
    {
        date: "2025-07-15",
        artists: ["vald"],
        placeId: "zenith-d-auvergne",
        note: "First time seeing Vald live!",
    },
];
```
