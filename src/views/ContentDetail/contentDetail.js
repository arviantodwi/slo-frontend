// contentDetail.js
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

class Accordion {
  constructor(element = null, option = {}) {
    try {
      if (element === null) {
        throw new Error("Accordion element should be defined.");
      }

      if (typeof element === "string") {
        const _element = document.querySelector(element);
        if (!_element) {
          throw new Error(
            `Accordion failed to resolve the query selector: ${element}, that being passed in component instantiation.`
          );
        }

        element = _element;
      }
    } catch (e) {
      console.error(`${e.name}: ${e.message}`);
      return;
    }

    this.$ = element;
    this.events = this.initCustomEvents();
    this.toggles = element.querySelectorAll(".accordion-toggler");
    this.items = element.querySelectorAll(".accordion-item");

    this.init();
  }

  onToggleClick(ev) {
    const target = findEventTarget([...ev.path], this.$, "button");
    if (target === null) {
      return;
    }

    const key = target.dataset.key;
    const expandState = this.items[key].dataset.expanded === "true";
    this.items[key].dataset.expanded = String(!expandState);
  }

  initCustomEvents() {
    const events = {};

    events.toggleclick = new CustomEvent("toggleclick", {
      bubbles: true,
      cancelable: true,
    });

    return events;
  }

  init() {
    this.toggles.forEach((toggle, index) => {
      toggle.dataset.key = index;
      toggle.addEventListener("toggleclick", this.onToggleClick.bind(this));
    });

    this.$.addEventListener(
      "click",
      (ev) => ev.target.dispatchEvent(this.events.toggleclick),
      false
    );
  }
}

(() => {
  const objectives = new Accordion(".objectives");
  const description = new Accordion(".description");
  const curriculum = new Accordion(".lessons");
})();
