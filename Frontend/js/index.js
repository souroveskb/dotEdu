
// swiper is for sliding people's thought
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints:{
      0:{
        slidesPerView: 1,
      },
      520:{
        slidesPerView: 2,
      },
      950:{
        slidesPerView: 3
      }
    },
  });

// it is for frontend effect
AOS.init({
  offset: 330,
  duration:1000
});

function goLoginPage(){
  window.location.href = "../html/login.html";
}

function goAskPage(){
  window.location.href = "../html/ask.html"
}

function goContributionPage(){
  window.location.href = "../html/contribute.html"
}

function goReviewPage(){
  window.location.href = "../html/Review.html"
}
