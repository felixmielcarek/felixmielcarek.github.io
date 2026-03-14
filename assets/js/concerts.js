// Concerts page functionality

// Artists database - Define each artist once
// - deezerId: Deezer artist ID for API image fetching
// - picture:  local filename in assets/images/artists/ (for artists without a Deezer ID)
//             e.g.  picture: "8racks.jpg"
const artistsData = {
    "6ilverr": { name: "6ilverr", deezerId: 144498472 },
    32: { name: "32", deezerId: 311547721 },
    "8racks": { name: "8racks" },
    abbath: { name: "Abbath", deezerId: 7683228 },
    advm: { name: "ADVM", deezerId: 5463376 },
    akissi: { name: "AKISSI", deezerId: 146935412 },
    "al-walid": { name: "Al-Walid", deezerId: 265449832 },
    alcatraz: { name: "Alcatraz" },
    alcest: { name: "Alcest", deezerId: 16329 },
    alestorm: { name: "Alestorm", deezerId: 125436 },
    altj: { name: "alt-J", deezerId: 1606315 },
    angele: { name: "Angèle", deezerId: 1042268 },
    "angsty-camboyz-revenge": {
        name: "Angsty Camboyz Revenge",
        deezerId: 111418182,
    },
    "ano-poli": { name: "Ano poli" },
    arch: { name: "ARCH", picture: "arch.jpg" },
    asheo: { name: "Ashéo", deezerId: 14509319 },
    ayegy: { name: "Ayegy" },
    "baby-neelou": { name: "BABY NEELOU", deezerId: 88726552 },
    babysolo33: { name: "BabySolo33", deezerId: 57754602 },
    bahamas: { name: "bahamas" },
    bandikoot: { name: "Bandikoot", deezerId: 71503942 },
    bara8: { name: "BARA8!", deezerId: 181638667 },
    "bb-jacques": { name: "B.B. Jacques", deezerId: 107059632 },
    bekar: { name: "Bekar", deezerId: 4626477 },
    "ben-plg": { name: "BEN plg", deezerId: 67211132 },
    berywam: { name: "Berywam", deezerId: 12546212 },
    "biffty-julius": { name: "Biffty & Julius", deezerId: 8578780 },
    "bigflo-oli": { name: "Bigflo & Oli", deezerId: 5497121 },
    "blaz-pit": { name: "Blaz Pit", deezerId: 5289599 },
    "bloody-sanji": { name: "BLOODY$ANJI", deezerId: 61187702 },
    "brutal-sphincter": { name: "Brutal Sphincter", deezerId: 58051582 },
    bushi: { name: "BU$HI", deezerId: 15063429 },
    "caballero-jeanjass": { name: "Caballero & JeanJass", deezerId: 10147346 },
    cadaver: { name: "Cadaver", deezerId: 1220517 },
    chavi: { name: "Chavi", deezerId: 268210952 },
    coeurco: { name: "COEURCO", deezerId: 222015095 },
    columbine: { name: "Columbine", deezerId: 7042927 },
    crc: { name: "CRC", deezerId: 436723 },
    dali: { name: "Dalí", deezerId: 139920622 },
    damso: { name: "Damso", deezerId: 9197980 },
    dara: { name: "Dara", deezerId: 65223022 },
    "deep-purple": { name: "Deep Purple", deezerId: 864 },
    "deelee-s": { name: "DEELEE S", deezerId: 146378152 },
    "deelee-s-le-double": { name: "Deelee S & Le Double" },
    "di-meh-makala-slimka": { name: "Di-meh & Makala & Slimka" },
    dinos: { name: "Dinos", deezerId: 292949 },
    "dj-schnake": { name: "DJ Schnake", deezerId: 339000701 },
    dnd: { name: "DND" },
    "domingo-cruz": { name: "Domingo Cruz", deezerId: 87872602 },
    "doums-collab": {
        name: "Doums & Némir & Edge & Esso Luxueux & S.Pri Noir & 2ZER & Mekra & Framal",
        deezerId: 0,
    },
    "douze-deluge": { name: "Douze Déluge", deezerId: 198304697 },
    down: { name: "DOWN", deezerId: 7274 },
    "dries-bormans": { name: "Dries Bormans", deezerId: 111121002 },
    edge: { name: "EDGE", deezerId: 95149082 },
    eliesg: { name: "ELIESG", deezerId: 372715931 },
    eloi: { name: "Eloi", deezerId: 6151932 },
    elyslime: { name: "elyslime!", deezerId: 147958552 },
    encoreuneautre: { name: "encore une autre", deezerId: 309692451 },
    flkn: { name: "FLKN", deezerId: 137443572 },
    gal: { name: "GAL", deezerId: 304485351 },
    gemen: { name: "Gemen", deezerId: 1056523 },
    georgio: { name: "Georgio", deezerId: 183727 },
    giuseppe: { name: "Giuseppe", deezerId: 270323702 },
    gojira: { name: "Gojira", deezerId: 2993 },
    grosmo: { name: "Gros Mo", deezerId: 5246295 },
    "h-jeune-crack": { name: "H JeuneCrack", deezerId: 104543062 },
    "heaven-shall-burn": { name: "Heaven Shall Burn", deezerId: 9494 },
    helheim: { name: "Helheim", deezerId: 573324 },
    heloim: { name: "HeloÏm", deezerId: 101490272 },
    houdi: { name: "HOUDI", deezerId: 48443532 },
    huntrill: { name: "Huntrill", deezerId: 13797255 },
    "idee-noire": { name: "Idée Noire.", deezerId: 14400281 },
    igorrr: { name: "Igorrr", deezerId: 1025520 },
    "in-other-climes": { name: "In Other Climes", deezerId: 399035 },
    infinit: { name: "Infinit'", deezerId: 5531672 },
    invisions: { name: "InVisions", deezerId: 8282632 },
    irko: { name: "Irko", deezerId: 9483292 },
    "isha-limsa": { name: "Isha & Limsa" },
    jade: { name: "Jäde", deezerId: 78534732 },
    jaymee: { name: "Jaymee", deezerId: 1705266 },
    "jean-paul-groove": { name: "Jean-Paul Groove", deezerId: 140967152 },
    "jeune-lion": { name: "Jeune Lion", deezerId: 138959612 },
    "jeune-mort": { name: "Jeune Mort", deezerId: 168464897 },
    jolagreen23: { name: "Jolagreen23", deezerId: 132179322 },
    josman: { name: "Josman", deezerId: 7365500 },
    jrk19: { name: "JRK 19", deezerId: 115427322 },
    kaaris: { name: "Kaaris", deezerId: 388973 },
    kavinsky: { name: "Kavinsky", deezerId: 13358 },
    "kay-the-prodigy": { name: "Kay The Prodigy", deezerId: 141554662 },
    keroue: { name: "Keroué", deezerId: 5288874 },
    korn: { name: "KoЯn", deezerId: 1327 },
    "la-feve": { name: "La Fève", deezerId: 102204242 },
    lamomali: { name: "Lamomali", deezerId: 299457271 },
    landmvrks: { name: "LANDMVRKS", deezerId: 9985838 },
    laylow: { name: "Laylow", deezerId: 4510044 },
    "le-double": { name: "LEDOUBLE", deezerId: 166377407 },
    "leo-svr": { name: "Leo SVR", deezerId: 129399072 },
    "lili-castiglioni": { name: "Lili Castiglioni", deezerId: 175631877 },
    lomepal: { name: "Lomepal", deezerId: 5111084 },
    "lord-esperanza": { name: "Lord Esperanza", deezerId: 11193368 },
    lorenzi: { name: "Lorenzi", deezerId: 5176955 },
    lovarran: { name: "Lovarran", deezerId: 131292122 },
    lujipeka: { name: "Lujipeka", deezerId: 7172552 },
    luther: { name: "Luther", deezerId: 161626742 },
    "luther-collab": {
        name: "Luther & Rounhaa & Abel31 & Amne & Irko & Süblime",
        deezerId: 0,
    },
    makala: { name: "Makala", deezerId: 536194 },
    mandyspie: { name: "Mandyspie", deezerId: 129618942 },
    megadeath: { name: "Megadeth", deezerId: 3487 },
    mordred: { name: "mordred", deezerId: 260801 },
    "myth-syzer": { name: "Myth Syzer", deezerId: 4133659 },
    nekfeu: { name: "Nekfeu", deezerId: 1412564 },
    nes: { name: "NeS", deezerId: 69178362 },
    nobodylikesbirdie: { name: "Nobodylikesbirdie", deezerId: 173804587 },
    nocif: { name: "Nocif", deezerId: 89185 },
    notinbed: { name: "notinbed", deezerId: 13909369 },
    nusky: { name: "Nusky", deezerId: 11234719 },
    oboy: { name: "OBOY", deezerId: 4986771 },
    oglounis: { name: "OgLounis", deezerId: 78294182 },
    opeth: { name: "Opeth", deezerId: 2814 },
    orelsan: { name: "Orelsan", deezerId: 259467 },
    peterparker69: { name: "Peterparker69", deezerId: 157878062 },
    "philippe-katerine": { name: "Philippe Katerine", deezerId: 281496 },
    pleur: { name: "PLEUR", deezerId: 291410281 },
    plk: { name: "PLK", deezerId: 1479842 },
    "polo-pan": { name: "Polo & Pan", deezerId: 5400149 },
    pomme: { name: "Pomme", deezerId: 5382747 },
    "prince-waly": { name: "Prince Waly", deezerId: 6745115 },
    "ptite-soeur": { name: "Ptite Soeur", deezerId: 130998972 },
    ramirez: { name: "Ramirez", deezerId: 115756 },
    ratus: { name: "Ratu$", deezerId: 59563612 },
    "rectal-smegma": { name: "Rectal Smegma", deezerId: 204502 },
    "regarde-les-hommes-tomber": {
        name: "Regarde Les Hommes Tomber",
        deezerId: 4366510,
    },
    riles: { name: "Rilès", deezerId: 4521369 },
    "roland-cristal": { name: "Roland Cristal", deezerId: 73637842 },
    "romain-play": { name: "Romain Play", deezerId: 7691392 },
    "romeo-elvis": { name: "Roméo Elvis", deezerId: 7961408 },
    romsii: { name: "Romsii", deezerId: 118643972 },
    "salut-cest-cool": { name: "Salut C'est Cool", deezerId: 7802522 },
    sch: { name: "SCH", deezerId: 162665 },
    "selug-senar": { name: "Selug & $enar", deezerId: 66468592 },
    sepultura: { name: "Sepultura", deezerId: 632 },
    sheldon: { name: "Sheldon", deezerId: 173048 },
    sheng: { name: "Sheng", deezerId: 1242216 },
    shooda: { name: "Shooda", deezerId: 14340053 },
    silence: { name: "Silence" },
    slimka: { name: "Slimka", deezerId: 12121824 },
    "so-la-lune": { name: "So La Lune", deezerId: 68553672 },
    sopico: { name: "Sopico", deezerId: 10615109 },
    steban: { name: "Steban", deezerId: 91974 },
    sto: { name: "STO", deezerId: 83664732 },
    "super-parquet": { name: "Super Parquet", deezerId: 10019168 },
    sxmpra: { name: "Sxmpra", deezerId: 100588482 },
    th: { name: "TH", deezerId: 219251975 },
    thahomey: { name: "thaHomey", deezerId: 13337035 },
    thea: { name: "THÉA", deezerId: 195760897 },
    theodora: { name: "Theodora", deezerId: 13820325 },
    tif: { name: "TIF", deezerId: 9430902 },
    toma: { name: "toma!", deezerId: 348145031 },
    "tommy-cash": { name: "Tommy Cash", deezerId: 178856 },
    toothpick: { name: "Toothpick", deezerId: 985637 },
    ucyll: { name: "Ucyll", deezerId: 93804812 },
    vald: { name: "Vald", deezerId: 5175734 },
    "varnish-la-piscine": { name: "Varnish La Piscine", deezerId: 12121826 },
    vendredear: { name: "Vendredear" },
    vilhelm: { name: "Vilhelm.", deezerId: 128462002 },
    "vladimir-cauchemar": { name: "Vladimir Cauchemar", deezerId: 13682095 },
    "von-bikrav": { name: "Von Bikräv", deezerId: 11674147 },
    "wagahai-is-neko": { name: "Wagahai is neko" },
    "wallace-cleaver": { name: "Wallace Cleaver", deezerId: 52375982 },
    "walls-of-jericho": { name: "Walls of Jericho", deezerId: 673 },
    "while-she-sleeps": { name: "While She Sleeps", deezerId: 403781 },
    winnterzuko: { name: "winnterzuko", deezerId: 88895962 },
    "woody-collab": {
        name: "Woody & Franz Keloh & Berlam & Mac the fire",
        deezerId: 0,
    },
    "zaho-de-sagazan": { name: "Zaho de Sagazan", deezerId: 112645512 },
    zamdane: { name: "Zamdane", deezerId: 13152245 },
    zeu: { name: "Zeu", deezerId: 10848422 },
    zinee: { name: "Zinee", deezerId: 84898762 },
    zola: { name: "Zola", deezerId: 13962203 },
    zoomy: { name: "Zoomy", deezerId: 87611072 },
    yume: { name: "Yume" },
};

