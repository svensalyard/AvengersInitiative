document.addEventListener('DOMContentLoaded', function() {
  // Fixed Materialize error
  if (M && typeof M.updateTextFields === 'function') {
      M.updateTextFields();
  }

  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  const marvelButton = document.querySelector(".search-marvel");
  const wikipediaButton = document.querySelector(".search-wikipedia");

  wikipediaButton.addEventListener('click', async function (e) {
    e.preventDefault();
  var searchInput = document.getElementById('search');
  var summaryTextElm = $("#short-summary")

  var contentTitleElm = $("#content-title")
  var searchTerm = searchInput.value
    searchHistory.push(searchTerm)
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
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
        });
    // Marvel API
  var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

  var hashDate = Date.now()
  var value = hashDate + '2ffded2206578b56b9ffdd6021c2bba2d559fa3181c4dc1da0eaac5d29524d7ffb947b4a';

  var hashKey = MD5(value);
  var pubKey = "81c4dc1da0eaac5d29524d7ffb947b4a"

  console.log('hash -  normal words: ' + hashKey)

  fetch(`https://gateway.marvel.com/v1/public/comics?ts=${hashDate}&apikey=${pubKey}&hash=${hashKey}`)
  .then(function(response){return response.json()})
  .then(function(response) {
    console.log(response)
  })

  // Elements
  var searchForm = document.querySelector('form');
  var searchInput = document.getElementById('search');
  var charCard = document.querySelector('.card.darken-2');
  var infoCard = document.querySelector('.card.darken-4');

  var thumbnailElm = $("#thumbnail")

  // Event Listener for Form Submission
marvelButton.addEventListener('click', async function (e) {
      e.preventDefault();
      var charName = searchInput.value;
      searchHistory.push(charName)
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
      var url = `https://gateway.marvel.com/v1/public/characters?name=${charName}&apikey=${pubKey}&hash=${hashKey}&ts=${hashDate}`;

      try {
          // Fetches data from Marvel API
          var response = await fetch(url);
          var data = await response.json();
          var character = data.data.results[0];
          var charImage = `${character.thumbnail.path}.${character.thumbnail.extension}`;
          // Update UI with fetched data
          charCard.querySelector('.card-image img').src = charImage;
          charCard.querySelector('.card-content h3').textContent = character.name;
          infoCard.querySelector('.card-content h3').textContent = 'Character Information';
          infoCard.querySelector('.card-content p').textContent = character.description;

      } catch (error) {
          console.error('Error:', error);
      }
  });
});