// lesson.js
import { Accordion, carouselBuilder } from "../../library/shared";
import Swiper, { Navigation, A11y } from "swiper/core";

Swiper.use([Navigation, A11y]);

(() => {
  const curriculum = new Accordion(".curriculum-accordion", {
    togglePosition: "left",
    allowItemHeaderClick: true,
    initialExpandedItems: "all",
  });

  const description = new Accordion(".description-accordion");

  const relatedCarousel = (() => {
    const { container, option } = carouselBuilder("related-carousel", _, {
      slidesPerGroup: 3,
      slidesPerView: 3,
      a11y: {
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
      },
    });
    return new Swiper(container, option);
  })();
})();
