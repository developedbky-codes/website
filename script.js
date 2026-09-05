function openConsultationModal() {
  document.getElementById("consultationModal").style.display = "flex";
}

function closeConsultationModal() {
  document.getElementById("consultationModal").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("consultationModal");

  if (event.target === modal) {
    closeConsultationModal();
  }
};
