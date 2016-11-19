'use strict';
var assert = require('assert');
var musicMeta = require('./index');

// it('should return artist bio, tags and image', function () {
//   musicMeta.getArtist('The Birthday Party', 'large')
//     .then(function() {
//       assert.strictEqual(url.indexOf('http'), 0);
//     })
// })

it('should return album artwork and tracklisting', function () {
  musicMeta.getAlbum('Junkyard', 'The Birthday Party', 'large')
    .then(function(data) {

      var artist = data.artist
      var album = data.album 
      var albumArtwork = data.albumArtwork 
      var tracklist = data.trackList 

      assert.strictEqual(albumArtwork.indexOf('http'), 0);
      assert.strictEqual(artist, 'The Birthday Party')
      assert.strictEqual(tracklist[3].title, 'Dead Joe')
    })
})