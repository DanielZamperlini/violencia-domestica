document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeButton = document.querySelector('.close-button');
  const nextButton = document.querySelector('.next-button');
  const prevButton = document.querySelector('.prev-button');
  const galleryItems = Array.from(
    document.querySelectorAll('.gallery-item img'),
  );
  let currentIndex = 0;

  function openModal(imgSrc, imgAlt, index) {
    modal.classList.add('active');
    modalImg.src = imgSrc.replace('w=800', 'w=1200');
    modalImg.alt = imgAlt;
    document.body.style.overflow = 'hidden';
    currentIndex = index;

    // Mostrar os botões de navegação
    prevButton.style.display = 'block';
    nextButton.style.display = 'block';
  }

  function closeModal() {
    modal.classList.remove('active');
    modalImg.src = '';
    modalImg.alt = '';
    document.body.style.overflow = '';

    // Esconder os botões de navegação
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    const nextImage = galleryItems[currentIndex];
    openModal(nextImage.src, nextImage.alt, currentIndex);
  }

  function showPrevImage() {
    currentIndex =
      (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const prevImage = galleryItems[currentIndex];
    openModal(prevImage.src, prevImage.alt, currentIndex);
  }

  galleryItems.forEach((img, index) => {
    img.addEventListener('click', () => {
      openModal(img.src, img.alt, index);
    });
  });

  closeButton.addEventListener('click', closeModal);
  nextButton.addEventListener('click', showNextImage);
  prevButton.addEventListener('click', showPrevImage);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  });
});
