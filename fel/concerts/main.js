const json = `
[
    {
        "date": "2016-02-17",
        "artists": [
            { "name": "Berywam", "image": "berywam.jpg" },
            { "name": "Bigflo et Oli", "image": "bigflo&oli.jpg" }
        ],
        "location": "Coopérative de mai",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2016-03-10",
        "artists": [
            { "name": "Georgio", "image": "georgio.jpg" },
            { "name": "Vald", "image": "vald.webp" }
        ],
        "location": "Coopérative de mai",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2017-07-04",
        "artists": [
            { "name": "Alt J", "image": "altj.jpg" }
        ],
        "festival": "Nuits de fourvières",
        "city": "Lyon"
    },
    {
        "date": "2017-10-21",
        "artists": [
            { "name": "Gros Mo", "image": "grosmo.jpg" },
            { "name": "Lomepal", "image": "lomepal.jpg" }
        ],
        "location": "Coopérative de mai",
        "festival": "Festival Sismic",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2018-03-23",
        "artists": [
            { "name": "Nusky", "image": "nusky.jpg" },
            { "name": "Roméo Elvis", "image": "romeoelvis.webp" }
        ],
        "location": "Coopérative de mai",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2018-04-26",
        "artists": [
            { "name": "Biffty & Julius", "image": "biffty&julius.jpg" },
            { "name": "Caballero & Jeanjass", "image": "caballero&jeanjass.jpg" },
            { "name": "Damso", "image": "damso.jpg" },
            { "name": "Orelsan", "image": "orelsan.jpg" }
        ],
        "festival": "Printemps de Bourges",
        "city": "Bourges"
    },
    {
        "date": "2018-05-19",
        "artists": [
            { "name": "Alt J", "image": "altj.jpg" }
        ],
        "location": "Coopérative de mai",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2018-06-30",
        "artists": [
            { "name": "Riles", "image": "riles.jpg" },
            { "name": "Tommy Cash", "image": "tommycash.webp" }
        ],
        "festival": "Europavox",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2018-07-01",
        "artists": [
            { "name": "Lomepal", "image": "lomepal.jpg" },
            { "name": "Angèle", "image": "angele.webp" },
            { "name": "Orelsan", "image": "orelsan.jpg" },
            { "name": "Di-meh & Makala & Slimka", "image": "dimehslimkamakala.jpg" }
        ],
        "festival": "Europavox",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2019-06-27",
        "artists": [
            { "name": "Lord Esperanza", "image": "lordesperanza.jpg" },
            { "name": "Roméo Elvis", "image": "romeoelvis.webp" },
            { "name": "Nekfeu", "image": "nekfeu.webp" },
            { "name": "Salut c'est cool", "image": "salutcestcool.jpg" },
            { "name": "PLK", "image": "plk.jpg" },
            { "name": "Columbine", "image": "columbine.jpg" },
            { "name": "Georgio", "image": "georgio.jpg" }
        ],
        "festival": "Europavox",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2021-12-15",
        "artists": [
            { "name": "Igorrr", "image": "igorrr.webp" }
        ],
        "location": "Coopérative de mai",
        "city": "Clermont-Ferrand",
        "note": "The first concert where I went solo"
    },
    {
        "date": "2022-04-01",
        "artists": [
            { "name": "Orelsan", "image": "orelsan.jpg" }
        ],
        "location": "Zénith d'Auvergne",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2022-06-17",
        "artists": [
            { "name": "Opeth", "image": "opeth.jpg" },
            { "name": "In Other Climes", "image": "inotherclimes.jpg" },
            { "name": "Mordred", "image": "mordred.webp" },
            { "name": "Abbath", "image": "abbath.webp" },
            { "name": "Cadaver", "image": "cadaver.jpg" }
        ],
        "festival": "Hellfest",
        "city": "Clisson"
    },
    {
        "date": "2022-06-18",
        "artists": [
            { "name": "Invisions", "image": "invisions.jpg" },
            { "name": "Heaven Shall Burn", "image": "heavenshallburn.jpg" },
            { "name": "Megadeath", "image": "megadeath.webp" },
            { "name": "Alestorm", "image": "alestorm.webp" },
            { "name": "Deep Purple", "image": "deeppurple.webp" },
            { "name": "Helheim", "image": "helheim.jpg" },
            { "name": "Sepultura", "image": "sepultura.webp" },
            { "name": "Brutal Sphincter", "image": "brutalsphincter.jpg" },
            { "name": "Rectal Smegma", "image": "rectalsmegma.jpg" }
        ],
        "festival": "Hellfest",
        "city": "Clisson"
    },
    {
        "date": "2022-06-19",
        "artists": [
            { "name": "Korn", "image": "korn.jpg" },
            { "name": "Gojira", "image": "gojira.jpg" },
            { "name": "Down", "image": "down.jpg" },
            { "name": "Landmvrks", "image": "landmvrks.jpg" },
            { "name": "While she sleeps", "image": "whileshesleeps.jpg" },
            { "name": "Walls of Jericho", "image": "wallsofjericho.jpg" },
            { "name": "Regarde les hommes tomber", "image": "regardeleshommestomber.jpg" },
            { "name": "Alcest", "image": "alcest.webp" }
        ],
        "festival": "Hellfest",
        "city": "Clisson"
    },
    {
        "date": "2022-07-01",
        "artists": [
            { "name": "Oboy", "image": "oboy.jpg" },
            { "name": "Vald", "image": "vald.webp" }
        ],
        "festival": "Europavox",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2022-07-02",
        "artists": [
            { "name": "Laylow", "image": "laylow.jpg" },
            { "name": "Vladimir Cauchemar", "image": "vladimircauchemar.webp" }
        ],
        "festival": "Europavox",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2022-07-03",
        "artists": [
            { "name": "Sopico", "image": "sopico.jpg" },
            { "name": "Lujipeka", "image": "lujipeka.jpg" },
            { "name": "Angèle", "image": "angele.webp" }
        ],
        "festival": "Europavox",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2022-10-21",
        "artists": [
            { "name": "SCH", "image": "sch.jpg" }
        ],
        "location": "Zénith d'Auvergne",
        "city": "Clermont-Ferrand",
        "note": "Such amazed by SCH fits during the show, that I only dressed in black udring the weeks following the concert"
    },
    {
        "date": "2023-06-17",
        "artists": [
            { "name": "Angsty Camboyz Revenge", "image": "angstycamboyzrevenge.jpg" }
        ],
        "location": "Raymond Bar",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2023-06-30",
        "artists": [
            { "name": "Pomme", "image": "pomme.jpg" },
            { "name": "Josman", "image": "josman.jpg" },
            { "name": "Varnish la piscine", "image": "varnishlapiscine.jpg" }
        ],
        "festival": "Europavox",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2023-08-26",
        "artists": [
            { "name": "Zola", "image": "zola.jpg" },
            { "name": "Bushi", "image": "bushi.jpg" },
            { "name": "Makala", "image": "makala.jpg" },
            { "name": "Nes", "image": "nes.jpg" }
        ],
        "festival": "Woodstower",
        "city": "Lyon",
        "note": "We finished the festival with 10cm of water above our ankles"
    },
    {
        "date": "2023-09-30",
        "artists": [
            { "name": "Sto", "image": "sto.jpg" },
            { "name": "Sheldon", "image": "sheldon.jpg" }
        ],
        "location": "Confort Moderne",
        "city": "Poitiers"
    },
    {
        "date": "2023-10-13",
        "artists": [
            { "name": "Nocif", "image": "nocif.jpg" },
            { "name": "H Jeune Crack", "image": "hjeunecrack.jpg" }
        ],
        "location": "Marché Gare",
        "city": "Lyon"
    },
    {
        "date": "2024-03-08",
        "artists": [
            { "name": "Slimka", "image": "slimka.jpg" }
        ],
        "location": "Le Sucre",
        "city": "Lyon"
    },
    {
        "date": "2024-04-20",
        "artists": [
            { "name": "Infinit", "image": "infinit.jpg" }
        ],
        "location": "Coopérative de mai",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2024-05-31",
        "artists": [
            { "name": "Asheo", "image": "asheo.jpg" },
            { "name": "Jeune Mort", "image": "jeunemort.jpg" }
        ],
        "location": "Coopérative de mai",
        "city": "Clermont-Ferrand",
        "note": "It's the period when I started to follow Clermont-Ferrand underground rap scene, notably open-mics"
    },
    {
        "date": "2024-06-07",
        "artists": [
            { "name": "Domingo Cruz", "image": "domingocruz.jpg" },
            { "name": "Bara8!", "image": "bara8.jpg" },
            { "name": "Lovarran", "image": "lovarran.jpg" }
        ],
        "location": "Coopérative de mai",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2024-06-22",
        "artists": [
            { "name": "Deelee S & Le Double", "image": "deelees&ledouble.jpg" },
            { "name": "Kay The Prodigy", "image": "kaytheprodigy.jpg" },
            { "name": "Jolagreen23", "image": "jolagreen23.jpg" },
            { "name": "Infinit", "image": "infinit.jpg" }
        ],
        "location": "Halle Tropisme",
        "festival": "La Calle Havana",
        "city": "Montpellier"
    },
    {
        "date": "2024-06-28",
        "artists": [
            { "name": "So La Lune", "image": "solalune.png" },
            { "name": "Doums & Némir & Edge & Esso Luxueux & S.Pri Noir & 2ZER & Mekra & Framal", "image": "aaa.jpg" }
        ],
        "festival": "Europavox",
        "city": "Clermont-Ferrand",
        "note": "I went to see Ratu$ and Deen Burbigo who should have perform with Doums, the only 2 that have been skipped by lack of time"
    },
    {
        "date": "2024-06-29",
        "artists": [
            { "name": "La Fève", "image": "lafeve.jpg" },
            { "name": "Prince Waly", "image": "princewaly.jpg" },
            { "name": "Eloi", "image": "eloi.jpg" }
        ],
        "festival": "Europavox",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2024-06-30",
        "artists": [
            { "name": "Luther", "image": "luther.jpg" },
            { "name": "Isha & Limsa", "image": "isha&limsa.jpg" }
        ],
        "festival": "Europavox",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2024-09-20",
        "artists": [
            { "name": "Nobodylikesbirdie", "image": "nobodylikesbirdie.jpg" },
            { "name": "Jaymee", "image": "jaymee.jpg" },
            { "name": "Douze Déluge", "image": "douzedeluge.jpg" },
            { "name": "CRC", "image": "crc.jpg" },
            { "name": "Deelee S", "image": "deelees.jpg" },
            { "name": "Baby Neelou", "image": "babyneelou.jpg" },
            { "name": "Babysolo33", "image": "babysolo33.jpg" },
            { "name": "Edge", "image": "edge.jpg" },
            { "name": "Zinée", "image": "zinee.jpg" },
            { "name": "Jolagreen23", "image": "jolagreen23.jpg" },
            { "name": "Ben PLG", "image": "benplg.jpg" },
            { "name": "NeS", "image": "nes.jpg" },
            { "name": "Wallace Cleaver", "image": "wallacecleaver.jpg" },
            { "name": "Winnterzuko", "image": "winnterzuko.jpg" },
            { "name": "Zeu", "image": "zeu.jpg" }
        ],
        "festival": "Grünt festival",
        "city": "Bobigny",
        "note": "I slept one week in my car to be able to go to this festival"
    },
    {
        "date": "2024-09-21",
        "artists": [
            { "name": "Giuseppe", "image": "guiseppe.jpg" },
            { "name": "Heloïm", "image": "heloim.jpg" },
            { "name": "Zoomy", "image": "zoomy.jpg" },
            { "name": "Huntrill", "image": "huntrill.jpg" },
            { "name": "Isha & Limsa", "image": "isha&limsa.jpg" },
            { "name": "Jäde", "image": "jade.jpg" },
            { "name": "ADVM", "image": "advm.jpg" },
            { "name": "Keroué", "image": "keroue.jpg" },
            { "name": "Ptite Soeur", "image": "ptitesoeur.jpg" },
            { "name": "TH", "image": "th.jpg" },
            { "name": "Zamdane", "image": "zamdane.jpg" },
            { "name": "Tif", "image": "tif.jpg" },
            { "name": "Luther & Rounhaa & Abel31 & Amne & Irko & Süblime", "image": "sumblime.jpg" }
        ],
        "festival": "Grünt festival",
        "city": "Bobigny"
    },
    {
        "date": "2024-09-25",
        "artists": [
            { "name": "BB Jacques", "image": "bbjacques.jpg" }
        ],
        "location": "Gaité Lyrique",
        "city": "Paris",
        "note": "It was the release party of his new album Bluebird"
    }
]
`

