const botao = document.querySelector('.toggle');
botao.addEventListener('click', function () {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('open');
});
