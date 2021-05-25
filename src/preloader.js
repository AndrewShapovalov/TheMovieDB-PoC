const preloaderHTML = `
   <div>Loading movies</div>
     <div class="progress">
       <div class="indeterminate"></div>
   </div>

`;

const app = document.getElementById("app");

export const preloader = (isLoading) => {
  if (isLoading === true) {
    const loader = document.createElement("div");
    loader.classList.add("preloader");
    loader.innerHTML = preloaderHTML;
    app.append(loader);
  } else {
    const loader = document.querySelector(".preloader");

    if (loader) {
      document.querySelector(".preloader").remove();
    }
  }
};
