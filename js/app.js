const progressBar = document.querySelector(".scroll-progress");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const downloadButton = document.querySelector("[data-download]");

const updateProgress = () => {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
};

const setActiveLink = () => {
  const current = [...document.querySelectorAll("section[id]")]
    .filter((section) => section.getBoundingClientRect().top <= 140)
    .pop();

  navLinks.forEach((link) => {
    link.classList.toggle(
      "is-active",
      Boolean(current && link.getAttribute("href") === `#${current.id}`)
    );
  });
};

window.addEventListener("load", () => {
  updateProgress();
  setActiveLink();
});

window.addEventListener(
  "scroll",
  () => {
    updateProgress();
    setActiveLink();
  },
  { passive: true }
);

window.addEventListener("resize", updateProgress);

downloadButton?.addEventListener("click", () => {
  const initialLabel = downloadButton.textContent.trim();
  downloadButton.setAttribute("aria-label", "Téléchargement du CV PDF");
  downloadButton.lastChild.textContent = " Téléchargement...";

  window.setTimeout(() => {
    downloadButton.removeAttribute("aria-label");
    downloadButton.lastChild.textContent = ` ${initialLabel}`;
  }, 1600);
});
