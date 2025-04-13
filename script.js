const botao = document.querySelector('.toggle');
if (botao) {
  botao.addEventListener('click', function () {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open');
  });
}

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

// Código da galeria
document.addEventListener('DOMContentLoaded', function () {
  // Primeiro, verificamos se os elementos existem
  const track = document.querySelector('.galeria-track');
  if (!track) {
    console.log('Elemento .galeria-track não encontrado');
    return; // Sai da função se não encontrar o track
  }

  const prevButton = document.querySelector('.prev-btn');
  const nextButton = document.querySelector('.next-btn');
  const images = track.querySelectorAll('.img-galeria');

  if (!prevButton || !nextButton || images.length === 0) {
    console.log('Elementos necessários não encontrados');
    return; // Sai da função se não encontrar algum elemento necessário
  }

  let currentIndex = 0;
  let startX = 0;
  let currentTranslate = 0;
  let isDragging = false;
  const imagesPerView = Math.floor(
    track.clientWidth / (images[0].offsetWidth + 20),
  );

  // Atualiza a posição do track
  function updateTrackPosition(offset = 0) {
    const imageWidth = images[0].offsetWidth + 20; // largura + margem
    currentTranslate = -currentIndex * imageWidth + offset;
    track.style.transform = `translateX(${currentTranslate}px)`;

    // Atualiza estado dos botões
    prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextButton.style.opacity =
      currentIndex >= images.length - imagesPerView ? '0.5' : '1';
  }

  // Funções para touch e mouse events
  function handleTouchStart(e) {
    startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
    isDragging = true;
    track.style.transition = 'none'; // Remove transição durante o arrasto
  }

  function handleTouchMove(e) {
    if (!isDragging) return;

    e.preventDefault();
    const currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
    const diff = currentX - startX;

    // Limita o arrasto
    const imageWidth = images[0].offsetWidth + 20;
    const maxDiff = imageWidth;
    const limitedDiff = Math.max(Math.min(diff, maxDiff), -maxDiff);

    updateTrackPosition(limitedDiff);
  }

  function handleTouchEnd(e) {
    if (!isDragging) return;

    isDragging = false;
    track.style.transition = 'transform 0.5s ease'; // Restaura a transição

    const currentX = e.type === 'mouseup' ? e.pageX : e.changedTouches[0].pageX;
    const diff = currentX - startX;

    // Determina se deve mudar de slide baseado na distância do swipe
    const threshold = 100; // Distância mínima para mudar de slide

    if (diff > threshold && currentIndex > 0) {
      currentIndex--;
    } else if (
      diff < -threshold &&
      currentIndex < images.length - imagesPerView
    ) {
      currentIndex++;
    }

    updateTrackPosition();
  }

  // Botão próximo
  nextButton.addEventListener('click', () => {
    if (currentIndex < images.length - imagesPerView) {
      currentIndex++;
      updateTrackPosition();
    }
  });

  // Botão anterior
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateTrackPosition();
    }
  });

  // Adiciona eventos de touch
  track.addEventListener('touchstart', handleTouchStart);
  track.addEventListener('touchmove', handleTouchMove);
  track.addEventListener('touchend', handleTouchEnd);

  // Adiciona eventos de mouse
  track.addEventListener('mousedown', handleTouchStart);
  track.addEventListener('mousemove', handleTouchMove);
  track.addEventListener('mouseup', handleTouchEnd);
  track.addEventListener('mouseleave', handleTouchEnd);

  // Previne o comportamento padrão de arrastar imagem
  track.addEventListener('dragstart', (e) => e.preventDefault());

  // Inicializa a posição
  updateTrackPosition();

  // Atualiza quando a janela é redimensionada
  window.addEventListener('resize', () => {
    currentIndex = 0;
    updateTrackPosition();
  });
});
