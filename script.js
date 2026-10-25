/* ============================================================
   DEVELOPEDBYK — SITE JAVASCRIPT
============================================================ */


/* ============================================================
   MOBILE NAVIGATION
============================================================ */

function toggleMobileNav(button) {

  const nav = document.getElementById("mobileNav");

  if (!nav) {
    return;
  }

  const isOpen = nav.classList.toggle("open");

  button.setAttribute("aria-expanded", isOpen ? "true" : "false");
  button.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}


/* Close mobile navigation when a link is clicked */

document.addEventListener("DOMContentLoaded", function () {

  const mobileNav = document.getElementById("mobileNav");

  if (!mobileNav) {
    return;
  }

  mobileNav.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

      mobileNav.classList.remove("open");

      const toggle = document.querySelector(".nav-toggle");

      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }

    });

  });

});


/* ============================================================
   LIGHTBOX
   Shared by the Classics events and the DBK Aesthetic gallery.
============================================================ */

let lightboxImages = [];
let lightboxIndex = 0;
let lightboxTitle = "";


function getLightbox() {
  return document.getElementById("lightbox");
}


function isLightboxOpen() {
  const box = getLightbox();
  return !!box && box.classList.contains("open");
}


function renderLightbox() {

  const box = getLightbox();

  if (!box || !lightboxImages.length) {
    return;
  }

  const current = lightboxImages[lightboxIndex];

  const img = document.getElementById("lightboxImg");
  const name = document.getElementById("lightboxName");
  const counter = document.getElementById("lightboxCounter");

  img.src = current.src;
  img.alt = current.alt || lightboxTitle;

  if (name) {
    name.textContent = lightboxTitle;
  }

  if (counter) {
    counter.textContent =
      (lightboxIndex + 1) + " / " + lightboxImages.length;
  }

  box.classList.toggle("single", lightboxImages.length < 2);
}


function showLightbox(images, index, title) {

  const box = getLightbox();

  if (!box || !images.length) {
    return;
  }

  lightboxImages = images;
  lightboxIndex = index;
  lightboxTitle = title || "";

  renderLightbox();

  box.classList.add("open");
  box.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}


/* Classics: open an event by its data-event id */

function openLightbox(eventId) {

  const card = document.querySelector(
    '.gallery-card[data-event="' + eventId + '"]'
  );

  if (!card) {
    return;
  }

  let sources = [];

  try {
    sources = JSON.parse(card.getAttribute("data-images"));
  } catch (error) {
    console.error("Could not read event images.", error);
    return;
  }

  const title = card.getAttribute("data-name") || "";

  const images = sources.map(function (src) {
    return { src: src, alt: title };
  });

  showLightbox(images, 0, title);
}


function closeLightbox() {

  const box = getLightbox();

  if (!box) {
    return;
  }

  box.classList.remove("open");
  box.setAttribute("aria-hidden", "true");

  document.getElementById("lightboxImg").src = "";

  /* Only unlock the page if the consultation modal is not also open */
  const modal = document.getElementById("consultationModal");

  if (!modal || !modal.classList.contains("open")) {
    document.body.classList.remove("modal-open");
  }
}


function nextImage() {

  if (lightboxImages.length < 2) {
    return;
  }

  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  renderLightbox();
}


