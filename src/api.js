class Api {
  constructor() {
    this.url = "https://api.themoviedb.org";
    this.apiKey = "903e58618f7ebfe5deace7e09887c68a";
  }
  async fetchPopularMovies() {
    const response = await fetch(
      `${this.url}/3/movie/popular?api_key=${this.apiKey}`
    );
    const result = await response.json();
    return result;
  }
  async fetchMoviesBySearchText(movie, page) {
    const response = await fetch(
      `${this.url}/3/search/movie?api_key=${this.apiKey}&query=${movie}&page=${page}`
    );
    const result = await response.json();
    return result;
  }
}

export default new Api();
