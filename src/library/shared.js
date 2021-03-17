// shared.js
const SWIPER_CONTAINER_CLASSNAME = "swiper-container";
const SWIPER_NAV_LEFT_CLASSNAME = "carousel-nav-left";
const SWIPER_NAV_RIGHT_CLASSNAME = "carousel-nav-right";

/**
 *
 * @param {*[]} eventPath Array of elements path from Event object.
 * @param {string} elementToFind Element to find which passed as a tag name string e.g. 'button'.
 * @param {HTMLElement|HTMLDocument|Window} [elementLimit=window] HTML element where the path traversing should stop when reach this element. Optional, default value is Window object.
 * @returns {?HTMLElement} HTML element target, or null if the element is not found.
 */
export const findEventTarget = (
  eventPath,
  elementToFind,
  elementLimit = window
) => {
  let target = null;

  while (true) {
    const current = eventPath.shift();
    if (current === elementLimit) {
      // path traversing reach the limit
      break;
    }
    if (current.tagName.toLowerCase() == elementToFind) {
      // path equals element to find
      target = current;
      break;
    }
  }

  return target;
};

/**
 *
 * @param {string} containerId
 * @param {!boolean} [useNav = true]
 * @param {?Object.<string, any>} additionalOption
 * @returns {{container: string, option: Object.<string, any>}}
 */
export const carouselBuilder = (
  containerId,
  useNav = true,
  additionalOption = null
) => {
  const $root = document.getElementById(containerId);
  const $container = $root.querySelector(`.${SWIPER_CONTAINER_CLASSNAME}`);
  let option = {
    direction: "horizontal",
    loop: true,
    slidesPerGroup: 5,
    slidesPerView: 5,
    spaceBetween: 24,
    navigation: false,
    a11y: true,
  };

  if (useNav) {
    option.navigation = {
      prevEl: $root.querySelector(`.${SWIPER_NAV_LEFT_CLASSNAME}`),
      nextEl: $root.querySelector(`.${SWIPER_NAV_RIGHT_CLASSNAME}`),
    };
  }
  if (additionalOption !== null) {
    option = Object.assign({}, option, additionalOption);
  }

  return { container: $container, option };
};

export default {
  carouselBuilder,
  findEventTarget,
};
