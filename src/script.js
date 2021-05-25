import Api from "./api.js";
import { renderMovies, renderMovieCounter } from "./webApi.js";
import { asyncProvider } from "./helpers.js";

const app = document.getElementById("app");
const input = document.getElementById("form-input");
const moviesContainer = document.getElementById("movies");
const favoriteContainer = document.getElementById("favorite");
const movieList = document.querySelector(".movies-list");
const nav = document.querySelectorAll(".nav li");
const favoriteList = document.querySelector(".favorite-list");

nav.forEach((tab) => {
  tab.addEventListener("click", function () {
    nav.forEach((i) => i.classList.remove("active"));

    this.classList.toggle("active");
  });
});

const insertMovies = () => {
  asyncProvider(async () => {
    const response = await Api.fetchPopularMovies();
    const movies = response.results;
    renderMovies(movies, "movies", true);
  });
};
insertMovies();

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchMovie(e.target.value);
    e.target.value = "";
  }
});
favoriteList.addEventListener("click", () => {
  if (document.querySelector(".counter")) {
    document.querySelector(".counter").remove();
  }
  if (document.querySelector(".button-wrapper")) {
    document.querySelector(".button-wrapper").remove();
  }
  const favoriteMovies = localStorage.getItem("likedMovies");
  const parsed = JSON.parse(favoriteMovies);
  renderMovies(parsed, "favorite", true);
  moviesContainer.classList.add("hide");
  favoriteContainer.classList.remove("hide");
});

movieList.addEventListener("click", () => {
  insertMovies();
  favoriteContainer.classList.add("hide");
  moviesContainer.classList.remove("hide");
});

const searchMovie = (movie, page = 1, firstRender = true) => {
  favoriteContainer.classList.add("hide");
  moviesContainer.classList.remove("hide");
  asyncProvider(async () => {
    const response = await Api.fetchMoviesBySearchText(movie, page);
    const movies = response.results;
    const count = response.total_results;
    renderMovies(movies, "movies", firstRender);
    renderMovieCounter(count, movie);
    loadMoreMoviesButton(response, movie);
  });
};

const loadMoreMoviesButton = ({ page, total_pages }, movie) => {
  if (page < total_pages) {
    const buttonEl = document.createElement("div");
    buttonEl.classList.add("button-wrapper");
    const buttonHTML = `<a class="waves-effect waves-light btn btn-large">Load more</a>`;
    buttonEl.innerHTML = buttonHTML;
    const btnLink = document.querySelector(".button-wrapper");
    if (btnLink) {
      btnLink.remove();
    }
    app.append(buttonEl);

    buttonEl.addEventListener("click", () => {
      searchMovie(movie, page + 1, false);
    });
  }
  if (page >= total_pages) {
    const button = document.querySelector(".button-wrapper");
    if (button) {
      button.remove();
    }
  }
};
