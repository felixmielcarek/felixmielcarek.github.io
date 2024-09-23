class Artist {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
}

class Concert {
    constructor(date, artists, location, city) {
        this.date = date;
        this.artists = artists;
        this.location = location;
        this.city = city;
    }
}

function deserializeConcerts(json) {
    const parsedData = JSON.parse(json);
    const concerts = parsedData.map(concertData => {
        const artists = concertData.artists.map(artistData => new Artist(artistData.name, artistData.image));
        return new Concert(concertData.date, artists, concertData.location, concertData.city);
    });

    return concerts;
}

const json = `
[
    {
        "date": "2016-02-17",
        "artists": [
            { "name": "Berywam", "image": "image1.jpg" },
            { "name": "Bigflo et Oli", "image": "image2.jpg" }
        ],
        "location": "Coopérative de mai",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2016-03-10",
        "artists": [
            { "name": "Georgio", "image": "image1.jpg" },
            { "name": "Vald", "image": "image2.jpg" }
        ],
        "location": "Coopérative de mai",
        "city": "Clermont-Ferrand"
    },
    {
        "date": "2017-07-04",
        "artists": [
            { "name": "Alt J", "image": "image1.jpg" }
        ],
        "location": "Nuits de fourvières",
        "city": "Lyon"
    }
]
`
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
                const newConcert = document.createElement('table')
                
                const newDate = document.createElement('tr')
                const newDateLabel = document.createElement('td')
                newDateLabel.innerHTML = `Date`
                const newDateValue = document.createElement('td')
                newDateValue.innerHTML = `${new Date(concert.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
                newDate.appendChild(newDateLabel)
                newDate.appendChild(newDateValue)
                newConcert.appendChild(newDate)

                const newArtists = document.createElement('tr')
                const newArtistsLabel = document.createElement('td')
                newArtistsLabel.innerHTML = `Artists`
                const newArtistsValue = document.createElement('td')
                let tmpArtistsValue = `${concert.artists[0].name}`
                for(let i=1; i < concert.artists.length; i++){
                    tmpArtistsValue += ` / ${concert.artists[i].name}`
                }
                newArtistsValue.innerHTML = tmpArtistsValue
                newArtists.appendChild(newArtistsLabel)
                newArtists.appendChild(newArtistsValue)
                newConcert.appendChild(newArtists)
                
                container.appendChild(newConcert)
            })
        }
    }
}
