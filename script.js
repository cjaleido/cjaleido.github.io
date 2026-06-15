// Navigation toggle
const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector("#navLinks");
const year = document.querySelector("#year");

// Set current year
year.textContent = new Date().getFullYear();

// Mobile nav toggle
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close nav on link click
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Intersection Observer for reveal animations
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -100px 0px"
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Chat functionality
const chatWindow = document.querySelector("#chatWindow");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const promptButtons = document.querySelectorAll("[data-prompt]");

const answers = [
  {
    keys: ["service", "offer", "do"],
    answer:
      "CJ can help with graphic design, virtual assistance, customer support, research, admin tasks, and clean website presentation."
  },
  {
    keys: ["process", "how", "work"],
    answer:
      "The process is simple: understand the problem, organize the content, create a clean first version, review what feels unclear, then improve it step by step."
  },
  {
    keys: ["experience", "background"],
    answer:
      "CJ has experience across customer service, design support, admin work, content review, and practical business support."
  },
  {
    keys: ["contact", "email", "hire"],
    answer:
      "You can contact CJ through the email button in the contact section. Replace it later with a full contact form when ready."
  }
];

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  message.setAttribute("role", "article");
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getAnswer(question) {
  const lowerQuestion = question.toLowerCase();
  const match = answers.find((item) =>
    item.keys.some((key) => lowerQuestion.includes(key))
  );

  if (match) return match.answer;

  return "Good question. This starter portfolio can be expanded with more project details, case studies, testimonials, and real client examples.";
}

function sendQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;

  addMessage(cleanQuestion, "user");
  chatInput.value = "";

  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const delay = prefersReducedMotion ? 0 : 360;

  window.setTimeout(() => {
    addMessage(getAnswer(cleanQuestion), "bot");
  }, delay);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendQuestion(chatInput.value);
});

prompButton.forEach((button) => {
  button.addEventListener("click", () => {
    sendQuestion(button.dataset.prompt);
  });
});

// Performance optimization: Lazy load images when in viewport
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.tagName === "IMG" && img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => imageObserver.observe(img));
}

// Detect touch device for better UX
const isTouchDevice = () => {
  return (typeof window !== "undefined" &&
    ("ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0));
};

if (isTouchDevice()) {
  document.body.classList.add("touch-device");
}

// Log performance metrics
if (window.performance && window.performance.measure) {
  window.addEventListener("load", () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
  });
}