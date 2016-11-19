# Music Metadata
> Get album / artist artwork and metadata


## Install

```bash
$ npm install --save music-md
```


## Usage

```js

var musicMeta = require('music-md')

musicMeta.getAlbum('Goo', 'Sonic Youth', 'large')
  .then(function(data) {
    // console.log(data)
    // => 
          { artist: 'Sonic Youth',
            album: 'Goo',
            albumArtwork: 'https://lastfm-img2.akamaized.net/i/u/174s/9fecf539cc254e87b7b44035efd93ea7.png',
            trackList:
             [ { title: 'Dirty Boots', duration: '290', trackNo: 1 },
               { title: 'Tunic (Song for Karen)', duration: '377', trackNo: 2 },
               { title: 'Mary-Christ', duration: '188', trackNo: 3 },
               { title: 'Kool Thing', duration: '244', trackNo: 4 },
               { title: 'Mote', duration: '456', trackNo: 5 },
               { title: 'My Friend Goo', duration: '138', trackNo: 6 },
               { title: 'Disappearer', duration: '295', trackNo: 7 },
               { title: 'Mildred Pierce', duration: '132', trackNo: 8 },
               { title: 'Cinderella\'s Big Score', duration: '354', trackNo: 9 },
               { title: 'Scooter + Jinx', duration: '60', trackNo: 10 },
               { title: 'Titanium Expose', duration: '285', trackNo: 11 } ] 
    }
  })


musicMeta.getArtistInfoAndImage('Nine Inch Nails', 'medium')
  .then(function(data) {
    // console.log(data)
    // => 
      { artwork: 'https://lastfm-img2.akamaized.net/i/u/64s/4395b0232dda4cd08e1a871f5ecf1714.png',
        bio: "Nine Inch Nails is a Cleveland, OH, USA, Industrial rock band that was formed in 1988 by Trent Reznor, the only constant member of the band. He\'s generally credited for popularizing the genre known as "industrial rock" with both his releases and dark, theatrical music videos.\n\nBorn Michael Trent Reznor, he was raised by his maternal grandparents in Mercer, Pennsylvania, USA. Reznor took up piano at the age of five and in high school took up the tuba and saxophone. In the early to mid-80s...",
        tags:  ['industrial',
         'industrial rock',
         'rock',
         'alternative',
         'electronic']
    }
  })

```

## API

### getAlbum(album, artist, size)

#### album

*Required*  
Type: `string`

Title of the album to search for.

#### artist

*Required* 
Type: `string`

Album's artist.

#### size

*Required* 
Type: `string` 

*possible values:* `small`, `medium`, `large`, `extralarge`, `mega`

Size of album image to return.

#### Returns new Promise()

### getArtist(artist, size)

#### artist

*Required*  
Type: `string`

Title of the artist to search for.

#### size

*Required* 
Type: `string` 

*possible values:* `small`, `medium`, `large`, `extralarge`, `mega`

Size of artist image to return.

#### Returns new Promise()

## License

This package uses the Last.fm API for it's data. You may consult the [Last.fm API Terms of Service](http://www.last.fm/api/tos) for license details. 

MIT License - [Khalil Stemmler](http://khalilstemmler.com)
