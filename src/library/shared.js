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
    if (
      current.tagName.toLowerCase() == elementToFind ||
      current == elementToFind
    ) {
      // path tag name equals element to find
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

/**
 * Simple accordion plugin
 */
export class Accordion {
  /**
   *
   * @param {!(string|HTMLElement)} element
   * @param {Object.<string, any>} [option={}]
   * @returns
   */
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

    const defaults = {
      /**
       * Classname option
       */
      containerClass: "accordion",
      itemClass: "accordion-item",
      itemHeaderClass: "accordion-item-header",
      itemContentClass: "accordion-item-content",
      itemToggleClass: "accordion-toggler",
      /**
       * Feature option
       */
      // allowItemHeaderClick: boolean
      // Whether accordion item header can be clicked or not to collapse/expand the corresponding item content.
      allowItemHeaderClick: false,
      //
      // togglePosition: 'left' | 'right'
      // Set toggle button position.
      togglePosition: "right",
      //
      // singleExpandMode: boolean
      // Whether only single accordion item or multiple items can be expanded at a time.
      // When the value is `true`, `initialExpandedItems` must use number value or else this option will not work.
      singleExpandMode: false,
      //
      // initialExpandedItems: number | number[] | 'all'
      // Set items that should be expanded when the accordion was executed.
      // When number OR array of number is used as a value, the number must be 0-based index.
      initialExpandedItems: 0,
    };

    this.$ = element;
    this.option = Object.assign({}, defaults, option);
    this.events = this.initCustomEvents();
    this.toggles = element.querySelectorAll(`.${this.option.itemToggleClass}`);
    this.items = element.querySelectorAll(`.${this.option.itemClass}`);

    this.init();
  }

  expandAll() {
    for (let item of this.items) {
      item.dataset.expanded = true;
    }
  }

  collapseAll() {
    for (let item of this.items) {
      item.dataset.expanded = false;
    }
  }

  expand(itemIndex) {
    this.items[itemIndex].dataset.expanded = true;
  }

  collapse(itemIndex) {
    this.items[itemIndex].dataset.expanded = false;
  }

  toggle(itemIndex) {
    const expandState = this.items[itemIndex].dataset.expanded === "true";
    this.items[itemIndex].dataset.expanded = String(!expandState);
  }

  onToggleClick(ev) {
    const toggleElement =
      this.option.allowItemHeaderClick === true
        ? `.accordion-item-header`
        : "button";
    const target = ev.target.closest(toggleElement);
    if (target === null) {
      return;
    }

    const key = parseInt(target.dataset.key);
    this.toggle(key);
    if (
      this.option.singleExpandMode === true &&
      typeof this.option.initialExpandedItems == "number"
    ) {
      this.items.forEach((item, index) => {
        if (key !== index) {
          item.dataset.expanded = false;
        }
      });
    }
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
    // Add additional classnames on container based on option
    if (
      this.option.togglePosition == "left" ||
      this.option.togglePosition == "right"
    ) {
      this.$.classList.add(`accordion-toggles-${this.option.togglePosition}`);
    } else {
      this.$.classList.add(`accordion-toggles-right`);
    }
    if (this.option.allowItemHeaderClick === true) {
      this.$.classList.add("accordion-item-header-clickable");
    }

    // Attach `toggleclick` custom event to toggle button, or header if it's allowed in option
    this.toggles.forEach((toggle, index) => {
      if (this.option.allowItemHeaderClick === true) {
        toggle = toggle.closest(`.${this.option.itemHeaderClass}`);
      }
      toggle.dataset.key = index;
      toggle.addEventListener("toggleclick", this.onToggleClick.bind(this));
    });

    // Dispatch custom event: `toggleclick`
    this.$.addEventListener(
      "click",
      (ev) => ev.target.dispatchEvent(this.events.toggleclick),
      false
    );

    // Apply initial expanded items
    if (Array.isArray(this.option.initialExpandedItems)) {
      this.collapseAll();
      for (const index of this.option.initialExpandedItems) {
        this.items[index].dataset.expanded = true;
      }
    } else if (typeof this.option.initialExpandedItems == "number") {
      this.collapseAll();
      this.items[this.option.initialExpandedItems].dataset.expanded = true;
    } else if (
      typeof this.option.initialExpandedItems == "string" &&
      this.option.initialExpandedItems.toLowerCase() === "all"
    ) {
      this.expandAll();
    }
  }
}

export default {
  carouselBuilder,
  findEventTarget,
};
