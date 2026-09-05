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

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("consultationModal");

  if (!modal) return;

  // Close when clicking outside the popup
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeConsultationModal();
    }
  });

  // Close when pressing Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeConsultationModal();
    }
  });
});
