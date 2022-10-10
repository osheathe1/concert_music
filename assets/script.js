
// var requestUrl = "https://api.spotify.com/v1/search?q=<artist name>&type=artist",{
// //var id = "4a74af7986d54b1790caf8e74b2b5a6c"
// fetch(requestUrl,{
// })
//     .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);
//       });
    var apiController = (function(){
      var clientId='';
      var clientSecret='';

      //private methods
      var _getToken = async () => {

        var result = await fetch ('https://accounts.spotify.com/api/token',{
          method: 'POST',
          headers: {
            'Content-type' : 'application/x-ww-form-urlencoded',
            'Authorization' : 'Basic' + btoa(clientId + ':' + clientSecret)
          }, 
            body: 'grant_type=client_credentials'
          
        });
        var data = await result.json();
        return data.access_token;  
      }
    

    var _getGenres = async (token)=>{
      var result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US',{
        method:'GET',
        headers: {'Authorization' : 'Bearer' + token}
      });
      var data=await result.json();
      return data.categories.items;
    }

    var _getPlaylistByGenre = async(token, genreId)=>{

      var limit = 10;

      var result = await fetch('https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}',{
        method:'GET',
        headers: {'Authorization' : 'Bearer' + token}

      });
      var data = await result.json();
      return data.playlists.items;
    }
     
    var _getTracks = async (token, tracksEndPoint)=>{

      var limit = 10;

      var result = await fetch('${tracksEndPoint}?limit=${limit}',{
        method:'GET',
        headers: {'Authorization' : 'Bearer' + token}
      });

      var data = result.json();
      return data.items;
    }

    var _getTrack = async (token, trackEndPoint)=>{
      
      var result = await fetch('${trackEndPoint}',{
        method:'GET',
        headers: {'Authorization' : 'Bearer' + token}
      });

      var data = await result.json();
      return data;
    }
    return{
      getToken(){
        return _getToken();
      },
      getGenres(token){
        return _getGenres(token);
      },
      getPlaylistByGenre(token,genreId){
        return _getPlaylistByGenre(token, genreId);

      },
      getTracks(token,tracksEndPoint){
        return _getTracks(token, tracksEndPoint)
      },
      getTrack(token,trackEndPoint){
        return _getTrack(token, trackEndPoint)
      }

    }
   

  })();
// var app=" https://api.spotify.com/v1/recommendations"

// fetch('https://api.spotify.com/v1/me/top/artists', function(req, res) {
//   console.log('top artists');

//   var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };

//   request.post(authOptions, function(error, response, body) {
//     console.log('request')
//     if (!error && response.statusCode === 200) {

//         var access_token = body.access_token,
//             refresh_token = body.refresh_token;
//         var options = {
//           url: 'https://api.spotify.com/v1/me/top/artists',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };

//         // use the access token to access the Spotify Web API
//         request.get(options, function(error, response, body) {
//           console.log('request 2')
//           console.log(body);
//         });
//      }
//   });
// })
