const botao = document.querySelector('.toggle');
botao.addEventListener('click', function () {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('open');
});

const dropdownOpen = document.querySelectorAll('.dropdown');

dropdownOpen.forEach(function (item) {
  item.addEventListener('click', function () {
    this.querySelector('.dropdown-menu').classList.toggle('dropdown-menu-open');
  });
});

document.addEventListener('click', function (event) {
  // Fecha o dropdown se o clique for fora do dropdown
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');
  dropdownMenus.forEach(function (dropdownMenu) {
    if (!dropdownMenu.closest('.dropdown').contains(event.target)) {
      dropdownMenu.classList.remove('dropdown-menu-open');
    }
  });
});

// slide de fotos

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const dotsContainer = document.querySelector('.carousel-dots');

  let currentIndex = 0;
  let isTransitioning = false;
  let autoplayInterval;

  // Crie pontos
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    if (!isTransitioning && index !== currentIndex) {
      isTransitioning = true;
      currentIndex = index;
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
      resetAutoplay();
    }
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 3500);
  }

  // Eventos
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  carousel.addEventListener('transitionend', () => {
    isTransitioning = false;
  });

  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // reprodução automática
  resetAutoplay();
});
