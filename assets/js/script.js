var charName = prompt("enter search term for marvel api (Character Name)")

var pubKey = "81c4dc1da0eaac5d29524d7ffb947b4a"
var timeStamp = Date.now()


fetch(`https://gateway.marvel.com/v1/public/characters?name=${charName}&ts=${timeStamp}&apikey=${pubKey}`)
.then(function(response){return response.json()})
.then(function(response) {
  console.log(response)
})
characters?name=Hulk
