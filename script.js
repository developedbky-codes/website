// ---------- EVENTS LIGHTBOX ----------

let currentEvent = null;
let currentIndex = 0;

function openLightbox(eventId) {
  const card = document.querySelector('[data-event="' + eventId + '"]');

  if (!card) return;

  let images = [];

  try {
    images = JSON.parse(card.getAttribute("data-images"));
  } catch (error) {
    console.error("Could not read gallery images:", error);
    return;
  }

  if (!images.length) return;

  const name = card.getAttribute("data-name") || "Wedding";

  currentEvent = {
    images: images,
    name: name
  };

  currentIndex = 0;

  renderLightbox();

  const box = document.getElementById("lightbox");

  if (box) {
    box.classList.add("open");
    box.setAttribute("aria-hidden", "false");
  }

  document.body.style.overflow = "hidden";
}


function closeLightbox() {
  const box = document.getElementById("lightbox");

  if (box) {
    box.classList.remove("open");
    box.setAttribute("aria-hidden", "true");
  }

  document.body.style.overflow = "";
  currentEvent = null;
}


function renderLightbox() {
  if (!currentEvent) return;

  const img = document.getElementById("lightboxImg");
  const name = document.getElementById("lightboxName");
  const counter = document.getElementById("lightboxCounter");

  if (!img) return;

  img.src = currentEvent.images[currentIndex];

  img.alt =
    currentEvent.name +
    " — photo " +
    (currentIndex + 1);

  if (name) {
    name.textContent = currentEvent.name;
  }

  if (counter) {
    counter.textContent =
      (currentIndex + 1) +
      " / " +
      currentEvent.images.length;
  }
}


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


/* ---------- LIGHTBOX BUTTONS ---------- */

document.addEventListener("DOMContentLoaded", function () {

  const nextButton =
    document.querySelector(".gallery-arrow.next");

  const prevButton =
    document.querySelector(".gallery-arrow.prev");

  if (nextButton) {
    nextButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      nextImage();
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      prevImage();
    });
  }


  /* ---------- KEYBOARD ---------- */

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (!currentEvent) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextImage();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevImage();
    }

  });


  /* ---------- CLICK OUTSIDE ---------- */

  const box = document.getElementById("lightbox");

  if (box) {
    box.addEventListener("click", function (event) {

      if (event.target === box) {
        closeLightbox();
      }

    });
  }

});

/* ======================================
   CONSULTATION MODAL
   ====================================== */

function openConsultationModal() {
  const modal = document.getElementById("consultationModal");

  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeConsultationModal() {
  const modal = document.getElementById("consultationModal");

  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}


/* Close when clicking the dark area outside the box */

document.addEventListener("click", function (event) {
  const modal = document.getElementById("consultationModal");

  if (!modal) return;

  if (event.target === modal) {
    closeConsultationModal();
  }
});


/* Close with Escape */

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeConsultationModal();
  }
});
