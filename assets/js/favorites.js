let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
console.log(searchHistory)

searchHistory.map(function (item) {
  let card = document.createElement("div")
  card.innerHTML =
  `<div class="card blue-grey darken-1"><div class="card-content white-text"><span class="card-title"> ${item} </div></div>`;
  document.querySelector(".favorites").appendChild(card)
})