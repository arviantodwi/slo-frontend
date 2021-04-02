// lesson.js
import { Accordion, carouselBuilder } from "../../library/shared";
import Swiper, { Navigation, A11y } from "swiper/core";

Swiper.use([Navigation, A11y]);

(() => {
  const curriculum = new Accordion(".curriculum-accordion", {
    togglePosition: "left",
    allowItemHeaderClick: true,
    initialExpandedItems: 0,
  });

  const description = new Accordion(".description-accordion", {
    initialExpandedItems: false,
  });

  const relatedCarousel = (() => {
    const { container, option } = carouselBuilder("related-carousel", _, {
      slidesPerGroup: 3,
      slidesPerView: 3,
      a11y: {
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
      },
      breakpoints: {
        320: {
          slidesPerGroup: 1,
          slidesPerView: 1.25,
        },
      },
    });
    return new Swiper(container, option);
  })();

  if (window.innerWidth <= 812) {
    const curriculum = document
      .querySelector(".desktop-sb-curriculum")
      .firstElementChild.cloneNode(true);

    document.querySelector(".mobile-curriculum").appendChild(curriculum);

    const mobileCurriculum = new Accordion(
      ".mobile-curriculum .curriculum-accordion",
      {
        togglePosition: "left",
        allowItemHeaderClick: true,
        initialExpandedItems: 0,
      }
    );
  }
})();
