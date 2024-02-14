const searchBtn = document.getElementById("search-btn")
const APIKEY = "46677be2"
let allMoviesData

searchBtn.addEventListener("click", function(e) {
    e.preventDefault()
    renderMovies()
})

async function renderMovies() {
    allMoviesData = await getAllMovies()
    console.log(allMoviesData)
    const moviesHtml = allMoviesData.map(async movie => {
        const movieData = await getMovieData(movie.imdbID)
        console.log(movieData)
        return `
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
            </div>
        `
    }).join(",")
    console.log(moviesHtml)
    document.querySelector("main").innerHTML = moviesHtml
    
}

async function getMovieData(movieId) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${movieId}`)
    const data = await res.json()
    return data
}

async function getAllMovies() {
    const searchText = document.getElementById("search-text").value
    const res = await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`)
    const data = await res.json()
    console.log(data)
    return data.Search

    fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`)
        .then(res => res.json())
        .then(data => {
            movieData = data.Search
            displaySearchResults(movieData)
            // console.log(data)
            // console.log(movieData)
        })
}

async function displaySearchResults(movies) {
    const one = movies[0]
    console.log(movies[0])
    const res = await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${one.imdbID}`)
    const data = await res.json()
    console.log(data)
    document.querySelector("main").innerHTML = `
        <div>
            <div>
                <img src=${one.Poster}>
            </div>
            <div>
                <div>
                    <h1>${one.Title}</h1>
                    <img src="./images/star.png">
                    <h3>${one.Rating}</h3>
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    `
    
}