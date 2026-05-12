let projectContainer = null;
let contactForm = null;
let toast = null;
let hamburger = null;
let navLinks = null;
let themeToggle = null;

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  // The CSS handles showing/hiding the icons based on data-theme attribute
}

document.addEventListener("DOMContentLoaded", () => {
  projectContainer = document.getElementById("projects-grid");
  contactForm = document.getElementById("contact-form");
  toast = document.getElementById("toast");
  hamburger = document.querySelector(".hamburger");
  navLinks = document.querySelector(".nav-links");
  themeToggle = document.getElementById("theme-toggle");

  // Initialize theme on page load
  initTheme();

  // Theme toggle event listener
  themeToggle.addEventListener("click", toggleTheme);

  // Mobile Navigation Toggle
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");

    // Animate hamburger bars
    const bars = hamburger.querySelectorAll(".bar");
    bars.forEach((bar, index) => {
      if (hamburger.classList.contains("active")) {
        if (index === 0)
          bar.style.transform = "rotate(45deg) translate(5px, 5px)";
        if (index === 1) bar.style.opacity = "0";
        if (index === 2)
          bar.style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        bar.style.transform = "none";
        bar.style.opacity = "1";
      }
    });
  });

  // Close mobile menu when clicking on a link
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");

      const bars = hamburger.querySelectorAll(".bar");
      bars.forEach((bar) => {
        bar.style.transform = "none";
        bar.style.opacity = "1";
      });
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");

      const bars = hamburger.querySelectorAll(".bar");
      bars.forEach((bar) => {
        bar.style.transform = "none";
        bar.style.opacity = "1";
      });
    }
  });

  loadProjects();
});

function escapeHTML(str) {
  if (!str) return "";
  return String(str).replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[tag] || tag,
  );
}

function loadProjects() {
  const projects = [
    {
      title: "E-commerce Store Clone",
      description:
        "A polished e-commerce clone demo with responsive product browsing, modern UI styling, and a live Vercel preview.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://exclusive-woad.vercel.app/",
    },
    {
      title: "Portfolio API",
      description:
        "A fullstack API that powers a portfolio website and handles contact form submissions.",
      tech: ["Node.js", "Express"],
      link: "#contact",
    },
    {
      title: "Flylo Portfolio Clone",
      description:
        "A modern portfolio clone inspired by Flylo, featuring sleek design, smooth animations, and responsive layout hosted on Netlify.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://ayodeji-me.netlify.app/",
    },
  ];

  projectContainer.innerHTML = projects
    .map((project) => {
      const externalAttrs = project.link.startsWith("http")
        ? 'target="_blank" rel="noreferrer noopener"'
        : "";

      return `
          <article class="card">
            <h3>${escapeHTML(project.title)}</h3>
            <p>${escapeHTML(project.description)}</p>
            <div class="badges">
              ${project.tech
                .map((item) => `<span class="badge">${escapeHTML(item)}</span>`)
                .join("")}
            </div>
            <a class="btn-secondary" href="${escapeHTML(project.link)}" ${externalAttrs}>View details</a>
          </article>
        `;
    })
    .join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}

/* Parallax movement for the floating lights in the background.
   Each light has a different speed based on its data-speed value,
   creating a layered motion effect as the page scrolls. */
function updateParallaxLights() {
  const scrollY = window.scrollY;
  document.querySelectorAll(".parallax-light").forEach((light) => {
    const speed = parseFloat(light.dataset.speed) || 0.18;
    const xOffset = Math.sin((scrollY * speed) / 250) * 18;
    const yOffset = scrollY * speed * 0.4;
    const depthScale = 1 + speed * 0.18;

    light.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) scale(${depthScale})`;
  });
}

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallaxLights();
      ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener("resize", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallaxLights();
      ticking = false;
    });
    ticking = true;
  }
});

updateParallaxLights();
