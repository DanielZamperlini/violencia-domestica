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
