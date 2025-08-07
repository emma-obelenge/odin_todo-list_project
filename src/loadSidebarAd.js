import videoSrc1 from "./vids/manualClip.mp4";
import videoSrc2 from "./vids/digitalClip.mp4";
import newElement from "./newElement";

export default function loadSidebarAd(firstTime = false) {
  const adsContainer = document.querySelector(".ads-container");
  const video = newElement(
    "video",
    "ads",
    "Browser doesn't support video format"
  );
  const videoSources = [videoSrc1, videoSrc2];
  let currentIndex = 0;
  const rightbar = document.querySelector(".rightbar");

  if (firstTime) {
    rightbar.style.display = "none";
    adsContainer.style.display = "flex";
  }
  if (rightbar.style.display == "flex" && !firstTime) {
    rightbar.style.display = "none";
    adsContainer.style.display = "flex";
  }
  // Basic video setup
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.objectFit = "cover";
  video.style.borderRadius = "12px";
  video.style.transition = "opacity 1s ease-in-out";
  video.style.opacity = 0;

  video.autoplay = true;
  video.muted = true;
  video.playsInline = true;
  video.loop = false;

  // Fade helper
  function fadeIn() {
    video.style.opacity = 1;
  }

  function fadeOut(callback) {
    video.style.opacity = 0;
    setTimeout(callback, 1000); // Wait for fade to finish (1s)
  }

  function playNext() {
    video.src = videoSources[currentIndex];
    video.load();

    // Fade out current video, then load the next
    fadeOut(() => {
      video.play().then(() => fadeIn());
    });

    currentIndex = (currentIndex + 1) % videoSources.length;
  }

  video.addEventListener("ended", playNext);

  adsContainer.innerHTML = "";
  adsContainer.appendChild(video);
  playNext(); // Start playing
}
