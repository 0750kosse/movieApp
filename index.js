const apikey = config.apikey;
const imgPath = `http://image.tmdb.org/t/p/w300`;
let currentPage = 1;

const latestMovies = document.querySelector('#latest');
const searchedMovies = document.querySelector('#searched')
const form = document.querySelector('#form');
const userInput = document.querySelector('#userInput')
const searchedHeader = document.querySelector('.movie-searched__header');
const pages = document.querySelector('#pages');
const singleMovie = document.querySelector('#single');
const wrapper = document.querySelector('.wrapper')
const backButton = document.querySelector('#back')

function eventListeners() {
  form.addEventListener('submit', getSearchedMovies)
  wrapper.addEventListener('click', scroll)
  pages.addEventListener('click', switchPage);
  latestMovies.addEventListener('click', getMovie)
  singleMovie.addEventListener('click', openMovieDetail);
  backButton.addEventListener('click', closeMovieDetail)
}

function parseLatest(results) {
  const parsed = results.filter(el => el.poster_path != null)
    .map(result => {
      const { title, poster_path, id } = result;
      return `
    <div class="movie">
        <img src="${imgPath}${poster_path}" id="${id}" class="poster"></img>
        <p class="poster-title">${title}</p>
    </div>`
    }).join("")
  return parsed;
}

function parseSearched(results) {
  const parsed = results.filter(el => el.poster_path != null)
    .map(result => {
      const { title, poster_path, id } = result;
      return `
    <div class="movie">
        <img src="${imgPath}${poster_path}" id="${id}" class="poster"></img>
        <p class="poster-title">${title}</p>
    </div>`
    }).join("")
  return parsed;
}

function parseMovie(data) {
  const { title, poster_path, overview } = data;
  return `
        <img src=${imgPath}${poster_path} class="poster"></img>
        <p class="movie-title">${title}</p>
        <p class="movie-overview">${overview}</p>
        `
}

function switchPage(e) {
  e.preventDefault();
  e.target.id === 'next' ?
    (currentPage = currentPage + 1) :
    (currentPage = currentPage - 1)
  getLatestMovies(currentPage)
}

function scroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function openMovieDetail() {
  console.log("open movie log")
  singleMovie.style.display = 'block';
  backButton.style.display = 'block';
  wrapper.style.overflowY = 'hidden'
}

function closeMovieDetail() {
  singleMovie.style.display = 'none';
  backButton.style.display = 'none'
}

function getMovie(e) {
  e.preventDefault();
  const id = e.target.id
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=96fc446ecb31737673fc835496bd6ead&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => singleMovie.innerHTML = parseMovie(data))
    .catch(error => console.log(error))
  openMovieDetail()
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






