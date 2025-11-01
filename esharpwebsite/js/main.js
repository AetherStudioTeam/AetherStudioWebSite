document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = nav ? Array.from(nav.querySelectorAll("[data-nav-link]")) : [];

  const closeNav = () => {
    if (!nav) return;
    nav.classList.remove("is-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  };

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (navLinks.length) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 960px)").matches) {
          closeNav();
        }
      });
    });
  }

  document.addEventListener("click", (event) => {
    if (!nav || !navToggle) return;
    if (!nav.classList.contains("is-open")) return;
    if (!window.matchMedia("(max-width: 960px)").matches) return;
    const target = event.target;
    if (target instanceof Node && !nav.contains(target) && !navToggle.contains(target)) {
      closeNav();
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  window.addEventListener("resize", () => {
    if (!nav) return;
    if (!window.matchMedia("(max-width: 960px)").matches) {
      nav.classList.remove("is-open");
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  const page = body.dataset.page;
  if (page && navLinks.length) {
    navLinks.forEach((link) => {
      if (link.dataset.target === page) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  const highlight = () => {
    if (window.Prism && typeof window.Prism.highlightAll === "function") {
      window.Prism.highlightAll();
    }
  };

  highlight();
});
