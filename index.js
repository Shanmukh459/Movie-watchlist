const searchBtn = document.getElementById("search-btn")
const main = document.querySelector("main")
const APIKEY = "46677be2"
let allMoviesData

searchBtn.addEventListener("click", function(e) {
    e.preventDefault()
    renderMovies()
})

function renderMovies() {
    const searchText = document.getElementById("search-text").value
    let moviesHtml = ""
    fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`)
        .then(res => res.json())
        .then(allMoviesData => {
            console.log(allMoviesData)
            allMoviesData.Search.forEach(movie => {
                fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${movie.imdbID}`)
                    .then(res => res.json())
                    .then(movieData => {
                        moviesHtml +=  `
                        <div class="movie-card">
                            <div>
                                <img class="movie-poster" src=${movieData.Poster}>
                            </div>
                            <div class="movie-info">
                                <div class="title-rating-sec">
                                    <h3>${movieData.Title}</h3>
                                    <img src="./images/star.png">
                                    <h3>${movieData.imdbRating}</h3>
                                </div>
                                <div class="duration-genre-sec">
                                    <p>${movieData.Runtime}</p>
                                    <p>${movieData.Genre}</p>
                                    <button>Watchlist</button>
                                </div>
                                <div class="plot">
                                    <p>${movieData.Plot}
                                </div>
                            </div>
                        </div>`
                        main.innerHTML = moviesHtml
                })
            })
        })
}