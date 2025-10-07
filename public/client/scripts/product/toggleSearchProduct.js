const iconSearchMobie = document.querySelector('.icon-search');

if (iconSearchMobie) {
  iconSearchMobie.addEventListener('click', function () {
    const headerMobieSearchBox = document.querySelector('.header-mobie-search-box');
    headerMobieSearchBox.classList.toggle('active');
  });
}

const iconCloseSearchMobie = document.querySelector('.header-mobie-search-close');

if (iconCloseSearchMobie) {
  iconCloseSearchMobie.addEventListener('click', function () {
    const headerMobieSearchBox = document.querySelector('.header-mobie-search-box');
    headerMobieSearchBox.classList.remove('active');
  });
}
