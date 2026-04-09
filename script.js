const projectContainer = document.getElementById("projects-grid");
const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

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

async function loadProjects() {
  try {
    const response = await fetch("/api/projects");
    const projects = await response.json();

    projectContainer.innerHTML = projects
      .map((project) => {
        const externalAttrs = project.link.startsWith("http")
          ? 'target="_blank" rel="noreferrer noopener"'
          : "";

        return `
          <article class="card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="badges">
              ${project.tech.map((item) => `<span class="badge">${item}</span>`).join("")}
            </div>
            <a class="btn-secondary" href="${project.link}" ${externalAttrs}>View details</a>
          </article>
        `;
      })
      .join("");
  } catch (error) {
    projectContainer.innerHTML =
      '<p class="lead">Unable to load projects right now. Please try again later.</p>';
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  // Show loading state
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to send message");
    }

    // Success
    contactForm.reset();
    showToast("✅ " + data.message);
  } catch (error) {
    // Error
    console.error("Contact form error:", error);
    showToast(
      "❌ " + (error.message || "Failed to send message. Please try again."),
    );
  } finally {
    // Reset button state
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
});

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

window.addEventListener("scroll", updateParallaxLights);
window.addEventListener("resize", updateParallaxLights);
updateParallaxLights();

loadProjects();
