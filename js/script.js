const global = {
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: import.meta.env.VITE_TMDB_API_KEY,
    apiUrl: import.meta.env.VITE_TMDB_API_URL,
  },
};

function getCurrentPage() {
  const path = window.location.pathname;
  if (path === '/' || path.endsWith('index.html')) return '/';
  if (path.endsWith('shows.html')) return '/shows.html';
  if (path.endsWith('movie-details.html')) return '/movie-details.html';
  if (path.endsWith('tv-details.html')) return '/tv-details.html';
  if (path.endsWith('search.html')) return '/search.html';
  return '/';
}

// Update the init function to use the helper
// function init() {
//   const page = getCurrentPage(); // Use the helper function here

//   switch (page) {
//     case '/':
//       displayPopularMovies();
//       nowPlayingSwiperMovies();
//       break;
//     case '/shows.html':
//       displayPopularShows();
//       nowPlayingSwiperShows();
//       break;
//     case '/movie-details.html':
//       movieDetails();
//       break;
//     case '/tv-details.html':
//       tvDetails();
//       break;
//     case '/search.html':
//       searchMoviesAndShows();
//       break;
//   }
//   highlightLink();
// }

console.log(global.currentPage);
// console.log(global.search.term);
//highlight active link in navbar

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function displayPopularMovies() {
  const { results } = await fetchApiData('movie/popular'); // destructure results from the API response object to get the array of movies
  console.log(results);
  results.forEach((movie) => {
    if (movie.adult === true) {
      console.log(movie.adult);
      const addCard = document.createElement('div');
      addCard.classList.add('card');
      addCard.innerHTML = `
            <a href="/movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
                src='IMAGE NOT SUPPORTED'
                class='card-img-top'
                alt='IT IS A ADULT MOVIE, DON'T WATCH IT'
                />`
                : `<img
                src='images/no-image.jpg'
                class='card-img-top'
                alt='IT IS A ADULT MOVIE, DON'T WATCH IT'
                />`
            }
                </a>
                <div class="card-body">
                <h5 class="card-title">DON'T WATCH IT: ${movie.title}</h5>
                <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
                </div>`;
      document.querySelector('#popular-movies').appendChild(addCard);
    } else {
      console.log(movie.adult);
      const addCard = document.createElement('div');
      addCard.classList.add('card');
      addCard.innerHTML = `
            <a href="/movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
                src='https://image.tmdb.org/t/p/w500${movie.poster_path}'
                class='card-img-top'
                alt='${movie.title}'
                />`
                : `<img
                src='images/no-image.jpg'
                class='card-img-top'
                alt='${movie.title}'
                />`
            }
                </a>
                <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
                </div>`;
      document.querySelector('#popular-movies').appendChild(addCard);
    }
  });
}
// displayPopularMovies();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function displayPopularShows() {
  const { results } = await fetchApiData('tv/popular'); // destructure results from the API response object to get the array of shows
  console.log(results);
  results.forEach((show) => {
    if (show.adult === true) {
      console.log(show.adult);
      const addCard = document.createElement('div');
      addCard.classList.add('card');
      addCard.innerHTML = `
      <a href="/movie-details.html?id=${show.id}">
      ${
        show.poster_path
          ? `<img
                src='IMAGE NOT SUPPORTED'
                class='card-img-top'
                alt='IT IS A ADULT MOVIE, DON'T WATCH IT'
                />`
          : `<img
                src='images/no-image.jpg'
                class='card-img-top'
                alt='IT IS A ADULT MOVIE, DON'T WATCH IT'
                />`
      }
                </a>
                <div class="card-body">
                <h5 class="card-title">DON'T WATCH IT: ${show.name}</h5>
                <p class="card-text">
                <small class="text-muted">Release: ${
                  show.first_air_date
                }</small>
                </p>
                </div>`;
      document.querySelector('#popular-movies').appendChild(addCard);
      name;
    } else {
      console.log(show.adult);
      const addCard = document.createElement('div');
      addCard.classList.add('card');
      addCard.innerHTML = `
            <a href="/tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
                src='https://image.tmdb.org/t/p/w500${show.poster_path}'
                class='card-img-top'
                alt='${show.name}'
                />`
                : `<img
                src='images/no-image.jpg'
                class='card-img-top'
                alt='${show.name}'
                />`
            }
                </a>
                <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">
                <small class="text-muted">Air Date: ${
                  show.first_air_date
                }</small>
                </p>
                </div>`;
      document.querySelector('#popular-shows').appendChild(addCard);
    }
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function movieDetails() {
  console.log(window.location.search.split('=')[1]);
  const id = window.location.search.split('=')[1];
  const results = await fetchApiData(`movie/${id}`);
  console.log('movie detail', results);
  backgroundImage('movie', results.backdrop_path);
  if (!results.homepage) {
    customAlert(
      'We dont have a homepage link for this Movie right now!',
      'error',
    );
  }
  const detail = document.createElement('div');
  detail.innerHTML = `<div class="details-top">
          <div>
          ${
            results.poster_path
              ? `
            <img
              src="https://image.tmdb.org/t/p/w500${results.poster_path}"
              class="card-img-top"
              alt="Movie Title" />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title" />`
          }
          </div >
          <div>
            <h2>${results.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${results.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${results.release_date}</p>
            <p>
              ${results.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${results.genres
              .map((genre) => {
                return `<li>${genre.name}</li>`;
              })
              .join('')}
             
            </ul>
            <a href="${
              results.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              results.budget,
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              results.revenue,
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              results.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${
              results.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${results.production_companies
            .map((company) => {
              return `<span>${company.name}</span>`;
            })
            .join(', ')}</div>
        </div>`;
  document.querySelector('#movie-details').appendChild(detail);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function tvDetails() {
  console.log(window.location.search.split('=')[1]);
  const id = window.location.search.split('=')[1];
  const result = await fetchApiData(`tv/${id}`);
  backgroundImage('show', result.backdrop_path);
  if (!result.homepage) {
    customAlert(
      'We dont have a homepage link for this show right now!',
      'error',
    );
  }
  console.log('tv detail', result);
  const detail = document.createElement('div');
  detail.innerHTML = `<div class="details-top">
            <div>
            ${
              result.poster_path
                ? `
              <img
                src="https://image.tmdb.org/t/p/w500${result.poster_path}"
                class="card-img-top"
                alt="Movie Title" />`
                : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="Movie Title" />`
            }
            </div >
            <div>
              <h2>${result.name}</h2>
              <p>
                <i class="fas fa-star text-primary"></i>
                ${result.vote_average.toFixed(1)} / 10
              </p>
              <p class="text-muted">Air Date: ${result.first_air_date}</p>
              <p>
                ${result.overview}
              </p>
              <h5>Genres</h5>
              <ul class="list-group">
              ${result.genres
                .map((genre) => {
                  return `<li>${genre.name}</li>`;
                })
                .join('')}

              </ul>
              <a href="${
                result.homepage
              }" target="_blank" class="btn">Visit Show Homepage</a>
            </div>
          </div>
          <div class="details-bottom">
            <h2>Show Info</h2>
            <ul>
              <li><span class="text-secondary">Number of Episodes:</span> ${addCommasToNumber(
                result.number_of_episodes,
              )}</li>
              <li><span class="text-secondary">Last Episode To Air:</span> ${
                result.last_episode_to_air.name
              }</li>
              <li><span class="text-secondary">Status:</span> ${
                result.status
              }</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">${result.production_companies
              .map((company) => {
                return `<span>${company.name}</span>`;
              })
              .join(', ')}</div>
          </div>`;
  document.querySelector('#show-details').appendChild(detail);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function fetchApiData(endpoint) {
  const key = global.api.apiKey;
  const url = global.api.apiUrl;
  showSpinner();
  const movies = await fetch(
    `${url}/${endpoint}?api_key=${key}&language=en-US`,
  );
  const resp = await movies.json();
  hideSpinner();
  return resp;
}
function highlightLink() {
  const links = document.querySelectorAll('.nav-link');
  const currentPage = getCurrentPage(); // Use the helper function, not global.currentPage

  links.forEach((element) => {
    // Check if the href matches the current page
    if (element.getAttribute('href') === currentPage) {
      element.classList.add('active');
    }
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////

async function searchMoviesAndShows() {
  const queryString = window.location.search;
  console.log(window.location.search);
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get('type'));
  console.log(urlParams.get('search-term'));
  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');
  if (global.search.term !== '' && global.search.term !== null) {
    //todo
    console.log('hi');
    const { page, results, total_pages, total_results } =
      await fetchSearchData();
    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;
    if (results.length === 0) {
      customAlert('No results found', 'error'); //no need of this error class here because is already set as default in customAlert function
      displayPopularShows();
    } else {
      displaySearchResults(results);
      document.querySelector('#search-term').value = ''; //it clear the search input after the search is done
      console.log(page, results, total_pages, total_results);
    }
  } else {
    customAlert('Please enter the search term!!!', 'error'); //no need of this error class here because is already set as default in customAlert function
  }
  // console.log(global.search.term);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function displaySearchResults(results) {
  console.log('haha', results);
  ///clear previous results
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  results.forEach((result) => {
    if (result.adult === true) {
      console.log(result.adult);
      const addCard = document.createElement('div');
      addCard.classList.add('card');
      addCard.innerHTML = `
      <a href="/${global.search.type}-details.html?id=${result.id}">
      ${
        result.poster_path
          ? `<img
                src='IMAGE NOT SUPPORTED'
                class='card-img-top'
                alt='IT IS A ADULT MOVIE, DON'T WATCH IT'
                />`
          : `<img
                src='images/no-image.jpg'
                class='card-img-top'
                alt='IT IS A ADULT MOVIE, DON'T WATCH IT'
                />`
      }
                </a>
                <div class="card-body">
                <h5 class="card-title">DON'T WATCH IT: ${
                  global.search.type === 'movie' ? result.title : result.name
                }</h5>  
                <p class="card-text">
                <small class="text-muted">Release Date: ${
                  global.search.type === 'movie'
                    ? result.release_date
                    : result.first_air_date
                }</small>
                </p>
                </div>`;
      document.querySelector('#search-results').appendChild(addCard);
    } else {
      console.log(result.adult);
      const addCard = document.createElement('div');
      addCard.classList.add('card');
      addCard.innerHTML = `
            <a href="/${global.search.type}-details.html?id=${result.id}">
            ${
              result.poster_path
                ? `<img
                src='https://image.tmdb.org/t/p/w500${result.poster_path}'
                class='card-img-top'
                alt='${
                  global.search.type === 'movie' ? result.title : result.name
                }'
                />`
                : `<img
                src='images/no-image.jpg'
                class='card-img-top'
                alt='${
                  global.search.type === 'movie' ? result.title : result.name
                }'
                />`
            }
                </a>
                <div class="card-body">
                <h5 class="card-title">${
                  global.search.type === 'movie' ? result.title : result.name
                }</h5>
                <p class="card-text">
                <small class="text-muted">${
                  global.search.type === 'movie'
                    ? 'Release Date: '
                    : 'Air Date: '
                }${
                  global.search.type === 'movie'
                    ? result.release_date
                    : result.first_air_date
                }</small>
                </p>
                </div>`;
      document.querySelector('#search-results-heading').innerHTML =
        `${results.length} of ${global.search.totalResults} results for ${global.search.term}`;
      document.querySelector('#search-results').appendChild(addCard);
      // preventDefault();
    }
  });
  displayPagination();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function displayPagination() {
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('pagination');
  paginationDiv.innerHTML = `
          <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`;
  document.querySelector('#pagination').appendChild(paginationDiv);
  const prevButton = document.querySelector('#prev');
  if (global.search.page === 1) {
    prevButton.disabled = true;
  }
  const nextButton = document.querySelector('#next');
  if (global.search.page === global.search.totalPages) {
    nextButton.disabled = true;
  }
  nextButton.addEventListener('click', async () => {
    global.search.page++;
    const { page, totalPages, results } = await fetchSearchData();
    displaySearchResults(results);
  });
  prevButton.addEventListener('click', async () => {
    global.search.page--;
    const { page, totalPages, results } = await fetchSearchData();
    displaySearchResults(results);
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function fetchSearchData() {
  const key = global.api.apiKey;
  const url = global.api.apiUrl;
  showSpinner();
  const movies = await fetch(
    `${url}/search/${global.search.type}?api_key=${key}&language=en-US&query=${global.search.term}&page=${global.search.page}`, //searches either movie or tv base on type
    // `${url}/search/multi?api_key=${key}&language=en-US&query=${global.search.term}`//Use multi search when you want to search for movies, TV shows and people in a single request.
  );
  const resp = await movies.json();
  hideSpinner();
  return resp;
}
//////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
function customAlert(message, className = 'error') {
  const alert = document.createElement('div');
  alert.classList.add('alert', className);
  alert.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 3000);
}
////////////////////////////////////////////////////////////////////////////////////////////////
async function nowPlayingSwiperMovies() {
  const nowPlayingMovies = await fetchApiData('movie/now_playing');
  const { results } = nowPlayingMovies;

  results.forEach((result) => {
    if (result.title !== 'Maalikaya') {
      const div = document.createElement('div');
      div.classList.add('swiper-slide');
      div.innerHTML = `
      <a href="movie-details.html?id=${result.id}">
        <img src="${
          result.poster_path
            ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
            : './images/no-image.jpg'
        }" alt="${result.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${result.vote_average.toFixed(1)}
      </h4>`;

      document.querySelector('.swiper-wrapper').appendChild(div);
    }
  });

  initSwiper(); 
}
////////////////////////////////////////////////////////////////////////////////////////////////
async function nowPlayingSwiperShows() {
  const nowPlayingShows = await fetchApiData('tv/airing_today');
  const { results } = nowPlayingShows;

  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
      <a href="tv-details.html?id=${result.id}">
        <img src="${
          result.poster_path
            ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
            : './images/no-image.jpg'
        }" alt="${result.name}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${result.vote_average.toFixed(1)}
      </h4>`;

    document.querySelector('.swiper-wrapper').appendChild(div);
  });

  initSwiper();
}
function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    speed: 400,
    freeMode: true,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function init() {
  const page = getCurrentPage(); // Use the helper function here

  switch (page) {
    case '/':
      displayPopularMovies();
      nowPlayingSwiperMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      nowPlayingSwiperShows();
      break;
    case '/movie-details.html':
      movieDetails();
      break;
    case '/tv-details.html':
      tvDetails();
      break;
    case '/search.html':
      searchMoviesAndShows();
      break;
  }
  highlightLink();
}
document.addEventListener('DOMContentLoaded', init);

function addCommasToNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function showSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.classList.add('show');
}

function hideSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.classList.remove('show');
}

async function backgroundImage(type, backgroundPath) {
  showSpinner();
  const overlay = document.createElement('div');
  overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlay.style.backgroundSize = 'cover';
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  overlay.style.zIndex = '-1';
  overlay.style.opacity = '0.1';
  overlay.style.backgroundPosition = 'center';
  overlay.style.backgroundRepeat = 'no-repeat';
  hideSpinner();

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlay);
  } else {
    document.querySelector('#show-details').appendChild(overlay);
  }
}
