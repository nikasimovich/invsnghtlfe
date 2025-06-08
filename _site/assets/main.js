function positionCircleItems() {
  const circleWrapper = document.querySelector('.circle-wrapper');
  const container = document.querySelector('.circle');
  const allItems = document.querySelectorAll('.circle-item');

  if (!circleWrapper || allItems.length === 0) return;

  // ✅ Convert NodeList to a static array
  const items = Array.from(allItems);

  // ✅ Always assign clockwise order index
  items.forEach((item, i) => {
    item.dataset.order = i;
  });

  // ✅ MOBILE: reset styles + reorder DOM based on data-order
  if (window.innerWidth < 768) {
    items.forEach(item => {
      item.style.left = '';
      item.style.top = '';
      item.style.transform = '';
    });

    // ✅ Sort and clone list before DOM manipulation
    const sortedItems = [...items].sort((a, b) => {
      return parseInt(a.dataset.order) - parseInt(b.dataset.order);
    });

    sortedItems.forEach(item => container.appendChild(item));
    return;
  }

  // ✅ DESKTOP: Circular layout
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

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.circle-item');
  const centerpieceImg = document.getElementById('center-icon');

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const category = item.getAttribute('data-category');
      if (category) {
        centerpieceImg.src = `/assets/imgs/${category}.svg`;
      }
    });

    // item.addEventListener('mouseleave', () => {
    //   centerpieceImg.src = '/assets/imgs/eyes.svg'; // fallback image
    // });
  });
});

