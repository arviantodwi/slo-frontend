// lesson.js
import { Accordion, carouselBuilder } from "../../library/shared";
import Swiper, { Navigation, A11y } from "swiper/core";

Swiper.use([Navigation, A11y]);

const cloneCurriculum = () => {
  const mobileCurriculum = document.querySelector(".mobile-curriculum");
  if (mobileCurriculum.children.length) {
    return;
  }

  const curriculum = document
    .querySelector(".desktop-sb-curriculum")
    .firstElementChild.cloneNode(true);

  mobileCurriculum.appendChild(curriculum);

  const mobileCurriculumAccordion = new Accordion(
    ".mobile-curriculum .curriculum-accordion",
    {
      togglePosition: "left",
      allowItemHeaderClick: true,
      initialExpandedItems: 0,
    }
  );
};

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
      a11y: {
        prevSlideMessage: "Previous related lessons slide",
        nextSlideMessage: "Next related lessons slide",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        768: {
          slidesPerView: 3.5,
          slidesPerGroup: 1,
        },
        992: {
          slidesPerView: 2.5,
          slidesPerGroup: 1,
        },
        1200: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1400: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      },
    });
    return new Swiper(container, option);
  })();

  cloneCurriculum();
})();
