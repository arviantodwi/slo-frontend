// index.js
import DomPurify from "dompurify";
import ProgressBar from "progressbar.js";
import Swiper, { Navigation, A11y } from "swiper/core";
import StopIcon from "../../images/icons/stop.svg?inline";
import PlayIcon from "../../images/icons/play.svg?inline";

const PLAY_STATE = "playing";
const PAUSE_STATE = "paused";

Swiper.use([Navigation, A11y]);

const carouselElement = (idName) =>
  document.getElementById(idName).querySelector(".swiper-container");
const carouselDefaultOptions = {
  direction: "horizontal",
  loop: true,
  slidesPerGroup: 5,
  slidesPerView: 5,
  spaceBetween: 24,
  navigation: false,
  a11y: true,
};

const lessonsCarousel = (() => {
  const swiper = carouselElement("lessons-carousel");
  const prevEl = swiper.parentElement.querySelector(".carousel-nav-left");
  const nextEl = swiper.parentElement.querySelector(".carousel-nav-right");
  return new Swiper(
    swiper,
    Object.assign({}, carouselDefaultOptions, {
      navigation: { prevEl, nextEl },
      a11y: {
        prevSlideMessage: "Previous lessons slide",
        nextSlideMessage: "Next lessons slide",
      },
    })
  );
})();

const webinarsCarousel = (() => {
  const swiper = carouselElement("webinars-carousel");
  const prevEl = swiper.parentElement.querySelector(".carousel-nav-left");
  const nextEl = swiper.parentElement.querySelector(".carousel-nav-right");
  return new Swiper(
    swiper,
    Object.assign({}, carouselDefaultOptions, {
      navigation: { prevEl, nextEl },
      a11y: {
        prevSlideMessage: "Previous webinars slide",
        nextSlideMessage: "Next webinars slide",
      },
    })
  );
})();

const videosCarousel = (() => {
  const swiper = carouselElement("videos-carousel");
  return new Swiper(
    swiper,
    Object.assign({}, carouselDefaultOptions, {
      loop: false,
      a11y: false,
    })
  );
})();

const initProgressCircle = (htmlTagId) => {
  return new ProgressBar.Circle(`#${htmlTagId}`, {
    color: "#E25145",
    strokeWidth: 9,
    trailColor: "rgba(0, 0, 0, 0.1)",
    trailWidth: 3,
  });
};

const initAudio = () => {
  const audio = new Audio();
  audio.controls = false;
  audio.autoplay = false;
  audio.currentTime = 10;
  audio.crossOrigin = "anonymous";

  return audio;
};

const podcastUrls = [
  "https://www.podtrac.com/pts/redirect.mp3/chtbl.com/track/5899E/traffic.megaphone.fm/HSW8805902556.mp3?updated=1614802965",
  "https://www.podtrac.com/pts/redirect.mp3/chtbl.com/track/5899E/traffic.megaphone.fm/HSW1330596868.mp3",
  "https://www.podtrac.com/pts/redirect.mp3/chtbl.com/track/5899E/traffic.megaphone.fm/HSW9534411347.mp3",
];

const podcastPreviews = [
  ...document.getElementsByClassName("podcast-preview"),
].reduce((obj, element, index) => {
  obj[element.id] = {
    index,
    node: element,
    progress: initProgressCircle(element.id),
    state: PAUSE_STATE,
  };

  return obj;
}, {});
podcastPreviews.audio = initAudio();
podcastPreviews.currentPlay = null;
console.log(podcastPreviews);
console.log(StopIcon);
window["podcast1"] = podcastPreviews["podcast-1"];

const podcastTable = document.querySelector(
  '.table[data-table-type="podcast"]'
);
podcastTable.addEventListener(
  "click",
  (ev) => {
    const eventPath = [...ev.path];
    let button = null;
    while (true) {
      // console.log("traversing event path...");
      const target = eventPath.shift();
      if (target.classList.contains("table")) {
        // console.log("not a button...");
        return;
      }
      if (
        target.tagName.toLowerCase() == "button" &&
        target.classList.contains("preview-switch")
      ) {
        // console.log("button found...");
        button = target;
        break;
      }
    }

    const key = button.parentElement.id;
    const buttonIcon = button.firstElementChild;
    if (podcastPreviews[key].state == PAUSE_STATE) {
      if (podcastPreviews.currentPlay !== null) {
        podcastPreviews[podcastPreviews.currentPlay].state = PAUSE_STATE;
        podcastPreviews[podcastPreviews.currentPlay].node.querySelector(
          "button i"
        ).innerHTML = DomPurify.sanitize(PlayIcon, {
          svg: true,
          svgFilters: true,
        });
      }

      podcastPreviews.currentPlay = key;
      podcastPreviews[key].state = PLAY_STATE;
      buttonIcon.innerHTML = DomPurify.sanitize(StopIcon, {
        svg: true,
        svgFilters: true,
      });
    } else if (podcastPreviews[key].state == PLAY_STATE) {
      console.log(
        podcastPreviews.audio.currentSrc,
        podcastPreviews.audio.currentTime
      );
      podcastPreviews.currentPlay = null;
      podcastPreviews[key].state = PAUSE_STATE;
      buttonIcon.innerHTML = DomPurify.sanitize(PlayIcon, {
        svg: true,
        svgFilters: true,
      });
      podcastPreviews.audio.pause();
      console.log(
        podcastPreviews.audio.currentSrc,
        podcastPreviews.audio.currentTime
      );

      return;
    }

    podcastPreviews.audio.src = podcastUrls[podcastPreviews[key].index];
    podcastPreviews.audio.currentTime = 10;
    podcastPreviews.audio.load();
    podcastPreviews.audio.play();
  },
  false
);

// audio.addEventListener(
//   "canplay",
//   (ev) => {
//     loading.innerText = "PLAYING";
//     audio.play();
//   },
//   false
// );

/* audio.addEventListener('timeupdate', (ev) => {
  console.log(ev);
}, false); */
