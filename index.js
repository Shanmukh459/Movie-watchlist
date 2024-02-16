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
                                    <p class="movie-title">${movieData.Title}</p>
                                    <img src="./images/star.png">
                                    <p class="movie-rating">${movieData.imdbRating}</p>
                                </div>
                                <div class="duration-genre-sec">
                                    <p class="movie-runtime">${movieData.Runtime}</p>
                                    <p class="movie-genre">${movieData.Genre}</p>
                                    <button class="watchlist-btn">
                                    <img src="./images/plus.png">
                                    <p class="watchlist-btn-text">Watchlist</p></button>
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