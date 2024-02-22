const searchBtn = document.getElementById("search-btn")
const pageSwitchBtn = document.getElementById("page-switch-btn")
const title = document.getElementById("title")
const main = document.querySelector("main")
const APIKEY = "46677be2"
let allMoviesData
let watchlistArr = JSON.parse(localStorage.getItem("watchlistArr")) || []


pageSwitchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    handlePageSwitch(e.target.innerText)
})

searchBtn.addEventListener("click", function(e) {
    e.preventDefault()
    fetchMovies()
})

document.addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.dataset.movie) {
        const id = e.target.dataset.movie
        if(e.target.innerHTML === "Watchlist" || e.target.alt === "watchlist") {
            fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`)
                .then(res => res.json())
                .then(movieData => {
                    watchlistArr.push({
                        id: movieData.imdbID, 
                        poster: movieData.Poster, 
                        title: movieData.Title, 
                        rating: movieData.imdbRating, 
                        runtime: movieData.Runtime, 
                        genre: movieData.Genre, 
                        plot: movieData.Plot})
                    localStorage.setItem("watchlistArr", JSON.stringify(watchlistArr))
                })
            }
        else {
            console.log("invoking remove")
            removeMovieFromWatchlist(id)
        }
    }
    else if(e.target.dataset.search) {
        renderHomePage()
    }
})

function handlePageSwitch(btnText) {
    if(btnText === "My Watchlist") {
        renderWatchList()
    } else {
        renderHomePage()
    }
}

function renderWatchList() {
    title.innerText = "My Watchlist"
    pageSwitchBtn.innerText = "Search for movies"
    searchBtn.disabled = true
    main.innerHTML = getWatchlistHtml()
}

function renderHomePage() {
    searchBtn.disabled = false
    title.innerText = "Find your film"
    pageSwitchBtn.innerText = "My Watchlist"
    main.innerHTML = getHomeHtml()
}

function fetchMovies() {
    const searchText = document.getElementById("search-text").value
    document.getElementById("search-text").value = ""
    let moviesHtml = ""
    if (searchText) {
        fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`)
            .then(res => res.json())
            .then(allMoviesData => {
                console.log(allMoviesData)
                allMoviesData.Search.forEach(movie => {
                    fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&i=${movie.imdbID}`)
                        .then(res => res.json())
                        .then(movieData => {
                            // console.log(JSON.stringify(movieData))
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
                                        <button class="watchlist-btn" data-movie=${movieData.imdbID}>
                                            <img src="./images/plus.png" alt="watchlist" data-movie=${movieData.imdbID}>
                                            <p class="watchlist-btn-text" data-movie="${movieData.imdbID}">Watchlist</p>
                                        </button>
                                    </div>
                                    <div class="plot">
                                        <p>${movieData.Plot}</p>
                                    </div>
                                </div>
                            </div>`
                            main.innerHTML = moviesHtml
                    })
                })
            })
    }
    else {
        alert("Please enter text to search!!")
    }
}

function getHomeHtml() {
    return `
        <div class="main-default">
            <img class="main-img" src="./images/main.png">
            <h2 class="default-main-text">Start exploring!</h2>
        </div>
    `
}

function getWatchlistHtml() {
    if(watchlistArr.length) {
        return watchlistArr.map(movieData => {
            return `<div class="movie-card">
                <div>
                    <img class="movie-poster" src=${movieData.poster}>
                </div>
                <div class="movie-info">
                    <div class="title-rating-sec">
                        <p class="movie-title">${movieData.title}</p>
                        <img src="./images/star.png">
                        <p class="movie-rating">${movieData.rating}</p>
                    </div>
                    <div class="duration-genre-sec">
                        <p class="movie-runtime">${movieData.runtime}</p>
                        <p class="movie-genre">${movieData.genre}</p>
                        <button class="watchlist-btn" data-movie=${movieData.id}>
                            <img src="./images/minus.png" alt="remove" data-movie=${movieData.id}>
                            <p class="watchlist-btn-text" data-movie="${movieData.id}">Remove</p>
                        </button>
                    </div>
                    <div class="plot">
                        <p>${movieData.plot}</p>
                    </div>
                </div>
            </div>`
        }).join()
    }
    else {
        return `
            <div class="watchlist-default">
                <p class="watchlist-text">Your watchlist is looking a little empty...</p>
                <button class="watchlist-btn" data-search="search">
                    <img src="./images/plus.png" alt="remove" data-search="search">
                    <p class="watchlist-btn-text" data-search="search">Let's add some movies!</p>
                </button>
            </div>
        `
    }

}

function removeMovieFromWatchlist(id) {
    console.log(id)
    watchlistArr = watchlistArr.filter(movieData => movieData.id !== id)
    localStorage.setItem("watchlistArr", JSON.stringify(watchlistArr))
    renderWatchList()
}

renderHomePage()