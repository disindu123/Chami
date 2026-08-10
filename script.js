const header = document.getElementById("header");
const topBtn = document.getElementById("topBtn");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const year = document.getElementById("year");
const cursorGlow = document.querySelector(".cursor-glow");

year.textContent = new Date().getFullYear();

function updateScrollUI() {
  const scrolled = window.scrollY > 30;
  header.classList.toggle("scrolled", scrolled);
  topBtn.classList.toggle("show", window.scrollY > 500);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: "0px 0px -40px 0px"
});

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 250)}ms`;
  observer.observe(element);
});

if (cursorGlow) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (event) => {
    const id = anchor.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();

    const headerHeight = header.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 15;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });
  });
});
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const receiver = "your-email@example.com";

    const subject = encodeURIComponent(
      `Portfolio Contact from ${name}`
    );

    const body = encodeURIComponent(
      `Hello Chamindu,\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}\n\n` +
      `Sent from Chamindu Jayakody's Portfolio`
    );

    window.location.href =
      `mailto:${receiver}?subject=${subject}&body=${body}`;
  });
                                 }
