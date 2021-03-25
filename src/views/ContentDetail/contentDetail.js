// contentDetail.js
import Swiper, { Navigation, A11y } from "swiper/core";
import { Accordion } from "../../library/shared";

Swiper.use([Navigation, A11y]);

const CURRICULUM_TOGGLE_ALL_CLASSNAME = "curriculum-accordion-toggle-all";

const $curriculumToggleAll = document.querySelector(
  `.${CURRICULUM_TOGGLE_ALL_CLASSNAME}`
);

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
  const swiper = carouselElement("author-carousel");
  const prevEl = swiper.parentElement.querySelector(".carousel-nav-left");
  const nextEl = swiper.parentElement.querySelector(".carousel-nav-right");
  return new Swiper(
    swiper,
    Object.assign({}, carouselDefaultOptions, {
      slidesPerGroup: 1,
      slidesPerView: 2.5,
      navigation: { prevEl, nextEl },
      a11y: {
        prevSlideMessage: "Previous lessons slide",
        nextSlideMessage: "Next lessons slide",
      },
      breakpoints: {
        320: {
          slidesPerGroup: 1,
          slidesPerView: 1,
        },
        768: {
          slidesPerGroup: 1,
          slidesPerView: 2.5,
        },
      },
    })
  );
})();

const relatedCarousel = (() => {
  const swiper = carouselElement("related-carousel");
  const prevEl = swiper.parentElement.querySelector(".carousel-nav-left");
  const nextEl = swiper.parentElement.querySelector(".carousel-nav-right");
  return new Swiper(
    swiper,
    Object.assign({}, carouselDefaultOptions, {
      slidesPerGroup: 3,
      slidesPerView: 3,
      navigation: { prevEl, nextEl },
      a11y: {
        prevSlideMessage: "Previous lessons slide",
        nextSlideMessage: "Next lessons slide",
      },
      breakpoints: {
        320: {
          slidesPerGroup: 1,
          slidesPerView: 1.25,
          centeredSlides: true,
        },
        768: {
          slidesPerGroup: 3,
          slidesPerView: 3,
        },
      },
    })
  );
})();

const findEventTarget = (eventPath, elementLimit, elementToFind) => {
  let target = null;

  // console.log("traversing event path...");
  while (true) {
    const current = eventPath.shift();
    if (current === elementLimit) {
      // console.log("target not found...");
      break;
    }
    if (current.tagName.toLowerCase() == elementToFind) {
      // console.log("target found...");
      target = current;
      break;
    }
  }

  return target;
};

(() => {
  const objectives = new Accordion(".objectives-accordion", {
    allowItemHeaderClick: true,
  });
  const description = new Accordion(".description-accordion", {
    allowItemHeaderClick: true,
  });
  const curriculum = new Accordion(".curriculum-accordion", {
    allowItemHeaderClick: true,
    togglePosition: "left",
  });

  $curriculumToggleAll.addEventListener(
    "click",
    (ev) => {
      ev.preventDefault();

      let nextAction =
        ev.target.dataset.trigger == "expand" ? "collapse" : "expand";
      if (ev.target.dataset.trigger == "expand") {
        curriculum.expandAll();
      } else if (ev.target.dataset.trigger == "collapse") {
        curriculum.collapseAll();
      }

      ev.target.dataset.trigger = nextAction;
      ev.target.innerText = `${nextAction[0].toUpperCase()}${nextAction.substring(
        1
      )} all lessons sections`;
    },
    false
  );
})();
