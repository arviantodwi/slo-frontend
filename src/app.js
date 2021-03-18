// app.js
import "bootstrap/dist/css/bootstrap.css";
import "./scss/app.scss";

const MEGA_MENU_CLASSNAME = "mega-menu";
const MEGA_MENU_WRAP_CLASSNAME = "menu-wrap";
const MEGA_MENU_LINK_LIST_QUERY = ".menu-wrap ul li";
const MEGA_MENU_LINK_ACTIVE_CLASSNAME = "active";

const $megaMenu = document.querySelector(`.${MEGA_MENU_CLASSNAME}`);
const $megaMenuWrap = $megaMenu.querySelector(`.${MEGA_MENU_WRAP_CLASSNAME}`);
const $megaMenuLinkList = $megaMenu.querySelectorAll(MEGA_MENU_LINK_LIST_QUERY);

const rightPads = [0];
const bottomPads = [0];

const onMenuListMouseEnter = (ev) => {
  const target = ev.target;
  target.classList.add(MEGA_MENU_LINK_ACTIVE_CLASSNAME);

  const submenu = target.querySelector("ul") ?? null;
  if (submenu === null) {
    return;
  }

  rightPads.unshift(rightPads[0] + submenu.clientWidth + 1);
  if (submenu.clientHeight > $megaMenuWrap.clientHeight) {
    bottomPads.unshift(submenu.clientHeight - $megaMenuWrap.clientHeight);
  } else {
    bottomPads.unshift(bottomPads[0]);
  }
  $megaMenuWrap.style.paddingRight = `${rightPads[0]}px`;
  $megaMenuWrap.style.paddingBottom = `${bottomPads[0]}px`;
  // console.log(rightPads, bottomPads);
};

const onMenuListMouseLeave = (ev) => {
  const target = ev.target;
  target.classList.remove(MEGA_MENU_LINK_ACTIVE_CLASSNAME);

  const submenu = target.querySelector("ul") ?? null;
  if (submenu === null) {
    return;
  }

  rightPads.shift();
  bottomPads.shift();
  $megaMenuWrap.style.paddingRight = `${rightPads[0]}px`;
  $megaMenuWrap.style.paddingBottom = `${bottomPads[0]}px`;
  // console.log(rightPads, bottomPads);
};

(() => {
  $megaMenuLinkList.forEach((list, _) => {
    list.addEventListener("mouseenter", onMenuListMouseEnter, false);
    list.addEventListener("mouseleave", onMenuListMouseLeave, false);
  });
})();
