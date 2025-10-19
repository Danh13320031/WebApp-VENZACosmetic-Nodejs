const buttonScrollToTop = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  if (scrollY > 100) {
    buttonScrollToTop.classList.add('active');
  } else {
    buttonScrollToTop.classList.remove('active');
  }
});

if (buttonScrollToTop) {
  buttonScrollToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
