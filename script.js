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

// galeria

const carrosel = document.querySelector('.carrosel');
const carroselInner = document.querySelector('.carrosel-inner');
const imgs = document.querySelectorAll('.img-carrosel');

// Clona as imagens para criar o efeito de loop infinito
imgs.forEach((img) => {
  const clone = img.cloneNode(true);
  carroselInner.appendChild(clone);
});

// Rolagem automática
let scrollAmount = 0;
function autoScroll() {
  carrosel.scrollLeft += 1; // Move o carrossel lentamente
  if (carrosel.scrollLeft >= carrosel.scrollWidth - carrosel.offsetWidth) {
    carrosel.scrollLeft = 0; // Reinicia quando chegar ao final
  }
}

// Inicia o auto-scroll
const interval = setInterval(autoScroll, 20);

// Pausa o auto-scroll enquanto o usuário interage
carrosel.addEventListener('touchstart', () => clearInterval(interval));
carrosel.addEventListener('mousedown', () => clearInterval(interval));
