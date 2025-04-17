const iconBar = document.querySelector('.icon-bar');
const navHeaderMobieBox = document.querySelector('.navheader-mobie-box');

if (iconBar) {
  iconBar.addEventListener('click', function () {
    const navheaderMobieBg = document.querySelector('.navheader-mobie-bg');

    if (navHeaderMobieBox && navheaderMobieBg) {
      navHeaderMobieBox.classList.toggle('active');
      navheaderMobieBg.classList.toggle('active');
    }
  });
}

if (navHeaderMobieBox) {
  navHeaderMobieBox.addEventListener('click', function () {
    const navheaderMobieBg = document.querySelector('.navheader-mobie-bg');

    navHeaderMobieBox.classList.remove('active');
    navheaderMobieBg.classList.remove('active');
  });
}