// Concert data source - Reference artists by ID
// Location info can be normalized into `placesData` via `placeId`
const concertsRawData = [
    {
        date: "2016-02-17",
        artists: ["berywam", "bigflo-oli"],
        placeId: "cooperative-de-mai",
    },
    {
        date: "2016-03-10",
        artists: ["georgio", "vald"],
        placeId: "cooperative-de-mai",
    },
    {
        date: "2017-07-04",
        artists: ["altj"],
        festival: "Nuits de fourvières",
        placeId: "theatre-antique-de-fourviere",
    },
    {
        date: "2017-10-21",
        artists: ["grosmo", "lomepal"],
        festival: "Festival Sismic",
        placeId: "cooperative-de-mai",
    },
    {
        date: "2018-03-23",
        artists: ["nusky", "romeo-elvis"],
        placeId: "cooperative-de-mai",
    },
    {
        date: "2018-04-26",
        artists: ["biffty-julius", "caballero-jeanjass", "damso", "orelsan"],
        festival: "Printemps de Bourges",
        placeId: "printemps-de-bourges",
    },
    {
        date: "2018-05-19",
        artists: ["altj"],
        placeId: "cooperative-de-mai",
    },
    {
        date: "2018-06-30",
        artists: ["riles", "tommy-cash"],
        festival: "Europavox",
        placeId: "place-du-1er-mai",
    },
    {
        date: "2018-07-01",
        artists: ["lomepal", "angele", "orelsan", "di-meh-makala-slimka"],
        festival: "Europavox",
        placeId: "place-du-1er-mai",
    },
    {
        date: "2019-06-27",
        artists: [
            "lord-esperanza",
            "romeo-elvis",
            "nekfeu",
            "salut-cest-cool",
            "plk",
            "columbine",
            "georgio",
        ],
        festival: "Europavox",
        placeId: "place-du-1er-mai",
    },
    {
        date: "2021-12-15",
        artists: ["igorrr"],
        placeId: "cooperative-de-mai",
        note: "The first concert where I went solo.",
    },
    {
        date: "2022-04-01",
        artists: ["orelsan"],
        placeId: "zenith-d-auvergne",
    },
    {
        date: "2022-06-17",
        artists: ["opeth", "in-other-climes", "mordred", "abbath", "cadaver"],
        festival: "Hellfest",
        placeId: "champ-louet",
    },
    {
        date: "2022-06-18",
        artists: [
            "invisions",
            "heaven-shall-burn",
            "megadeath",
            "alestorm",
            "deep-purple",
            "helheim",
            "sepultura",
            "brutal-sphincter",
            "rectal-smegma",
        ],
        festival: "Hellfest",
        placeId: "champ-louet",
    },
    {
        date: "2022-06-19",
        artists: [
            "korn",
            "gojira",
            "down",
            "landmvrks",
            "while-she-sleeps",
            "walls-of-jericho",
            "regarde-les-hommes-tomber",
            "alcest",
        ],
        festival: "Hellfest",
        placeId: "champ-louet",
    },
    {
        date: "2022-07-01",
        artists: ["oboy", "vald"],
        festival: "Europavox",
        placeId: "place-du-1er-mai",
    },
    {
        date: "2022-07-02",
        artists: ["laylow", "vladimir-cauchemar"],
        festival: "Europavox",
        placeId: "place-du-1er-mai",
    },
    {
        date: "2022-07-03",
        artists: ["sopico", "lujipeka", "angele"],
        festival: "Europavox",
        placeId: "place-du-1er-mai",
    },
    {
        date: "2022-10-21",
        artists: ["sch"],
        placeId: "zenith-d-auvergne",
        note: "Such amazed by SCH fits during the show, that I only dressed in black udring the weeks following the concert.",
    },
    {
        date: "2023-06-17",
        artists: ["angsty-camboyz-revenge"],
        placeId: "raymond-bar",
    },
    {
        date: "2023-06-30",
        artists: ["pomme", "josman", "varnish-la-piscine"],
        festival: "Europavox",
        placeId: "place-du-1er-mai",
    },
    {
        date: "2023-08-26",
        artists: ["zola", "bushi", "makala", "nes"],
        festival: "Woodstower",
        placeId: "grand-parc-miribel-jonage",
        note: "We finished the festival with 10cm of water above our ankles.",
    },
    {
        date: "2023-09-30",
        artists: ["sto", "sheldon"],
        placeId: "confort-moderne",
    },
    {
        date: "2023-10-13",
        artists: ["nocif", "h-jeune-crack"],
        placeId: "marche-gare",
    },
    {
        date: "2024-03-08",
        artists: ["slimka"],
        placeId: "le-sucre",
    },
    {
        date: "2024-04-20",
        artists: ["infinit"],
        placeId: "cooperative-de-mai",
    },
    {
        date: "2024-05-31",
        artists: ["asheo", "jeune-mort"],
        placeId: "cooperative-de-mai",
        note: "It's the period when I started to follow Clermont-Ferrand underground rap scene, notably open-mics.",
    },
    {
        date: "2024-06-07",
        artists: ["domingo-cruz", "bara8", "lovarran", "arch"],
        placeId: "cooperative-de-mai",
    },
    {
        date: "2024-06-22",
        artists: [
            "deelee-s-le-double",
            "kay-the-prodigy",
            "jolagreen23",
            "infinit",
        ],
        festival: "La Calle Havana",
        placeId: "halle-tropisme",
    },
    {
        date: "2024-06-28",
        artists: ["so-la-lune", "doums-collab"],
        festival: "Europavox",
        placeId: "place-du-1er-mai",
        note: "I went to see Ratu$ and Deen Burbigo who should have perform with Doums, the only 2 that have been skipped by lack of time.",
    },
    {
        date: "2024-06-29",
        artists: ["la-feve", "prince-waly", "eloi"],
        festival: "Europavox",
        placeId: "place-du-1er-mai",
    },
    {
        date: "2024-06-30",
        artists: ["luther", "isha-limsa"],
        festival: "Europavox",
        placeId: "place-du-1er-mai",
    },
    {
        date: "2024-09-20",
        artists: [
            "nobodylikesbirdie",
            "jaymee",
            "douze-deluge",
            "crc",
            "deelee-s",
            "baby-neelou",
            "babysolo33",
            "edge",
            "zinee",
            "jolagreen23",
            "ben-plg",
            "nes",
            "wallace-cleaver",
            "winnterzuko",
            "zeu",
        ],
        festival: "Grünt festival",
        placeId: "parc-de-la-bergere",
        note: "I slept one week in my car to assist to this festival.",
    },
    {
        date: "2024-09-21",
        artists: [
            "giuseppe",
            "heloim",
            "zoomy",
            "huntrill",
            "isha-limsa",
            "jade",
            "advm",
            "keroue",
            "ptite-soeur",
            "th",
            "zamdane",
            "tif",
            "luther-collab",
        ],
        festival: "Grünt festival",
        placeId: "parc-de-la-bergere",
    },
    {
        date: "2024-09-25",
        artists: ["bb-jacques"],
        placeId: "gaite-lyrique",
        note: "It was the release party of his new album Bluebird.",
    },
    {
        date: "2024-11-09",
        artists: ["advm", "jaymee", "sheng", "heloim"],
        placeId: "la-marbrerie",
        festival: "Séquence Club",
    },
    {
        date: "2024-11-14",
        artists: ["luther", "6ilverr"],
        placeId: "cooperative-de-mai",
    },
    {
        date: "2024-11-23",
        artists: [
            "peterparker69",
            "wagahai-is-neko",
            "bloody-sanji",
            "6ilverr",
            "ucyll",
            "shooda",
            "lorenzi",
            "ano-poli",
            "yume",
        ],
        festival: "Rêves 11",
        placeId: "gaite-lyrique",
    },
    {
        date: "2024-11-24",
        artists: ["steban", "jrk19", "dinos"],
        festival: "Dans le club Arte",
        placeId: "gaite-lyrique",
    },
    {
        date: "2024-11-29",
        artists: ["ratus", "blaz-pit"],
        placeId: "gaite-lyrique",
    },
    {
        date: "2024-12-06",
        artists: ["selug-senar"],
        placeId: "la-machine-du-moulin-rouge",
    },
    {
        date: "2024-12-13",
        artists: ["sto", "romsii"],
        placeId: "trabendo",
    },
    {
        date: "2024-12-19",
        artists: [
            "advm",
            "baby-neelou",
            "mandyspie",
            "dnd",
            "dara",
            "kay-the-prodigy",
            "thahomey",
            "gemen",
            "elyslime",
            "woody-collab",
        ],
        placeId: "fgo-barbara",
        festival: "Symbiose Release Party",
    },
    {
        date: "2025-01-09",
        artists: ["jolagreen23"],
        placeId: "la-cigale",
    },
    {
        date: "2025-01-11",
        artists: ["kaaris"],
        placeId: "paris-la-defense-arena",
    },
    {
        date: "2025-01-24",
        artists: ["al-walid", "giuseppe", "leo-svr", "myth-syzer"],
        placeId: "petit-bain",
        festival: "Séquence Club",
    },
    {
        date: "2025-03-08",
        artists: ["houdi", "deelee-s"],
        placeId: "zenith-paris-la-villette",
    },
    {
        date: "2025-04-03",
        artists: ["jeune-lion", "elyslime"],
        placeId: "la-place",
    },
    {
        date: "2025-04-16",
        artists: ["theodora"],
        placeId: "cabaret-sauvage",
    },
    {
        date: "2025-06-13",
        artists: ["arch"],
        placeId: "start-&-stop",
    },
    {
        date: "2025-06-21",
        artists: ["arch"],
        festival: "Fête de la musique",
        placeId: "place-des-carmes",
    },
    {
        date: "2025-06-27",
        artists: ["lamomali", "polo-pan", "bekar", "roland-cristal"],
        festival: "Europavox",
        placeId: "place-du-1er-mai",
    },
    {
        date: "2025-06-28",
        artists: ["philippe-katerine", "kavinsky", "dali"],
        festival: "Europavox",
        placeId: "place-du-1er-mai",
    },
    {
        date: "2025-06-29",
        artists: ["zaho-de-sagazan", "thea", "jolagreen23", "super-parquet"],
        festival: "Europavox",
        placeId: "place-du-1er-mai",
    },
    {
        date: "2025-07-18",
        artists: ["bandikoot"],
        festival: "Raeverie Festival",
        placeId: "place-jacques-magnier",
    },
    {
        date: "2025-07-19",
        artists: ["von-bikrav", "silence", "flkn"],
        festival: "Raeverie Festival",
        placeId: "place-jacques-magnier",
    },
    {
        date: "2025-07-25",
        artists: ["dj-schnake"],
        festival: "Château Perché",
        placeId: "chateau-de-farcheville",
    },
    {
        date: "2025-07-26",
        artists: ["jean-paul-groove", "romain-play"],
        festival: "Château Perché",
        placeId: "chateau-de-farcheville",
    },
    {
        date: "2025-09-20",
        artists: ["toma", "gal", "toothpick", "arch"],
        placeId: "le-lieu-dit",
    },
    {
        date: "2025-09-26",
        artists: ["arch"],
        placeId: "la-boule-noire",
    },
    {
        date: "2025-10-04",
        artists: ["ramirez", "sxmpra"],
        placeId: "la-bellevilloise",
    },
    {
        date: "2025-10-04",
        artists: ["jade", "akissi"],
        festival: "Séquence Club",
        placeId: "dock-b",
    },
    {
        date: "2025-10-08",
        artists: ["infinit", "deelee-s", "le-double", "chavi", "oglounis"],
        placeId: "la-cigale",
    },
    {
        date: "2025-10-11",
        artists: ["arch", "notinbed"],
        festival: "Sismic",
        placeId: "cooperative-de-mai",
    },
    {
        date: "2025-11-22",
        artists: [
            "irko",
            "alcatraz",
            "lili-castiglioni",
            "eliesg",
            "vendredear",
            "vilhelm",
            "ayegy",
        ],
        placeId: "trabendo",
    },
    {
        date: "2025-11-28",
        artists: [
            "coeurco",
            "pleur",
            "32",
            "encoreuneautre",
            "8racks",
            "dries-bormans",
            "bahamas",
            "idee-noire",
            "bloody-sanji",
            "yume",
            "lorenzi",
        ],
        placeId: "petit-bain",
        festival: "Rêves 15",
    },
    {
        date: "2025-12-16",
        artists: ["32"],
        festival: "Mosaïque N°12 - Launch Party",
        placeId: "la-rotonde-stalingrad",
    },
    {
        date: "2025-12-19",
        artists: ["nobodylikesbirdie"],
        placeId: "la-boule-noire",
    },
];

