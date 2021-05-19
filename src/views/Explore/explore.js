// explore.js
import DomPurify from "dompurify";
import { findEventTarget, Accordion } from "../../library/shared";
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

const templateData = [
  {
    title: "Applied Sport Psychology and Leadership in Sport",
    type: "Course",
    rating: 4.76,
    price: 92.99,
    permalink: "applied-sport-psychology-leadership-sport",
    cover: "https://i.imgur.com/RqmQKO3.jpg",
    description:
      "Enhance your knowledge of sport psychology from an athlete or coach perspective with this in depth applied course.",
    author: {
      name: "John Kosner",
      org: "Kosner Media",
      photo: "https://i.imgur.com/Ld7oEoT.jpg",
    },
  },
  {
    title: "How To Deal With Loss in Sport",
    type: "Course",
    rating: 3.4,
    price: 43.52,
    permalink: "how-to-deal-with-loss-in-sport",
    cover: "https://i.imgur.com/mu6bImD.jpg",
    description: "Learn how to use losses to get more wins",
    author: {
      name: "Rick Jones",
      org: "Kosner Media",
      photo: "https://i.imgur.com/NqPEpYD.png",
    },
  },
  {
    title: "The Complete Course on Sport Events and Facility Management",
    type: "Course",
    rating: 4.4,
    price: 0,
    permalink: "complete-course-sport-events-and-facility-management",
    cover: "https://i.imgur.com/Em4QCCW.jpg",
    description:
      "An In-Depth Look at the Work of Sports Event and Facility Managers and What it Takes to Run a Successful Sports Event",
    author: {
      name: "Jim Host",
      org: "International Management Group (IMG)",
      photo: "https://i.imgur.com/5ayUOK3.png",
    },
  },
];

const toggleContentView = (nextView) => {
  try {
    if (nextView === "grid") {
      content.innerHTML = DomPurify.sanitize(GridContent(templateData));
    } else if (nextView === "list") {
      content.innerHTML = DomPurify.sanitize(ListContent(templateData));
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

  // const target = findEventTarget([...ev.path], "a", viewSwitch);
  const target = ev.target.closest("a");
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

  const filter = new Accordion(".accordion", {
    initialExpandedItems: "all",
    allowItemHeaderClick: true,
  });

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
