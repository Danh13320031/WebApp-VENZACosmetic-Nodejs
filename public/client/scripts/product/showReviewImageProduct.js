const reviewImageBtn = document.querySelectorAll('div[preview-image]');
const reviewImageOverlay = document.querySelector('div[preview-image-overlay]');

if (reviewImageBtn && reviewImageBtn.length > 0) {
  reviewImageBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      const reviewImageBox = document.querySelector('div[preview-image-box]');
      if (reviewImageBox) {
        reviewImageBox.classList.add('active');
        document.body.classList.toggle('no-scroll');
      }
    });
  });
}

if (reviewImageOverlay) {
  reviewImageOverlay.addEventListener('click', () => {
    const reviewImageBox = document.querySelector('div[preview-image-box]');
    if (reviewImageBox) {
      reviewImageBox.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
}
