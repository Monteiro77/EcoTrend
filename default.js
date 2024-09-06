
const logo = document.getElementById('logoSite');

// Adiciona o evento de clique
logo.addEventListener('click', function() {
  window.location.assign('../../index.html');
});

const comeToPage = (url) => {
    window.location.assign(url);
}