function openConsultationModal() {
  const modal = document.getElementById("consultationModal");

  if (modal) {
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

function closeConsultationModal() {
  const modal = document.getElementById("consultationModal");

  if (modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

function toggleMobileNav(btn) {
  const panel = document.getElementById("mobileNav");
  if (!panel) return;

  const isOpen = panel.classList.toggle("open");
  btn.setAttribute("aria-expanded", isOpen);
}


// ---------- events lightbox ----------

let currentEvent = null;
let currentIndex = 0;


function openLightbox(eventId) {
  const card = document.querySelector('[data-event="' + eventId + '"]');

  if (!card) return;

  const images = JSON.parse(card.getAttribute("data-images"));
  const name = card.getAttribute("data-name");

  currentEvent = {
    images: images,
    name: name
  };

  currentIndex = 0;

  renderLightbox();

  const box = document.getElementById("lightbox");

  if (box) {
    box.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}


function closeLightbox() {
  const box = document.getElementById("lightbox");

  if (box) {
    box.classList.remove("open");
  }

  document.body.style.overflow = "";
  currentEvent = null;
}


function renderLightbox() {
  if (!currentEvent) return;

  const img = document.getElementById("lightboxImg");
  const name = document.getElementById("lightboxName");
  const counter = document.getElementById("lightboxCounter");

  if (!img || !name || !counter) return;

  img.src = currentEvent.images[currentIndex];

  img.alt =
    currentEvent.name +
    " — photo " +
    (currentIndex + 1);

  name.textContent = currentEvent.name;

  counter.textContent =
    (currentIndex + 1) +
    " / " +
    currentEvent.images.length;
}


// ---------- gallery navigation ----------

function nextImage() {
  if (!currentEvent) return;

  currentIndex =
    (currentIndex + 1) %
    currentEvent.images.length;

  renderLightbox();
}


function prevImage() {
  if (!currentEvent) return;

  currentIndex =
    (currentIndex - 1 + currentEvent.images.length) %
    currentEvent.images.length;

  renderLightbox();
}


// ---------- page events ----------

document.addEventListener("DOMContentLoaded", function () {

  const modal =
    document.getElementById("consultationModal");


  // Close consultation modal when clicking outside
  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeConsultationModal();
      }
    });
  }


  // Keyboard controls
  document.addEventListener("keydown", function (event) {

    // Escape closes modals/lightbox
    if (event.key === "Escape") {
      closeConsultationModal();
      closeLightbox();
    }

    // Right arrow = next image
    if (
      currentEvent &&
      event.key === "ArrowRight"
    ) {
      nextImage();
    }

    // Left arrow = previous image
    if (
      currentEvent &&
      event.key === "ArrowLeft"
    ) {
      prevImage();
    }
  });


  // Close lightbox when clicking the background
  const box =
    document.getElementById("lightbox");

  if (box) {
    box.addEventListener("click", function (event) {
      if (event.target === box) {
        closeLightbox();
      }
    });
  }


  // ---------- gallery arrow buttons ----------

  const prevButton =
    document.querySelector(".gallery-arrow.prev");

  const nextButton =
    document.querySelector(".gallery-arrow.next");


  if (prevButton) {
    prevButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      prevImage();
    });
  }


  if (nextButton) {
    nextButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      nextImage();
    });
  }

});
