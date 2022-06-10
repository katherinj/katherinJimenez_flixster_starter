// Global constants
const api_key = "acb5971573887a1f65372eac466017f9";
const tomatoURL = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Rotten_Tomatoes.svg";

// DOM constants
const movieFormEl = document.querySelector("form");
const movieAreaEl = document.querySelector("#movies-grid");
const gridTitleEl = document.querySelector("#grid-title");
const loadMoviesBtnEl = document.querySelector("#load-more-movies-btn");
const topBtnEl = document.querySelector("#return-to-top-btn");
const searchBtnEl = document.querySelector("#search-icon");
const closeBtnEl = document.querySelector("#close-search-btn");
const backdropEl = document.querySelector("#backdrop");

let pageNum = 1, offset = 0; 
let searchTerm = "";
limit = 14;

// add event listener for submit button & get more button 
movieFormEl.addEventListener("submit", getSearchResults);
loadMoviesBtnEl.addEventListener("click", loadMoreMovies);
closeBtnEl.addEventListener("click", () => {
    console.log("close btn clicked");
    searchTerm = "";
    closeBtnEl.classList.add("hidden");
    movieFormEl.movie.value = "";
    pageNum = 1;
    gridTitleEl.innerHTML = '';
    movieAreaEl.innerHTML = '';
    generateCurrentMovies();
});

topBtnEl.addEventListener("click", () => {
    window.scrollTo(0, 0);
});

function getSearchResults(evt){
    // prevents page from re-loading
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

async function generateCurrentMovies(){
    let apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key="+api_key+"&language=en-US&page="+pageNum;
    console.log("after trying")

    // use the fetch method with your custom HTTP request.
    let response = await fetch(apiUrl);

    // Then convert the response to a JSON object
    let responseData = await response.json();

    // and finally return the data of the response.
    if(pageNum == 1){
        gridTitleEl.innerHTML = `<h4> Now playing: </h4>`;
    }
    generateHTML(responseData);
}

async function generateSearchMovies(){
    let apiUrl = "https://api.themoviedb.org/3/search/movie?api_key="+api_key+"&language=en-US&query="+searchTerm+"&page="+pageNum;

    // use the fetch method with your custom HTTP request.
    let response = await fetch(apiUrl);

    // Then convert the response to a JSON object
     let responseData = await response.json();

    // and finally return the data of the response.
    generateHTML(responseData);
}

async function getSpecificMovie(movieId){
    let apiUrl = "https://api.themoviedb.org/3/movie/{"+movieId+"}?api_key="+api_key+"&language=en-US";
    let response = await fetch(apiUrl);
    let responseData = await response.json();

    generateMovieInfoHTML(responseData);

}

function generateMovieInfoHTML(responseData){

}

function generateHTML(movieData){
    //forEach way of traversing array 
    // gridTitleEl.innerHTML = '<h2> <span>Now playing:</span></h2>'
    movieData.results.forEach(function(element){ 
        // console.log(element.title + " element name");
        movieAreaEl.innerHTML += `
            <div id="movie-card" onClick="clicked('${element.id}')">
                <img class="movie-poster" src="https://image.tmdb.org/t/p/w185${element.poster_path}" alt="" /> 
                <p class="movie-votes"> ${element.vote_average}/10</p>
                <p class="movie-title"> ${element.title} </p>
            </div>`});

    loadMoviesBtnEl.classList.remove("hidden")
    topBtnEl.classList.remove("hidden")
}

function loadMoreMovies(){
    //increment pageNum
    pageNum++;
    
    // call the getData function with the same search term
    if(searchTerm == ""){
        generateCurrentMovies();
    } else {
        generateSearchMovies();
    }
}

window.onload = function () {
    console.log("onload function is called")
    generateCurrentMovies();
    pageNum=1;
}

function clicked(movieClicked){
    console.log(movieClicked.title + " was clicked!")
    // backdropEl.innerHTML += 'movieClicked.title';
    
}