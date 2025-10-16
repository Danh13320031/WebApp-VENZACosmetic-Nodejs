window.addEventListener('beforeunload', function () {
  localStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', function () {
  const scrollPosition = localStorage.getItem('scrollPosition');
  if (scrollPosition) {
    window.scrollTo({ top: parseInt(scrollPosition), behavior: 'instant' });
    localStorage.removeItem('scrollPosition');
  }
});
