import Api from "./api.js";
import { renderMovies, renderMovieCounter } from "./webApi.js";
import { asyncProvider } from "./helpers.js";

const app = document.getElementById("app");
const form = document.getElementById("form");
const input = document.getElementById("form-input");

const insertMovies = () => {
  asyncProvider(async () => {
    const response = await Api.fetchPopularMovies();
    const movies = response.results;
    renderMovies(movies, "app");
  });
};
insertMovies();

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchMovie(e.target.value);
    e.target.value = "";
  }
});

const searchMovie = (movie, page = 1) => {
  asyncProvider(async () => {
    const response = await Api.fetchMoviesBySearchText(movie, page);
    const movies = response.results;
    const count = response.total_results;
    renderMovies(movies, "app");
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
    app.append(buttonEl);
    buttonEl.addEventListener("click", () => {
      searchMovie(movie, page + 1);
    });
  }
  if (page > total_pages) {
    const button = document.querySelector(".button-wrapper");
    if (button) {
      button.remove();
    }
  }
};
