document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("cardContainer");
  const card = document.getElementById("card");
  let isDragging = false;
  let isDraggingCard = false;
  let offsetX = 0;
  let offsetY = 0;
  let dragStartX = 0, dragStartY = 0;

  function isDesktop() {
    return window.innerWidth > 600;
  }

  cardContainer.addEventListener("mousedown", function (e) {
    if (!isDesktop()) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    const rect = cardContainer.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    cardContainer.style.transition = "none";
    cardContainer.style.cursor = "grabbing";
    isDraggingCard = false;
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging || !isDesktop()) return;
    if (Math.abs(e.clientX - dragStartX) > 5 || Math.abs(e.clientY - dragStartY) > 5) {
      isDraggingCard = true;
    }
    if (isDraggingCard) {
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;
      cardContainer.style.position = "fixed";
      cardContainer.style.left = x + "px";
      cardContainer.style.top = y + "px";
      cardContainer.style.zIndex = 1000;
    }
  });

  document.addEventListener("mouseup", function () {
    if (!isDesktop()) return;
    isDragging = false;
    cardContainer.style.cursor = "grab";
  });

  cardContainer.addEventListener("mouseenter", function () {
    if (isDesktop()) cardContainer.style.cursor = "grab";
  });
  cardContainer.addEventListener("mouseleave", function () {
    cardContainer.style.cursor = "";
  });

  window.addEventListener("resize", function () {
    if (!isDesktop()) {
      cardContainer.style.position = "";
      cardContainer.style.left = "";
      cardContainer.style.top = "";
      cardContainer.style.zIndex = "";
      cardContainer.style.cursor = "";
    }
  });

  card.addEventListener("mousedown", (e) => {
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    isDraggingCard = false;
  });

  card.addEventListener("mousemove", (e) => {
    if (e.buttons !== 1) return;
    if (Math.abs(e.clientX - dragStartX) > 5 || Math.abs(e.clientY - dragStartY) > 5) {
      isDraggingCard = true;
    }
  });

  card.addEventListener("click", (e) => {
    if (e.target.closest(".no-flip")) return;
    if (isDraggingCard) return;
    card.classList.toggle("flipped");
  });
});