// contentDetail.js
import DomPurify from "dompurify";

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
  const curriculum = new Accordion(".curriculum");
})();
