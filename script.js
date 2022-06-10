// Global constants
const api_key = "acb5971573887a1f65372eac466017f9";

// DOM constants
const movieFormEl = document.querySelector("form");

const searchBtnEl = document.querySelector("#search-icon");
const closeBtnEl = document.querySelector("#close-search-btn");

const gridTitleEl = document.querySelector("#grid-title");
const movieAreaEl = document.querySelector("#movies-grid");

const moreBtnEl = document.querySelector("#moreBtnArea");
const loadMoviesBtnEl = document.querySelector("#load-more-movies-btn");
const topBtnEl = document.querySelector("#return-to-top-btn");

const backdropEl = document.querySelector("#backdrop");


let pageNum = 1; 
let searchTerm = "";

// Event listeners
movieFormEl.addEventListener("submit", getSearchResults);
loadMoviesBtnEl.addEventListener("click", loadMoreMovies);
closeBtnEl.addEventListener("click", closeSearch);
topBtnEl.addEventListener("click", () => {
    window.scrollTo(0, 0);
});

// async functions that will generate data from API
async function generateCurrentMovies(){
    let apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key="+api_key+"&language=en-US&page="+pageNum;
    let response = await fetch(apiUrl);
    let responseData = await response.json();
    if(pageNum == 1){
        gridTitleEl.innerHTML = `<h4> Now playing: </h4>`;
    }
    generateHTML(responseData);
}
async function generateSearchMovies(){
    let apiUrl = "https://api.themoviedb.org/3/search/movie?api_key="+api_key+"&language=en-US&query="+searchTerm+"&page="+pageNum;
    let response = await fetch(apiUrl);
    let responseData = await response.json();
    generateHTML(responseData);
}
async function generateSpecificMovie(movieId){
    let apiUrl = "https://api.themoviedb.org/3/movie/{"+movieId+"}?api_key="+api_key+"&language=en-US";
    let response = await fetch(apiUrl);
    let responseData = await response.json();
    generateMovieInfoHTML(responseData);
}

//functions that are called from event listeners 
function getSearchResults(evt){
    evt.preventDefault();
    closeBtnEl.classList.remove("hidden");
    pageNum = 1;  
    searchTerm = evt.target.movie.value;
    movieAreaEl.innerHTML = ``;

    if(searchTerm == ''){
        window.alert("Please enter a search term before searching!");
        loadMoviesBtnEl.classList.add("hidden")
        topBtnEl.classList.add("hidden")
    }else{
        gridTitleEl.innerHTML = `<h4> Results for: ${searchTerm}</h4>`;
        generateSearchMovies(searchTerm);
    }
}
function loadMoreMovies(){
    pageNum++;
    
    if(searchTerm == ""){
        generateCurrentMovies();
    } else {
        generateSearchMovies();
    }
}
function closeSearch(){
    clearMovieGridScreen();
    generateCurrentMovies();
}

function clearMovieGridScreen(){
    gridTitleEl.innerHTML = '';
    movieAreaEl.innerHTML = '';
    movieFormEl.movie.value = "";
    closeBtnEl.classList.add("hidden");
    loadMoviesBtnEl.classList.add("hidden");
    searchTerm = "";
    pageNum = 1;
}

function generateHTML(movieData){
    movieData.results.forEach(function(element){ 
        movieAreaEl.innerHTML += `
            <div id="movie-card" onClick="clicked('${element.id}')">
                <img class="movie-poster" src="https://image.tmdb.org/t/p/w185${element.poster_path}" alt="" /> 
                <p class="movie-votes"> ${element.vote_average}/10</p>
                <p class="movie-title"> ${element.title} </p>
            </div>`});
    loadMoviesBtnEl.classList.remove("hidden")
    topBtnEl.classList.remove("hidden")
}

// functions for pop up window
function generateMovieInfoHTML(responseData){

}
function clicked(movieClicked){
    console.log(movieClicked.title + " was clicked!")
    // backdropEl.innerHTML += 'movieClicked.title';
}

// function for onload screen
window.onload = function () {
    console.log("onload function is called")
    generateCurrentMovies();
    pageNum=1;
}