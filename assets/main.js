// Simple password protection
var password = prompt("Enter password:");
if (password !== "dirt") {
  document.body.innerHTML = "Access denied.";
}

// Position circle items in a ring (desktop) or vertically (mobile)
function positionCircleItems() {
  const circleWrapper = document.querySelector('.circle-wrapper');
  const container = document.querySelector('.circle');
  const allItems = document.querySelectorAll('.circle-item');

  if (!circleWrapper || allItems.length === 0) return;

  const items = Array.from(allItems);
  items.forEach((item, i) => item.dataset.order = i);

  if (window.innerWidth < 768) {
    items.forEach(item => {
      item.style.left = '';
      item.style.top = '';
      item.style.transform = '';
    });

    const sortedItems = [...items].sort((a, b) => {
      return parseInt(a.dataset.order) - parseInt(b.dataset.order);
    });

    sortedItems.forEach(item => container.appendChild(item));
    return;
  }

  const circleWidth = circleWrapper.offsetWidth;
  const circleHeight = circleWrapper.offsetHeight;
  const radius = Math.min(circleWidth, circleHeight) * 0.4;
  const angleStep = (2 * Math.PI) / items.length;

  items.forEach((item, i) => {
    const angle = i * angleStep;
    const x = Math.cos(angle) * radius + circleWidth / 2;
    const y = Math.sin(angle) * radius + circleHeight / 2;

    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.transform = 'translate(-50%, -50%)';
  });
}

window.addEventListener('DOMContentLoaded', positionCircleItems);
window.addEventListener('resize', positionCircleItems);

// Dynamic hover image based on category
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.circle-item');
  const centerpieceImg = document.getElementById('center-icon');
  const basePath = document.body.dataset.base || '';

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const category = item.getAttribute('data-category');
      if (category) {
        centerpieceImg.src = new URL(`/assets/imgs/${category}.svg`, window.location.origin).pathname;
      }
    });

    // Optional: fallback image
    // item.addEventListener('mouseleave', () => {
    //   centerpieceImg.src = `${basePath}/assets/imgs/eyes.svg`;
    // });
  });
});
