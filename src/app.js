// app.js
import "bootstrap/dist/css/bootstrap.css";
import "./scss/app.scss";

const BODY_NOSCROLL_CLASSNAME = "no-scroll";
const MEGA_MENU_CLASSNAME = "mega-menu";
const MEGA_MENU_WRAP_CLASSNAME = "menu-wrap";
const MEGA_MENU_LINK_LIST_QUERY = ".menu-wrap ul li";
const MEGA_MENU_LINK_ACTIVE_CLASSNAME = "active";
const MOBILE_MENU_CLASSNAME = "mobile-menu";
const MOBILE_SIDENAV_CLASSNAME = "mobile-sidenav";
const MOBILE_SIDENAV_HIDDEN_CLASSNAME = "mobile-sidenav-hidden";
const MOBILE_SIDENAV_CLOSE_BUTTON_CLASSNAME = "snmenu-close";
const MOBILE_USER_CLASSNAME = "module-user-mobile";
const MODULE_SEARCH_BUTTON_QUERY = ".module-search > button";
const MODULE_SEARCH_FIELD_QUERY = ".module-search > .search-field";
const MODULE_SEARCH_CLOSE_QUERY = ".module-search > .search-field button";

const $megaMenu = document.querySelector(`.${MEGA_MENU_CLASSNAME}`);
const $megaMenuWrap = $megaMenu.querySelector(`.${MEGA_MENU_WRAP_CLASSNAME}`);
const $megaMenuLinkList = $megaMenu.querySelectorAll(MEGA_MENU_LINK_LIST_QUERY);
const $mobileMenuButton = document.querySelector(`.${MOBILE_MENU_CLASSNAME}`);
const $mobileSideNav = document.querySelector(`.${MOBILE_SIDENAV_CLASSNAME}`);
const $mobileUserButton = document.querySelector(`.${MOBILE_USER_CLASSNAME}`);
const $moduleSearchButton = document.querySelector(MODULE_SEARCH_BUTTON_QUERY);
const $moduleSearchField = document.querySelector(MODULE_SEARCH_FIELD_QUERY);
const $moduleSearchCloseQuery = document.querySelector(
  MODULE_SEARCH_CLOSE_QUERY
);

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

const onMobileMenuButtonClick = (ev, navType) => {
  if (window.innerWidth >= 992) {
    return;
  }
  if (navType != "explore" && navType != "user") {
    return;
  }

  document.body.classList.add(BODY_NOSCROLL_CLASSNAME);
  $mobileSideNav.style.display = "block";
  $mobileSideNav
    .querySelector(`.snmenu-${navType}`)
    .classList.remove("snmenu-inactive");

  window.setTimeout(() => {
    $mobileSideNav.classList.remove(MOBILE_SIDENAV_HIDDEN_CLASSNAME);
  }, 10);
};

const onSidenavCloseButtonClick = (ev) => {
  if (window.innerWidth >= 992) {
    return;
  }
  if (!ev.target.closest(`.${MOBILE_SIDENAV_CLOSE_BUTTON_CLASSNAME}`)) {
    return;
  }

  const activeNav =
    ev.target.closest(".snmenu-explore") || ev.target.closest(".snmenu-user");

  $mobileSideNav.classList.add(MOBILE_SIDENAV_HIDDEN_CLASSNAME);
  window.setTimeout(() => {
    $mobileSideNav.style.display = null;
    activeNav.classList.add("snmenu-inactive");
    document.body.classList.remove(BODY_NOSCROLL_CLASSNAME);
  }, 125);
};

const onSearchCloseButtonClick = () => {
  $moduleSearchField.classList.remove("active");
};

const onModuleSearchButtonClick = () => {
  if ($moduleSearchField.classList.contains("active")) {
    onSearchCloseButtonClick();
    return;
  }

  $moduleSearchField.classList.add("active");
};

(() => {
  $megaMenuLinkList.forEach((list, _) => {
    list.addEventListener("mouseenter", onMenuListMouseEnter, false);
    list.addEventListener("mouseleave", onMenuListMouseLeave, false);
  });

  $mobileMenuButton.addEventListener(
    "click",
    function (ev) {
      onMobileMenuButtonClick(ev, "explore");
    },
    false
  );
  $mobileUserButton.addEventListener(
    "click",
    function (ev) {
      onMobileMenuButtonClick(ev, "user");
    },
    false
  );
  $mobileSideNav.addEventListener("click", onSidenavCloseButtonClick, false);
  $moduleSearchButton.addEventListener(
    "click",
    onModuleSearchButtonClick,
    false
  );
  $moduleSearchCloseQuery.addEventListener(
    "click",
    onSearchCloseButtonClick,
    false
  );
})();
