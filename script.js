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

  button.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );

  button.setAttribute(
    "aria-label",
    isOpen ? "Close menu" : "Open menu"
  );
}


/* Close mobile navigation when a link is clicked */

document.addEventListener("DOMContentLoaded", function () {

  const mobileNav = document.getElementById("mobileNav");

  if (!mobileNav) {
    return;
  }

  const links = mobileNav.querySelectorAll("a");

  links.forEach(function (link) {

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
   DBK AESTHETIC GALLERY
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  const gallery = document.querySelector(".gallery");

  if (!gallery) {
    return;
  }


  const slots = Array.from(
    gallery.querySelectorAll(".gallery-slot img")
  );

  const previousButton =
    gallery.querySelector(".gallery-arrow.prev");

  const nextButton =
    gallery.querySelector(".gallery-arrow.next");

  const dots =
    Array.from(
      document.querySelectorAll(".gallery-dots span")
    );


  /*
    These are the seven images in the DBK gallery.

    The first four are displayed initially.
    The arrows rotate through the remaining images.
  */

  const images = [
    {
      src: "assets/heading1.png",
      alt: "Ceremony"
    },
    {
      src: "assets/heading2.png",
      alt: "Ceremony"
    },
    {
      src: "assets/heading3.png",
      alt: "Reception"
    },
    {
      src: "assets/heading4.png",
      alt: "Reception"
    },
    {
      src: "assets/heading5.png",
      alt: "Reception"
    },
    {
      src: "assets/heading6.png",
      alt: "Groom's Suite"
    },
    {
      src: "assets/heading7.png",
      alt: "Bridal Suite"
    }
  ];


  let startIndex = 0;


  /*
    Get the number of images we want visible.

    Desktop = 4
    Tablet = 2
    Mobile = 1
  */

  function getVisibleCount() {

    if (window.innerWidth <= 700) {
      return 1;
    }

    if (window.innerWidth <= 1000) {
      return 2;
    }

    return 4;
  }


  /*
    Render the gallery.
  */

  function renderGallery() {

    const visibleCount = getVisibleCount();


    slots.forEach(function (slot, position) {

      const imageIndex =
        (startIndex + position) % images.length;

      const imageData =
        images[imageIndex];


      slot.src = imageData.src;
      slot.alt = imageData.alt;

    });


    /*
      On desktop we only use four slots.
      On tablet we use two.
      On mobile we use one.
    */

    slots.forEach(function (slot, index) {

      const parent = slot.closest(".gallery-slot");

      if (!parent) {
        return;
      }

      if (index < visibleCount) {
        parent.style.display = "block";
      } else {
        parent.style.display = "none";
      }

    });


    /*
      Two dots:
      first group / second group
    */

    if (dots.length) {

      const page =
        startIndex === 0 ? 0 : 1;

      dots.forEach(function (dot, index) {

        dot.classList.toggle(
          "active",
          index === page
        );

      });

    }

  }


  /* NEXT */

  if (nextButton) {

    nextButton.addEventListener("click", function () {

      const visibleCount = getVisibleCount();

      startIndex =
        (startIndex + visibleCount) % images.length;

      renderGallery();

    });

  }


  /* PREVIOUS */

  if (previousButton) {

    previousButton.addEventListener("click", function () {

      const visibleCount = getVisibleCount();

      startIndex =
        (startIndex - visibleCount + images.length)
        % images.length;

      renderGallery();

    });

  }


  /*
    Re-render when screen size changes.
  */

  let resizeTimer;

  window.addEventListener("resize", function () {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {

      renderGallery();

    }, 100);

  });


  renderGallery();

});


/* ============================================================
   CONSULTATION MODAL
============================================================ */

function openConsultationModal() {

  const modal =
    document.getElementById("consultationModal");

  if (!modal) {
    return;
  }

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add("modal-open");

}


function closeConsultationModal() {

  const modal =
    document.getElementById("consultationModal");

  if (!modal) {
    return;
  }

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove("modal-open");

}


/*
  Close modal when clicking outside the modal content.
*/

document.addEventListener("click", function (event) {

  const modal =
    document.getElementById("consultationModal");

  if (!modal) {
    return;
  }

  if (event.target === modal) {
    closeConsultationModal();
  }

});


/*
  Close modal with Escape.
*/

document.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {
    closeConsultationModal();
  }

});
