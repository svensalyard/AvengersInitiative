// Defines searchHistory variable and checks local storage for data or forms an emtpy array if nothing is found in local.
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
console.log(searchHistory)

//Takes the searches from the array and displays them in individual cards in the history (favorites.html) page.
searchHistory.map(function (item) {
  let card = document.createElement("div")
  card.innerHTML =
  `<div class="card blue-grey darken-1"><div class="card-content white-text"><span class="card-title"> ${item} </div></div>`;
  document.querySelector(".favorites").appendChild(card)
})