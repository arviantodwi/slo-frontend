// lesson.js
import { Accordion } from "../../library/shared";

(() => {
  const curriculum = new Accordion(".curriculum-accordion", {
    togglePosition: "left",
    allowItemHeaderClick: true,
  });
})();
