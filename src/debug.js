const loadScript = src => {
  const script = document.createElement("script");
  script.src = src;
  document.body.appendChild(script);
};

const SCRIPTS = ["https://khan.github.io/tota11y/tota11y/build/tota11y.min.js"];

document.addEventListener("DOMContentLoaded", () => {
  SCRIPTS.forEach(script => loadScript(script));
});
