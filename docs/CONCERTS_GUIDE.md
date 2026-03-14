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
  "orelsan": {
    name: "Orelsan",
    deezerId: 4495513    // Optional - enables Deezer images
  },
  "local-artist": {
    name: "Local Artist"  // No deezerId = name only, no image
  }
};
```

**Artist ID Rules:**
- Lowercase, alphanumeric + hyphens only
- Must be unique
- Examples: `orelsan`, `bigflo-oli`, `alt-j`

### 2. Add Concert

In `assets/js/concerts.js`, add to `concertsData` array:

```javascript
const concertsData = [
  {
    date: "2026-03-20",
    artists: ["orelsan", "local-artist"],  // Use artist IDs
    location: "Venue Name",                // Optional
    festival: "Festival Name",             // Optional
    city: "Paris",
    note: "Amazing show!"                  // Optional
  }
];
```

---

## Finding Deezer IDs

### Method 1: Deezer Website
1. Go to [deezer.com](https://www.deezer.com)
2. Search for the artist
3. URL shows ID: `deezer.com/artist/4495513` → ID is `4495513`

### Method 2: Browser Console
```javascript
deezerAPI.getArtistById(4495513).then(data => console.log(data));
```

---

## Complete Example

```javascript
// Artists database
const artistsData = {
  "orelsan": { name: "Orelsan", deezerId: 4495513 },
  "angele": { name: "Angèle", deezerId: 9635624 },
  "vald": { name: "Vald", deezerId: 5534982 }
};

// Concerts data
const concertsData = [
  {
    date: "2025-06-28",
    artists: ["orelsan", "angele"],
    festival: "Europavox",
    city: "Clermont-Ferrand"
  },
  {
    date: "2025-07-15",
    artists: ["vald"],
    location: "Le Zénith",
    city: "Paris",
    note: "First time seeing Vald live!"
  }
];
```

---

## Common Artist IDs

For quick reference:

```javascript
"orelsan": { name: "Orelsan", deezerId: 4495513 },
"angele": { name: "Angèle", deezerId: 9635624 },
"vald": { name: "Vald", deezerId: 5534982 },
"lomepal": { name: "Lomepal", deezerId: 5313805 },
"nekfeu": { name: "Nekfeu", deezerId: 5362281 },
"sch": { name: "SCH", deezerId: 5596590 },
"laylow": { name: "Laylow", deezerId: 9919179 },
"damso": { name: "Damso", deezerId: 8663947 }
```

---

## Tips

1. **Add artist first**, then use in concerts
2. **No Deezer ID?** Just provide `name` - works without images
3. **Update once** - changes apply to all concerts using that artist
4. **Catch typos** - Console warns if artist ID not found
