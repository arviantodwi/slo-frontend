// lesson.js
import { Accordion, carouselBuilder } from "../../library/shared";
import Swiper, { Navigation, A11y } from "swiper/core";

Swiper.use([Navigation, A11y]);

const DESKTOP_CURICCULUM_TABS_QUERY = ".desktop-sb-curriculum .curriculum-tabs";
let MOBILE_CURICCULUM_TABS_QUERY = null;

const $desktopCurriculumTabs = document.querySelector(
  DESKTOP_CURICCULUM_TABS_QUERY
);
let $mobileCurriculumTabs = null;

const cloneCurriculum = () => {
  const mobileCurriculum = document.querySelector(".mobile-curriculum");
  if (mobileCurriculum.children.length) {
    return;
  }

  const curriculum = document
    .querySelector(".desktop-sb-curriculum")
    .firstElementChild.cloneNode(true);

  mobileCurriculum.appendChild(curriculum);
  // MOBILE_CURICCULUM_TABS_QUERY = ".mobile-curriculum .curriculum-tabs";
  $mobileCurriculumTabs = document.querySelector(
    ".mobile-curriculum .curriculum-tabs"
  );

  const mobileCurriculumAccordion = new Accordion(
    ".mobile-curriculum .curriculum-accordion",
    {
      togglePosition: "left",
      allowItemHeaderClick: true,
      initialExpandedItems: 0,
    }
  );
};

const onCurriculumTabButtonClick = (tabsWrap, ev) => {
  if (!ev.target.closest("button")) {
    return;
  }

  const button = ev.target.closest("button");
  if (button.parentElement.classList.contains("tab-active")) {
    return;
  }

  const tabIndex = parseInt(button.dataset.tabIndex);
  const currentActiveTabIndex = parseInt(
    tabsWrap.querySelector(".tab-active button").dataset.tabIndex
  );
  tabsWrap.querySelector(".tab-active").classList.remove("tab-active");
  button.parentElement.classList.add("tab-active");
  tabsWrap.parentElement
    .querySelector(`#tab-${currentActiveTabIndex}`)
    .classList.add("tab-content-hidden");
  tabsWrap.parentElement
    .querySelector(`#tab-${tabIndex}`)
    .classList.remove("tab-content-hidden");
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
          slidesPerGroup: 1,
          slidesPerView: 1,
        },
        768: {
          slidesPerGroup: 1,
          slidesPerView: 1.5,
        },
        800: {
          slidesPerGroup: 1,
          slidesPerView: 1.75,
        },
        992: {
          slidesPerGroup: 1,
          slidesPerView: 1.5,
        },
        1400: {
          slidesPerGroup: 1,
          slidesPerView: 2.5,
        },
      },
    });
    return new Swiper(container, option);
  })();

  $desktopCurriculumTabs.addEventListener(
    "click",
    (ev) => onCurriculumTabButtonClick($desktopCurriculumTabs, ev),
    false
  );

  cloneCurriculum();
  $mobileCurriculumTabs.addEventListener(
    "click",
    (ev) => onCurriculumTabButtonClick($mobileCurriculumTabs, ev),
    false
  );
})();
