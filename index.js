const searchBtn = document.getElementById("search-btn")
const pageSwitchBtn = document.getElementById("page-switch-btn")
const title = document.getElementById("title")
const main = document.querySelector("main")
const APIKEY = "46677be2"
let allMoviesData
let watchlistHtml = ""

pageSwitchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(e.target.innerText)
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
        fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`)
                        .then(res => res.json())
                        .then(movieData => {
                            // console.log(JSON.stringify(movieData))
                            watchlistHtml +=  `
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
                                        <img src="./images/plus.png" data-movie=${movieData.imdbID}>
                                        <p class="watchlist-btn-text" data-movie="${movieData.imdbID}">Watchlist</p></button>
                                    </div>
                                    <div class="plot">
                                        <p>${movieData.Plot}
                                    </div>
                                </div>
                            </div>`
                        })
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
    main.innerHTML = "HellO!"
}

function renderHomePage() {
    title.innerText = "Find your film"
    pageSwitchBtn.innerText = "My Watchlist"
    main.innerHTML = getHomeHtml()
}

function fetchMovies() {
    const searchText = document.getElementById("search-text").value
    let moviesHtml = ""
    if (searchText) {
        fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`)
            .then(res => res.json())
            .then(allMoviesData => {
                console.log(allMoviesData)
                allMoviesData.Search.forEach(movie => {
                    fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${movie.imdbID}`)
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
                                        <img src="./images/plus.png" data-movie=${movieData.imdbID}>
                                        <p class="watchlist-btn-text" data-movie="${movieData.imdbID}">Watchlist</p></button>
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

renderHomePage()