function prevImage() {

  if (lightboxImages.length < 2) {
    return;
  }

  lightboxIndex =
    (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;

  renderLightbox();
}


/* Click the dark area around the photo to close */

document.addEventListener("click", function (event) {

  const box = getLightbox();

  if (!box || !box.classList.contains("open")) {
    return;
  }

  if (
    event.target === box ||
    event.target.classList.contains("lightbox-stage") ||
    event.target.classList.contains("lightbox-image-wrap")
  ) {
    closeLightbox();
  }

});


/* Swipe left / right on touch screens */

(function () {

  let startX = null;

  document.addEventListener("touchstart", function (event) {

    if (!isLightboxOpen()) {
      return;
    }

    startX = event.changedTouches[0].clientX;

  }, { passive: true });

  document.addEventListener("touchend", function (event) {

    if (!isLightboxOpen() || startX === null) {
      return;
    }

    const distance = event.changedTouches[0].clientX - startX;

    startX = null;

    if (Math.abs(distance) < 50) {
      return;
    }

    if (distance < 0) {
      nextImage();
    } else {
      prevImage();
    }

  }, { passive: true });

})();


/* ============================================================
   DBK AESTHETIC GALLERY (home page)
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  const gallery = document.querySelector(".gallery");

  if (!gallery) {
    return;
  }

  const slots = Array.from(
    gallery.querySelectorAll(".gallery-slot img")
  );

  const previousButton = gallery.querySelector(".gallery-arrow.prev");
  const nextButton = gallery.querySelector(".gallery-arrow.next");

  const dots = Array.from(
    document.querySelectorAll(".gallery-dots span")
  );


  /*
    The seven images in the DBK gallery.
    Desktop shows four at a time, the arrows rotate through the rest,
    and clicking any image opens it full size.
  */

  const images = [
    { src: "assets/heading1.png", alt: "Ceremony" },
    { src: "assets/heading2.png", alt: "Ceremony" },
    { src: "assets/heading3.png", alt: "Reception" },
    { src: "assets/heading4.png", alt: "Reception" },
    { src: "assets/heading5.png", alt: "Reception" },
    { src: "assets/heading6.png", alt: "Groom's Suite" },
    { src: "assets/heading7.png", alt: "Bridal Suite" }
  ];

  let startIndex = 0;


  /* Desktop = 4, tablet = 2, mobile = 1 */

  function getVisibleCount() {

    if (window.innerWidth <= 700) {
      return 1;
    }

    if (window.innerWidth <= 1100) {
      return 2;
    }

    return 4;
  }


  function renderGallery() {

    const visibleCount = getVisibleCount();

    slots.forEach(function (slot, position) {

      const imageIndex = (startIndex + position) % images.length;
      const imageData = images[imageIndex];

      slot.src = imageData.src;
      slot.alt = imageData.alt;

      const parent = slot.closest(".gallery-slot");

      if (!parent) {
        return;
      }

      parent.dataset.index = imageIndex;
      parent.setAttribute("aria-label", "View full image: " + imageData.alt);
      parent.style.display = position < visibleCount ? "block" : "none";

    });

    if (dots.length) {

      const page = startIndex === 0 ? 0 : 1;

      dots.forEach(function (dot, index) {
        dot.classList.toggle("active", index === page);
      });

    }

  }


  /* CLICK AN IMAGE TO SEE IT FULL SIZE */

  slots.forEach(function (slot) {

    const parent = slot.closest(".gallery-slot");

    if (!parent) {
      return;
    }

    parent.addEventListener("click", function () {

      showLightbox(
        images,
        parseInt(parent.dataset.index, 10) || 0,
        "The DBK Aesthetic"
      );

    });

  });


  if (nextButton) {

    nextButton.addEventListener("click", function () {

      startIndex = (startIndex + getVisibleCount()) % images.length;
      renderGallery();

    });

  }


  if (previousButton) {

    previousButton.addEventListener("click", function () {

      startIndex =
        (startIndex - getVisibleCount() + images.length) % images.length;

      renderGallery();

    });

  }


  let resizeTimer;

  window.addEventListener("resize", function () {

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderGallery, 100);

  });


  renderGallery();

});


/* ============================================================
   CONSULTATION MODAL
============================================================ */

function openConsultationModal() {

  const modal = document.getElementById("consultationModal");

  if (!modal) {
    console.error("Consultation modal not found.");
    return;
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}


function closeConsultationModal() {

  const modal = document.getElementById("consultationModal");

  if (!modal) {
    return;
  }

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}


/* Close when clicking outside the modal box */

document.addEventListener("click", function (event) {

  const modal = document.getElementById("consultationModal");

  if (modal && event.target === modal) {
    closeConsultationModal();
  }

});


/* ============================================================
   KEYBOARD: ESCAPE + ARROW KEYS
============================================================ */

document.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {
    closeConsultationModal();
    closeLightbox();
    return;
  }

  if (!isLightboxOpen()) {
    return;
  }

  if (event.key === "ArrowRight") {
    nextImage();
  }

  if (event.key === "ArrowLeft") {
    prevImage();
  }

});
