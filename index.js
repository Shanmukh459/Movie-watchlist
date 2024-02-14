const searchBtn = document.getElementById("search-btn")
const APIKEY = "46677be2"
let movieData

searchBtn.addEventListener("click", function(e) {
    e.preventDefault()
    getMovies()
})

function getMovies() {
    const searchText = document.getElementById("search-text").value

    fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`)
        .then(res => res.json())
        .then(data => {
            movieData = data.Search
            displaySearchResults(movieData)
            console.log(data)
            console.log(movieData)
        })
}

function displaySearchResults(movies) {
    
}