class Artist {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
}

class Concert {
    constructor(date, artists, location, festival, city, note) {
        this.date = date;
        this.artists = artists;
        this.location = location;
        this.festival = festival;
        this.city = city;
        this.note = note;
    }
}

function deserializeConcerts(json) {
    const parsedData = JSON.parse(json);
    const concerts = parsedData.map(concertData => {
        const artists = concertData.artists.map(artistData => new Artist(artistData.name, artistData.image));
        return new Concert(concertData.date, artists, concertData.location, concertData.festival, concertData.city, concertData.note);
    });

    return concerts;
}



const concerts = deserializeConcerts(json);

function displayChrono() {
    const concertsByYear = {}
    concerts.forEach(item => {
        const year = new Date(item.date).getFullYear()
        if (!concertsByYear[year]) {
            concertsByYear[year] = []
        }
        concertsByYear[year].push(item);
    })

    for (const year in concertsByYear) {
        if (concertsByYear.hasOwnProperty(year)) {
            const container = document.getElementById('main')
            const newYear = document.createElement('h1')
            newYear.innerHTML = `${year}`
            container.appendChild(newYear)

            concertsByYear[year].forEach(concert => {
                const concertCard = document.createElement('div')
                concertCard.classList.add("concert-card")

                const concertInfos = document.createElement('div')
                concertInfos.classList.add("concert-infos")

                const concertDate = document.createElement('div')
                concertDate.innerHTML = `${new Date(concert.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
                concertInfos.appendChild(concertDate)

                if (concert.location) {
                    const concertLocation = document.createElement('div')
                    concertLocation.innerHTML = concert.location
                    concertInfos.appendChild(concertLocation)
                }

                if (concert.festival) {
                    const concertFestival = document.createElement('div')
                    concertFestival.innerHTML = concert.festival
                    concertInfos.appendChild(concertFestival)
                }

                const concertCity = document.createElement('div')
                concertCity.innerHTML = concert.city
                concertInfos.appendChild(concertCity)

                concertCard.appendChild(concertInfos)

                const concertRightPanel = document.createElement('div')
                concertRightPanel.classList.add('concert-right-panel')

                const concertArtists = document.createElement('div')
                concertArtists.classList.add("concert-artists")
                for (let i = 0; i < concert.artists.length; i++) {
                    const islastCol = (i + 1) % 2 == 0 || i == (concert.artists.length - 1)
                    const islastRow = (i == (concert.artists.length - 2) && (concert.artists.length) % 2 == 0) || i == (concert.artists.length - 1)

                    const newArtist = document.createElement('div')
                    if (islastCol) newArtist.classList.add("concert-artists-lastcol")
                    if (islastRow) newArtist.classList.add("concert-artists-lastrow")

                    const newArtistImage = document.createElement('img')
                    newArtistImage.src = `images/artists/${concert.artists[i].image}`
                    newArtist.appendChild(newArtistImage)

                    const newArtistName = document.createElement('div')
                    newArtistName.innerHTML = concert.artists[i].name
                    newArtist.appendChild(newArtistName)

                    concertArtists.appendChild(newArtist)
                }
                concertRightPanel.appendChild(concertArtists)

                if (concert.note) {
                    const concertNote = document.createElement('div')
                    concertNote.classList.add('concert-note')
                    concertNote.innerHTML = concert.note
                    concertRightPanel.appendChild(concertNote)
                }
                concertCard.appendChild(concertRightPanel)

                container.appendChild(concertCard)
            })
        }
    }
}
