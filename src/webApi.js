const app = document.getElementById("app");

export const renderMovies = (movies, domElement) => {
  const container = document.getElementById(domElement);
  const CardHtml = (movie) => {
    return `<div class="card">
		<div class="card-image">
			<div class="img-overlay"></div>
			<img
      alt=${movie.original_title}
      src=${
        movie.backdrop_path
          ? "https://image.tmdb.org/t/p/w220_and_h330_face" +
            movie.backdrop_path
          : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
      }  />
			<span class="card-title">${movie.original_title}</span>
		</div>

	</div>`;
  };

  const moviesHTML = movies.reduce((acc, movie) => {
    acc += CardHtml(movie);

    return acc;
  }, "");
  container.innerHTML = ` <div class="movies" id="movies">  ${moviesHTML}
	</div>`;
};

export const renderMovieCounter = (count, movie) => {
  const counterEl = document.createElement("div");
  counterEl.classList.add("counter");
  counterEl.textContent = `${
    count === 0 ? "No results for " + movie : "Results:" + count
  }`;

  app.prepend(counterEl);
};
