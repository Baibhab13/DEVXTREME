document.addEventListener("DOMContentLoaded", function () {
  let scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {  // Show button after scrolling 300px
          scrollTopBtn.classList.add("show");
      } else {
          scrollTopBtn.classList.remove("show");
      }
  });

  scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
          top: 0,
          behavior: "smooth"  // Smooth scroll effect
      });
  });
});


