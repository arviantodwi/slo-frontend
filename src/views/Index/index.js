// index.js
import DomPurify from "dompurify";
import ProgressBar from "progressbar.js";
import Swiper, { Navigation, A11y } from "swiper/core";
import { PlayIcon, StopIcon } from "../../library/svgicons";
import { findEventTarget, carouselBuilder } from "../../library/shared";

const PLAY_STATE = "playing";
const PAUSE_STATE = "paused";
const PODCAST_TABLE_QUERY = '.table[data-table-type="podcast"]';
const PODCAST_PREVIEW_CLASSNAME = "podcast-preview";

const $podcastTable = document.querySelector(PODCAST_TABLE_QUERY);
const $podcastPreviews = document.getElementsByClassName(
  PODCAST_PREVIEW_CLASSNAME
);

Swiper.use([Navigation, A11y]);

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

// ERR_BLOCKED_BY_CLIENT: https://www.keycdn.com/support/how-to-solve-err-blocked-by-client
// fetch(
//   "https://www.podtrac.com/pts/redirect.mp3/chtbl.com/track/5899E/traffic.megaphone.fm/HSW8805902556.mp3?updated=1614802965"
// )
//   .then((response) => response.blob())
//   .then((blob) => {
//     console.log(blob);
//   });

// let audioPlayPromise;
const podcastUrls = [
  "https://www.podtrac.com/pts/redirect.mp3/chtbl.com/track/5899E/traffic.megaphone.fm/HSW8805902556.mp3?updated=1614802965",
  "https://www.podtrac.com/pts/redirect.mp3/chtbl.com/track/5899E/traffic.megaphone.fm/HSW1330596868.mp3",
  "https://www.podtrac.com/pts/redirect.mp3/chtbl.com/track/5899E/traffic.megaphone.fm/HSW9534411347.mp3",
];
const podcastPreviews = {
  audio: initAudio(),
  currentPlay: null,
  play: function (id) {
    if (this.currentPlay !== null) {
      this.stop(this.currentPlay);
    }

    this.currentPlay = id;
    this[id].state = PLAY_STATE;
    this.toggleButton(id);
    this.audio.src = podcastUrls[this[id].index];
    this.audio.currentTime = 10;
    this.audio.load();
    this.audio.play().catch(() => {});
  },
  stop: function (id) {
    this.currentPlay = null;
    this[id].state = PAUSE_STATE;
    this.toggleButton(id);
    this.audio.pause();
    // if (audioPlayPromise !== undefined) {
    //   audioPlayPromise.then((_) => {
    //     this.audio.pause();
    //   });
    // }
  },
  toggleButton: function (id) {
    const $icon = this[id].node.querySelector("button i");
    const iconType = this[id].state == PAUSE_STATE ? PlayIcon : StopIcon;
    const option = {
      svg: true,
      svgFilters: true,
    };

    $icon.innerHTML = DomPurify.sanitize(iconType, option);
  },
};

// console.log(podcastPreviews);

const onPodcastPreviewButtonClick = (ev) => {
  const target = findEventTarget([...ev.path], "button", $podcastTable);
  if (target === null) {
    return;
  }

  const id = target.parentElement.id;
  if (podcastPreviews[id].state == PAUSE_STATE) {
    podcastPreviews.play(id);
  } else if (podcastPreviews[id].state == PLAY_STATE) {
    podcastPreviews.stop(id);
    // console.log(
    //   podcastPreviews.audio.currentSrc,
    //   podcastPreviews.audio.currentTime
    // );
  }
};

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

(() => {
  const lessonsCarousel = (() => {
    const { container, option } = carouselBuilder("lessons-carousel", _, {
      a11y: {
        prevSlideMessage: "Previous lessons slide",
        nextSlideMessage: "Next lessons slide",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1199: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
      },
    });
    return new Swiper(container, option);
  })();

  const webinarsCarousel = (() => {
    const { container, option } = carouselBuilder("webinars-carousel", _, {
      a11y: {
        prevSlideMessage: "Previous webinars slide",
        nextSlideMessage: "Next webinars slide",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1199: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
      },
    });
    return new Swiper(container, option);
  })();

  const videosCarousel = (() => {
    const { container, option } = carouselBuilder("videos-carousel", false, {
      loop: false,
      a11y: false,
      breakpoints: {
        320: {
          slidesPerView: 1.5,
          slidesPerGroup: 1,
          freeMode: true,
        },
        768: {
          slidesPerView: 2.5,
          slidesPerGroup: 2,
          freeMode: true,
        },
        992: {
          slidesPerView: 3.5,
          slidesPerGroup: 3,
          freeMode: true,
        },
        1199: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          allowSlideNext: false,
          allowSlidePrev: false,
        },
      },
    });
    return new Swiper(container, option);
  })();

  for (const [index, node] of [...$podcastPreviews].entries()) {
    podcastPreviews[node.id] = {
      index,
      node,
      progress: initProgressCircle(node.id),
      state: PAUSE_STATE,
    };
  }

  $podcastTable.addEventListener("click", onPodcastPreviewButtonClick, false);
})();
