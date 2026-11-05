"use strict";

const navigation = document.querySelector(".primary-navigation");
const menuToggle = document.querySelector(".menu-toggle");
const form = document.querySelector("#enquiry-form");
const formStatus = document.querySelector(".form-status");
const portalDialog = document.querySelector("#portal-dialog");
const interestSelect = document.querySelector("#interest");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.documentElement.classList.add("js");

document.querySelector("#current-year").textContent = String(
  new Date().getFullYear(),
);

function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute(
    "aria-label",
    isExpanded ? "Open navigation" : "Close navigation",
  );
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a, button")) {
    closeNavigation();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeNavigation();
    menuToggle.focus();
  }
});

for (const trigger of document.querySelectorAll("[data-open-portal]")) {
  trigger.addEventListener("click", () => {
    if (typeof portalDialog.showModal === "function") {
      portalDialog.showModal();
    }
  });
}

portalDialog.addEventListener("click", (event) => {
  if (event.target === portalDialog) {
    portalDialog.close();
  }
});

document.querySelector("[data-close-portal]").addEventListener("click", () => {
  portalDialog.close();
});

for (const link of document.querySelectorAll("[data-product]")) {
  link.addEventListener("click", () => {
    interestSelect.value = link.dataset.product;
  });
}

document.querySelectorAll(".footer-disclosures details").forEach((details) => {
  const link = document.querySelector(`.footer-bottom a[href="#${details.id}"]`);
  link.addEventListener("click", () => {
    details.open = true;
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const submitButton = form.querySelector(".form-submit");
  const submitLabel = form.querySelector(".submit-label");

  submitButton.disabled = true;
  submitButton.classList.add("is-loading");
  submitButton.setAttribute("aria-busy", "true");
  submitLabel.textContent = "Preparing your demo…";
  formStatus.textContent = "";

  window.setTimeout(() => {
    submitButton.disabled = false;
    submitButton.classList.remove("is-loading");
    submitButton.removeAttribute("aria-busy");
    submitLabel.textContent = "Send an enquiry";
    formStatus.textContent =
      "Demo complete. No information has been sent or saved. A secure, consent-reviewed backend is needed before accepting real enquiries.";
  }, 650);
});

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("is-visible");
  });
}

