// galeria
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeButton = document.querySelector('.close-button');
  const galleryItems = document.querySelectorAll('.gallery-item img');

  function openModal(imgSrc, imgAlt) {
    modal.classList.add('active');
    modalImg.src = imgSrc.replace('w=800', 'w=1200');
    modalImg.alt = imgAlt;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modalImg.src = '';
    modalImg.alt = '';
    document.body.style.overflow = '';
  }

  galleryItems.forEach((img) => {
    img.addEventListener('click', () => {
      openModal(img.src, img.alt);
    });
  });

  closeButton.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});
