var pubKey = "81c4dc1da0eaac5d29524d7ffb947b4a"
var timeStamp = Date.now()

fetch(`http://gateway.marvel.com/v1/public/comics?ts=${timeStamp}&apikey=${pubKey}`)
.then(function(response){return response.json()})
.then(function(response) {
  console.log(response)
})
