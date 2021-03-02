// index.js
import Swiper, { Navigation, A11y } from "swiper/core";

Swiper.use([Navigation, A11y]);

const carouselElement = (idName) =>
  document.getElementById(idName).querySelector(".swiper-container");
const carouselDefaultOptions = {
  direction: "horizontal",
  loop: true,
  slidesPerGroup: 5,
  slidesPerView: 5,
  spaceBetween: 24,
  navigation: false,
  a11y: true,
};

const lessonsCarousel = (() => {
  const swiper = carouselElement("lessons-carousel");
  const prevEl = swiper.parentElement.querySelector(".carousel-nav-left");
  const nextEl = swiper.parentElement.querySelector(".carousel-nav-right");
  return new Swiper(
    swiper,
    Object.assign({}, carouselDefaultOptions, {
      navigation: { prevEl, nextEl },
      a11y: {
        prevSlideMessage: "Previous lessons slide",
        nextSlideMessage: "Next lessons slide",
      },
    })
  );
})();

const webinarsCarousel = (() => {
  const swiper = carouselElement("webinars-carousel");
  const prevEl = swiper.parentElement.querySelector(".carousel-nav-left");
  const nextEl = swiper.parentElement.querySelector(".carousel-nav-right");
  return new Swiper(
    swiper,
    Object.assign({}, carouselDefaultOptions, {
      navigation: { prevEl, nextEl },
      a11y: {
        prevSlideMessage: "Previous webinars slide",
        nextSlideMessage: "Next webinars slide",
      },
    })
  );
})();