// Unique places catalog (manually enrich with coordinates)
// Each key is a `placeId`, generated from location/festival/city.
// You can set lat/lng manually here; `count` is auto-calculated.
const placesSeedData = {
    "cooperative-de-mai": {
        location: "Coopérative de mai",
        city: "Clermont-Ferrand",
        lat: 45.788303,
        lng: 3.100651,
    },
    "theatre-antique-de-fourviere": {
        location: "Théâtre antique de Fourvière",
        city: "Lyon",
        lat: 45.760509,
        lng: 4.82006,
    },
    "printemps-de-bourges": {
        location: "Printemps de Bourges",
        city: "Bourges",
        lat: 47.077489,
        lng: 2.39558,
    },
    "place-du-1er-mai": {
        location: "Place du 1er Mai",
        city: "Clermont-Ferrand",
        lat: 45.787682,
        lng: 3.099883,
    },
    "zenith-d-auvergne": {
        location: "Zénith d'Auvergne",
        city: "Cournon",
        lat: 45.728506,
        lng: 3.203434,
    },
    "champ-louet": {
        location: "Champ Louet",
        city: "Clisson",
        lat: 47.095664978027344,
        lng: -1.2684575319290161,
    },
    "raymond-bar": {
        location: "Raymond Bar",
        city: "Clermont-Ferrand",
        lat: 45.780818939208984,
        lng: 3.1096835136413574,
    },
    "grand-parc-miribel-jonage": {
        location: "Grand Parc Miribel Jonage",
        city: "Lyon",
        lat: 45.797943115234375,
        lng: 4.940857887268066,
    },
    "confort-moderne": {
        location: "Confort Moderne",
        city: "Poitiers",
        lat: 46.57262420654297,
        lng: 0.3593447208404541,
    },
    "marche-gare": {
        location: "Marché Gare",
        city: "Lyon",
        lat: 45.74134826660156,
        lng: 4.822506904602051,
    },
    "le-sucre": {
        location: "Le Sucre",
        city: "Lyon",
        lat: 45.739341735839844,
        lng: 4.815036296844482,
    },
    "halle-tropisme": {
        location: "Halle Tropisme",
        city: "Montpellier",
        lat: 43.59841537475586,
        lng: 3.8561739921569824,
    },
    "parc-de-la-bergere": {
        location: "Parc de la Bergère",
        city: "Bobigny",
        lat: 48.902661,
        lng: 2.452724,
    },
    "gaite-lyrique": {
        location: "Gaité Lyrique",
        city: "Paris",
        lat: 48.8665807,
        lng: 2.3533873,
    },
    "la-marbrerie": {
        location: "La Marbrerie",
        city: "Montreuil",
        lat: 48.8642888,
        lng: 2.4405078,
    },
    "la-machine-du-moulin-rouge": {
        location: "La Machine du Moulin Rouge",
        city: "Paris",
        lat: 48.8841454,
        lng: 2.3322002,
    },
    trabendo: {
        location: "Trabendo",
        city: "Paris",
        lat: 48.88639450073242,
        lng: 2.383962869644165,
    },
    "la-cigale": {
        location: "La Cigale",
        city: "Paris",
        lat: 48.88298797607422,
        lng: 2.3441269397735596,
    },
    "petit-bain": {
        location: "Petit Bain",
        city: "Paris",
        lat: 48.8354259,
        lng: 2.3767186,
    },
    "chateau-de-farcheville": {
        location: "Château de Farcheville",
        city: "Bouville",
        lat: 48.428829193115234,
        lng: 2.284989356994629,
    },
    "la-boule-noire": {
        location: "La Boule Noire",
        city: "Paris",
        lat: 48.88298797607422,
        lng: 2.3441269397735596,
    },
    "fgo-barbara": {
        location: "FGO-Barbara",
        city: "Paris",
        lat: 48.884294,
        lng: 2.3538553,
    },
    "paris-la-defense-arena": {
        location: "Paris La Défense Arena",
        city: "Nanterre",
        lat: 48.8944091796875,
        lng: 2.2295844554901123,
    },
    "zenith-paris-la-villette": {
        location: "Zénith Paris - La Villette",
        city: "Paris",
        lat: 48.88639450073242,
        lng: 2.383962869644165,
    },
    "la-place": {
        location: "La Place",
        city: "Paris",
        lat: 48.8624794,
        lng: 2.3468894,
    },
    "cabaret-sauvage": {
        location: "Cabaret Sauvage",
        city: "Paris",
        lat: 48.8960013,
        lng: 2.3929687,
    },
    "start-&-stop": {
        location: "Start & Stop",
        city: "Clermont-Ferrand",
        lat: 45.77982711791992,
        lng: 3.0780816078186035,
    },
    "place-des-carmes": {
        location: "Place des Carmes",
        city: "Clermont-Ferrand",
        lat: 45.782806396484375,
        lng: 3.0946781635284424,
    },
    "place-jacques-magnier": {
        location: "Place Jacques Magnier",
        city: "Saint-Éloy-les-Mines",
        lat: 46.15526580810547,
        lng: 2.837221145629883,
    },
    "le-lieu-dit": {
        location: "Le Lieu-Dit",
        city: "Clermont-Ferrand",
        lat: 45.7807144,
        lng: 3.0815905,
    },
    "la-bellevilloise": {
        location: "La Bellevilloise",
        city: "Paris",
        lat: 48.8682829,
        lng: 2.3922306,
    },
    "dock-b": {
        location: "Dock B",
        city: "Pantin",
        lat: 48.894744873046875,
        lng: 2.415419101715088,
    },
    "la-rotonde-stalingrad": {
        location: "La Rotonde Stalingrad",
        city: "Paris",
        lat: 48.8835848,
        lng: 2.3695698,
    },
};

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

    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
            maxZoom: 18,
        },
    ).addTo(map);

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
        const label =
            place.location || place.festival || place.city || "Unknown";

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
            const nameSpan = tile.querySelector(
                ".artist-name, .top-artist-name",
            );
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
        .map(({ count, artist }) => {
            const { deezerId, imagePath, displayName, useSkeleton } =
                getArtistDisplayState(artist);
            const deezerAttr = deezerId ? `data-deezer-id="${deezerId}"` : "";

            return `
                <article class="top-artist-card" ${deezerAttr}>
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
    document.getElementById("total-festivals").textContent =
        uniqueFestivals.size;
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
}

// Render concerts
function renderConcerts() {
    const container = document.getElementById("concerts-container");
    const noResults = document.getElementById("no-results");
    container.innerHTML = "";

    // Filter concerts
    const filteredConcerts =
        currentFilter === "all"
            ? concertsData
            : concertsData.filter(
                  (c) =>
                      new Date(c.date).getFullYear().toString() ===
                      currentFilter,
              );

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
                console.warn(
                    `Artist ID "${artistId}" not found in artistsData`,
                );
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
