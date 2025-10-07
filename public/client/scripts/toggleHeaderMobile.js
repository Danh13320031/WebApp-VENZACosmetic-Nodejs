const iconBar = document.querySelector('.icon-bar');
const navHeaderMobieBox = document.querySelector('.navheader-mobie-overlay');

if (iconBar) {
  iconBar.addEventListener('click', function () {
    const navHeaderMobie = document.querySelector('.navheader-mobie');
    const navheaderMobieBg = document.querySelector('.navheader-mobie-bg');

    if (navHeaderMobieBox && navheaderMobieBg) {
      navHeaderMobie.classList.toggle('active');
      navHeaderMobieBox.classList.toggle('active');
      navheaderMobieBg.classList.toggle('active');
    }
  });
}

if (navHeaderMobieBox) {
  navHeaderMobieBox.addEventListener('click', function () {
    const navHeaderMobie = document.querySelector('.navheader-mobie');
    const navheaderMobieBg = document.querySelector('.navheader-mobie-bg');

    navHeaderMobie.classList.remove('active');
    navHeaderMobieBox.classList.remove('active');
    navheaderMobieBg.classList.remove('active');
  });
}
