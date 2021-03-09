// explore.js
import GridContent from "./grid.html";
import ListContent from "./list.html";
import DomPurify from "dompurify";

const VIEW_SWITCH_CLASSNAME = "view-switch";
const CONTENT_CLASSNAME = "content-catalog";
const VIEW_TYPE_STORE = "explore-view-type";
const SWITCH_ACTIVE_CLASSNAME = "switch-active";

const store = localStorage;
const content = document.querySelector(`.${CONTENT_CLASSNAME}`);
const viewSwitch = document.querySelector(`.${VIEW_SWITCH_CLASSNAME}`);

let currentViewType = store.getItem(VIEW_TYPE_STORE) ?? "grid";
if (currentViewType !== "grid" && currentViewType !== "list") {
  currentViewType = "grid";
}

const displayNewContentView = (viewType) => {
  try {
    if (viewType === "grid") {
      content.innerHTML = DomPurify.sanitize(GridContent());
    } else if (viewType === "list") {
      content.innerHTML = DomPurify.sanitize(ListContent());
    } else {
      throw new Error("View type other than Grid and List is not acceptable.");
    }
  } catch (e) {
    console.error(`${e.name}: ${e.message}`);
    return;
  }

  currentViewType = viewType;
  store.setItem(VIEW_TYPE_STORE, currentViewType);
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

  viewSwitch
    .querySelector(`a[data-toggle="${currentViewType}"]`)
    .classList.remove(SWITCH_ACTIVE_CLASSNAME);
  viewSwitch
    .querySelector(`a[data-toggle="${viewTypeToDisplay}"]`)
    .classList.add(SWITCH_ACTIVE_CLASSNAME);

  displayNewContentView(viewTypeToDisplay);
};

viewSwitch.addEventListener("click", onViewSwitchButtonClick, false);
