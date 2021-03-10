// explore.js
import DomPurify from "dompurify";
import GridContent from "./grid.html";
import ListContent from "./list.html";

const VIEW_SWITCH_CLASSNAME = "view-switch";
const SWITCH_ACTIVE_CLASSNAME = "switch-active";
const CONTENT_CLASSNAME = "content-catalog";
const CONTENT_PRELOADER_CLASSNAME = "preloader";
const CONTENT_TOPBAR_CLASSNAME = "content-topbar";
const CONTENT_PAGINATION_CLASSNAME = "content-pagination";
const VIEW_TYPE_STORE = "explore-view-type";

const store = localStorage;
const content = document.querySelector(`.${CONTENT_CLASSNAME}`);
const viewSwitch = document.querySelector(`.${VIEW_SWITCH_CLASSNAME}`);
const topbar = document.querySelector(`.${CONTENT_TOPBAR_CLASSNAME}`);
const pagination = document.querySelector(`.${CONTENT_PAGINATION_CLASSNAME}`);
const preloaders = document.getElementsByClassName(CONTENT_PRELOADER_CLASSNAME);

let currentViewType = store.getItem(VIEW_TYPE_STORE) ?? "grid";

const toggleContentView = (nextView) => {
  try {
    if (nextView === "grid") {
      content.innerHTML = DomPurify.sanitize(GridContent());
    } else if (nextView === "list") {
      content.innerHTML = DomPurify.sanitize(ListContent());
    } else {
      throw new Error("View type other than Grid and List is not acceptable.");
    }
  } catch (e) {
    console.error(`${e.name}: ${e.message}`);
    return;
  }

  currentViewType = nextView;
  store.setItem(VIEW_TYPE_STORE, nextView);
};

const findEventTarget = (eventPath, elementLimit, elementToFind) => {
  let target = null;

  // console.log("traversing event path...");
  while (true) {
    const current = eventPath.shift();
    if (current === elementLimit) {
      // console.log("target not found...");
      return;
    }
    if (current.tagName.toLowerCase() == elementToFind) {
      // console.log("target found...");
      target = current;
      break;
    }
  }

  return target;
};

const toggleActiveSwitch = (nextView) => {
  const previousView = nextView == "grid" ? "list" : "grid";

  viewSwitch
    .querySelector(`a[data-toggle="${previousView}"]`)
    .classList.remove(SWITCH_ACTIVE_CLASSNAME);
  viewSwitch
    .querySelector(`a[data-toggle="${nextView}"]`)
    .classList.add(SWITCH_ACTIVE_CLASSNAME);
};

const onViewSwitchButtonClick = (ev) => {
  ev.preventDefault();

  const eventPath = [...ev.path];
  const target = findEventTarget(eventPath, viewSwitch, "a");
  if (target === null) {
    return;
  }

  const viewTypeToDisplay = target.dataset.toggle;
  if (viewTypeToDisplay === currentViewType) {
    return;
  }

  toggleActiveSwitch(viewTypeToDisplay);
  toggleContentView(viewTypeToDisplay);
};

(() => {
  if (currentViewType !== "grid" && currentViewType !== "list") {
    currentViewType = "grid";
  }
  if (currentViewType === "list") {
    toggleActiveSwitch(currentViewType);
    toggleContentView(currentViewType);
  }

  viewSwitch.addEventListener("click", onViewSwitchButtonClick, false);

  setTimeout(() => {
    content.style.display = null;
    topbar.style.display = null;
    pagination.style.display = null;
    for (let p of preloaders) {
      p.remove();
    }
  }, 2500);
})();
