'use strict';

/** 
  * music-metadata
  * 
  *  HTTP BODY RESPONSE ERROR CODES 
  * 
  *  2 : Invalid service - This service does not exist
  *  3 : Invalid Method - No method with that name in this package
  *  4 : Authentication Failed - You do not have permissions to access the service
  *  5 : Invalid format - This service doesn't exist in that format
  *  6 : Invalid parameters - Your request is missing a required parameter
  *  7 : Invalid resource specified
  *  8 : Operation failed - Something else went wrong
  *  9 : Invalid session key - Please re-authenticate
  *  10 : Invalid API key - You must be granted a valid key by last.fm
  *  11 : Service Offline - This service is temporarily offline. Try again later.
  *  13 : Invalid method signature supplied
  *  16 : There was a temporary error processing your request. Please try again
  *  26 : Suspended API key - Access for your account has been suspended, please contact Last.fm
  *  29 : Rate limit exceeded - Your IP has made too many requests in a short period
  */

var Promise = require('promise')
var request = require('request')

var apiKey = '0af1393e14d41fb6b9d571038e8003a8'
var apiURL = 'http://ws.audioscrobbler.com'
var acceptedArtworkSizes = ['small', 'medium', 'large', 'extralarge', 'mega']

module.exports = {

/**
  * getArtistInfo 
  *
  * Obtains an artist bio, associated tags and an artist image. 
  * The artist image can be in the sizes ['small', 'medium', 'large', 'extralarge', 'mega']
  *
  * @param {String} artist        Artist to get bio, tags and image for.
  * @param {String} artworkSize   Size of returned album artwork.
  * @return {Promise}
  */

  getArtist: function(artist, artworkSize) {
    return new Promise(function(resolve, reject) {

      if (typeof artist !== 'string') {
        throw new Error('Artist was not a string')
      }

      if (typeof artworkSize !== 'string') {
        throw new Error('Artwork size value was not a string')
      }

      if(acceptedArtworkSizes.indexOf(artworkSize) == -1) {
        throw new Error("Artwork size was not one of accepted sizes: ['small', 'medium', 'large', 'extralarge', 'mega']")
      }

      request({
        method: 'GET',
        uri: encodeURI(apiURL + '/2.0/?format=json&api_key=' + apiKey + '&method=artist.getinfo&artist=' + artist)
      }, function(err, response, body) {

          var body = JSON.parse(body)
          if(body.error) {
            // Failed Request - Return Error Code
            reject(body)

          } else {
            // Successful Request
            var response = JSON.parse(response.body)

            // Get artist artwork
            var artistArtwork = ''; 
            response.artist.image.map(function(element) {
              if(element.size == artworkSize) {
                artistArtwork = element['#text']
              }
            })

            // Get tags
            var tags = response.artist.tags.tag.map(function(element) {
              return element.name
            })

            // Get bio
            var bio = response.artist.bio.content
            try {
              bio = bio.substring(0, bio.indexOf(' <a')) + bio.substring(bio.indexOf('</a>') + 4)
            } catch (err) {
              bio = response.artist.bio.content
            }

            resolve({
              artist: response.artist.name,
              artwork: artistArtwork,
              bio: response.artist.bio.content,
              tags: tags
            })
          }
      })
    })
  },

/**
  * getAlbum 
  *
  * Obtains the tracklist and album artwork for an album.
  * The album artwork can be in the sizes ['small', 'medium', 'large', 'extralarge', 'mega']
  *
  * @param {String} album         Album name.
  * @param {String} artist        Artist name.
  * @param {String} artworkSize   Size of returned album artwork.
  * @return {Promise}
  */

  getAlbum: function(album, artist, artworkSize) {
    return new Promise(function(resolve, reject) {

      if (typeof artist !== 'string') {
        throw new Error('Artist was not a string')
      }

      if (typeof album !== 'string') {
        throw new Error('Album name was not a string')
      }

      if(acceptedArtworkSizes.indexOf(artworkSize) == -1) {
        throw new Error("Artwork size was not one of accepted sizes: ['small', 'medium', 'large', 'extralarge', 'mega']")
      }

      request({
        method: 'GET',
        uri: encodeURI(apiURL + '/2.0/?format=json&api_key=' + apiKey + '&method=album.getinfo&artist=' + artist + '&album=' + album)
      }, function(err, response, body) {
        
        var body = JSON.parse(body)
          if(body.error) {
            // Failed Request - Return Error Code
            reject(body)

          } else {
            // Successful Request
            var response = JSON.parse(response.body)

            // Get album artwork
            var albumArtwork = ''; 
            response.album.image.map(function(element) {
              if(element.size == artworkSize) {
                albumArtwork = element['#text']
              }
            })

            // Get tracks
            var trInx = 1;
            var tracks = response.album.tracks.track.map(function(element) {
              var tr = {
                title: element.name,
                duration: element.duration,
                trackNo: trInx
              }
              trInx++
              return tr
            })

            resolve({
              artist: response.album.artist,
              album: response.album.name,
              albumArtwork: albumArtwork,
              trackList: tracks
            })
          }
      })
    })
  }
}
