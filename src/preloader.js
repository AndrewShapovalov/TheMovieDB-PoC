const preloaderHTML = `
<div class="preloader" id="preloader">
   <div>Loading popular movies</div>
     <div class="progress">
       <div class="indeterminate"></div>
   </div>
</div>
`;

const loader = document.getElementById("loader");

export const preloader = (isLoading) => {
  if (isLoading === true) {
    loader.innerHTML = preloaderHTML;
  } else {
    document.getElementById("preloader").remove();
  }
};
