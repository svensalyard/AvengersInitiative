/*
var charName = prompt("enter search term for marvel api (Character Name)")

var pubKey = "81c4dc1da0eaac5d29524d7ffb947b4a"
var timeStamp = Date.now()


fetch(`https://gateway.marvel.com/v1/public/characters?name=${charName}&ts=${timeStamp}&apikey=${pubKey}`)
.then(function(response){return response.json()})
.then(function(response) {
  console.log(response)
})
*/


var summaryTextElm = $("#short-summary")
var thumbnailElm = $("#thumbnail")
var contentTitleElm = $("#content-title")
var searchTerm = "Jaguar"

// variables for saving content to local storage
var contentTitle
var contentDescription
var contentImage

// parse page info returned from fetch to pull thumbnail image (if page has thumbnail image) if no image is found return null
function getAndAddThumbnail(title, id, imgSize) // page title, page id, image size
{
  fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageimages&format=json&titles=${title}&pithumbsize=${imgSize}`)
    .then(function(response){return response.json()})
    .then(function(response) 
      {
        console.log(response)
        var resp = response.query.pages[id].thumbnail.source
        console.log(resp)
        if(resp != undefined)
        {
          console.log("adding image")
          thumbnailElm.empty()
          thumbnailElm.prepend(`<img id="${pageTitle}" src="${resp}" />`)
          contentImage = `<img id="${pageTitle}" src="${resp}" />`
        }
      }
    )
    .catch(function(e)
      {
        console.log("thumbnail image not found, returning null")
        console.log(e)
        contentImage = null
        return null
      }
    );
}

// split the returned data(html) by the paragraphs(<p>Text</p>) and return the paragraph that has the characters summary to be displayed
function getShortSummary(response)
{
  var respSplit = response.parse.text["*"].split("<p>", 4)
  respSplit.splice(0,2)
  var shortSummary = respSplit[0].split("</p>", 1)
  var shortSummary = "<p>\n" + shortSummary + "</p>"
  // console.log(shortSummary)
  var arr = shortSummary.split("<a")
  var arr2 = []
  for(i = 0; i < arr.length; i++)
  {
    temp = arr[i].split('">')
    // console.log(temp)
    if(temp[1] != undefined)
      arr2.push(temp[1])
    else
    arr2.push(temp[0])
  }
  shortSummary = ""
  for(i = 0; i < arr2.length; i++)
  {
    temp = arr2[i].split("</a>")
    // console.log(temp)
    shortSummary = shortSummary + temp[0] + temp[1]
  }
  // console.log(shortSummary)
  // console.log(arr)
  // console.log(arr2)
  contentDescription = shortSummary
  return shortSummary
}


// get searchterm from whatever source, then query the wikipedia api with that search term
fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&format=json&list=search&formatversion=1&srsearch=${searchTerm}`)
    .then(function(response){return response.json()})
    .then(function(response) {
      // get title(formatted exactly as its needed) from last fetch and make a new query for the page data(pages html)
      fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=parse&prop=text&page=${response.query.search[0].title}&format=json`)
        .then(function(response){return response.json()})
        .then(function(response) {
          console.log(response)
          pageID = response.parse.pageid
          pageTitle = response.parse.title
          contentTitle = pageTitle
          contentTitleElm.text(pageTitle)
          console.log(pageID)
          getAndAddThumbnail(pageTitle, pageID, 1000) // explained where function is defined
          shortSummary = getShortSummary(response) // explained where function is defined
          summaryTextElm.empty()
          summaryTextElm.append(shortSummary) // add text to box to be displayed
        }
  )})
  .catch(function(error){console.log(error);});
