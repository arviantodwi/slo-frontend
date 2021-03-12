// app.js
import "bootstrap/dist/css/bootstrap.css";
import "./scss/app.scss";

const MEGA_MENU_CLASSNAME = "mega-menu";

const $megaMenu = document.querySelector(`.${MEGA_MENU_CLASSNAME}`);
const $megaMenuLinkList = $megaMenu.querySelectorAll(".menu-wrap ul li");

/**
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

const onMegaMenuLinkMouseOver = (ev) => {
  console.log(ev);
  // ev.stopPropagation();
  const target = findEventTarget([...ev.path], $megaMenu, "li");
  if (target === null) {
    return;
  }

  const submenu = target.querySelector("ul")?.cloneNode(true) ?? null;
  if (submenu === null) {
    return;
  }

  $megaMenu.querySelector(".menu-wrap").appendChild(submenu);
};

const onMegaMenuLinkMouseLeave = (ev) => {
  const target = findEventTarget([...ev.path], $megaMenu, "li");
  if (target === null) {
    return;
  }

  const $menuWrap = $megaMenu.querySelector(".menu-wrap");
  if ($menuWrap.children.length > 1) {
    $menuWrap.removeChild($menuWrap.lastChild);
  }
};
*/

(() => {
  const rightPads = [0];
  const bottomPads = [0];

  $megaMenuLinkList.forEach((list, _) => {
    list.addEventListener(
      "mouseenter",
      (ev) => {
        const target = ev.target;
        target.classList.add("active");

        const submenu = target.querySelector("ul") ?? null;
        if (submenu === null) {
          return;
        }

        rightPads.unshift(rightPads[0] + submenu.clientWidth + 1);
        if (
          submenu.clientHeight >
          $megaMenu.querySelector(".menu-wrap").clientHeight
        ) {
          bottomPads.unshift(
            submenu.clientHeight -
              $megaMenu.querySelector(".menu-wrap").clientHeight
          );
        } else {
          bottomPads.unshift(bottomPads[0]);
        }
        $megaMenu.querySelector(
          ".menu-wrap"
        ).style.paddingRight = `${rightPads[0]}px`;
        $megaMenu.querySelector(
          ".menu-wrap"
        ).style.paddingBottom = `${bottomPads[0]}px`;
        console.log(rightPads, bottomPads);
      },
      false
    );

    list.addEventListener(
      "mouseleave",
      (ev) => {
        const target = ev.target;
        target.classList.remove("active");

        const submenu = target.querySelector("ul") ?? null;
        if (submenu === null) {
          return;
        }

        rightPads.shift();
        bottomPads.shift();
        $megaMenu.querySelector(
          ".menu-wrap"
        ).style.paddingRight = `${rightPads[0]}px`;
        $megaMenu.querySelector(
          ".menu-wrap"
        ).style.paddingBottom = `${bottomPads[0]}px`;
        console.log(rightPads, bottomPads);
      },
      false
    );
  });
})();
