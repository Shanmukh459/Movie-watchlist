const searchBtn = document.getElementById("search-btn")
const APIKEY = "46677be2"

searchBtn.addEventListener("click", function(e) {
    e.preventDefault()
    getMovies()
})

function getMovies() {
    const searchText = document.getElementById("search-text").value
    console.log(searchText.split(" ").join("+"))

    fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&t=${searchText}`)
        .then(res => res.json())
        .then(data => console.log(data))
}