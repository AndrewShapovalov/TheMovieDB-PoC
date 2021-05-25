const app = document.getElementById("app");

let favoriteMovieList = [];

const getLikedMovies = () => {
  const likedMovies = localStorage.getItem("likedMovies");

  if (likedMovies !== null) {
    favoriteMovieList = JSON.parse(likedMovies);
  }

  return JSON.parse(likedMovies);
};

export const renderMovies = (movies, domElement, firstRender) => {
  const container = document.getElementById(domElement);
  if (firstRender) {
    container.innerHTML = "";
  }

  movies.forEach((movie) => {
    const movieEl = createCard(movie);
    container.append(movieEl);
  });

  function createCard(movie) {
    const moviesFromLocalStorage = getLikedMovies();
    const isLiked = moviesFromLocalStorage
      ? moviesFromLocalStorage.some(
          (item) => item.original_title == movie.original_title
        )
      : false;
    const movieBox = document.createElement("div");
    movieBox.classList.add("card");
    movieBox.innerHTML = `
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
      <a  class="like-button ${isLiked ? "like-button-active" : null} ">
        <i class="far fa-heart"></i>
    </a>
			<span class="card-title" >${movie.original_title}</span>
		</div>
`;

    return movieBox;
  }
};

app.addEventListener("click", (e) => {
  const likeButton = e.target.closest("a.like-button");

  if (likeButton !== null) {
    likeButton.classList.toggle("like-button-active");
    const card = likeButton.closest("div.card");
    const title = card.querySelector("span.card-title").textContent;
    const imgUrl = card.querySelector(".card-image img").src;
    let like = likeButton.classList.contains("like-button-active");
    const choosenMovie = {
      original_title: title,
      backdrop_path: imgUrl,
      isLiked: like,
    };
    if (like) {
      favoriteMovieList.push(choosenMovie);
    }
    if (!like) {
      const newList = favoriteMovieList.filter(
        (item) => item.original_title !== choosenMovie.original_title
      );
      favoriteMovieList = newList;
    }
  }

  localStorage.setItem("likedMovies", JSON.stringify(favoriteMovieList));
  const favoriteMovies = localStorage.getItem("likedMovies");
  const parsed = JSON.parse(favoriteMovies);
  renderMovies(parsed, "favorite", true);
});

export const renderMovieCounter = (count, movie) => {
  const counterEl = document.createElement("div");
  counterEl.classList.add("counter");
  counterEl.textContent = `${
    count === 0 ? "No results for " + movie : "Results:" + count
  }`;
  const counter = document.querySelector(".counter");

  if (counter) {
    counter.remove();
  }
  app.prepend(counterEl);
};
