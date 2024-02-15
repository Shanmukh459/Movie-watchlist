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
                        <div>
                            <div>
                                <img src=${movieData.Poster}>
                            </div>
                            <div>
                                <div>
                                    <h1>${movieData.Title}</h1>
                                    <img src="./images/star.png">
                                    <h3>${movieData.imdbRating}</h3>
                                </div>
                                <div>
                                    <p>${movieData.Runtime}</p>
                                    <p>${movieData.Genre}</p>
                                    <button>Watchlist</button>
                                </div>
                                <div>
                                    <p>${movieData.Plot}
                                </div>
                            </div>
                        </div>`
                        main.innerHTML = moviesHtml
                })
            })
        })
}