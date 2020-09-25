const apikey = config.apikey;
const imgPath = `http://image.tmdb.org/t/p/w300`;
let currentPage = 1;

const latestMovies = document.querySelector('#latest');
const searchedMovies = document.querySelector('#searched')
const form = document.querySelector('#form');
const userInput = document.querySelector('#userInput')
const searchedHeader = document.querySelector('.movie-searched__header');
const nextPage = document.querySelector('#next');
const prevPage = document.querySelector('#prev')

function eventListeners() {
  form.addEventListener('submit', getSearchedMovies)
  nextPage.addEventListener('click', switchPage);
  prevPage.addEventListener('click', switchPage);
}

function parseLatest(results) {
  searchedHeader.style.display = 'none';
  const parsed = results.map(result => {
    const { title, poster_path, release_date } = result;
    return `
    <div class="movie">
        <p>${title}</p>
        <p>${release_date}</p>
        <img src=${imgPath}${poster_path} class="poster"></img>
    </div>`
  }).join("")
  return parsed;
}

function parseSearched(results) {
  searchedHeader.style.display = 'block';
  const parsed = results.map(result => {
    const { title, poster_path, release_date } = result;
    return `
      <div class="movie">
        <p>${title}</p>
        <p>${release_date}</p>
        <img src=${imgPath}${poster_path} class="poster"></img>
      </div>`
  }).join("")
  return parsed;
}

function switchPage(e) {
  e.preventDefault();
  e.target.id === nextPage.id ?
    (currentPage = currentPage + 1) :
    (currentPage = currentPage - 1)
  getLatestMovies(currentPage)
}

function getLatestMovies() {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&page=${currentPage}&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false`)
    .then(response => response.json())
    .then(data => latestMovies.innerHTML = parseLatest(data.results))
    .catch(error => console.log(error))
}

function getSearchedMovies(e) {
  e.preventDefault();
  const searchContent = userInput.value;
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${searchContent}`)
    .then(response => response.json())
    .then(data => searchedMovies.innerHTML = parseSearched(data.results))
    .catch(error => console.log(error))
}

getLatestMovies()
eventListeners();






