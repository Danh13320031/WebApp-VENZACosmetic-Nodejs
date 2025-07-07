const filterFeaturedInput = document.querySelector('.filter__featured-input');

if (filterFeaturedInput) {
  filterFeaturedInput.addEventListener('change', () => {
    const url = new URL(window.location.href);
    if (filterFeaturedInput.checked === true) {
      url.searchParams.set('featured', 'true');
      window.location.href = url.href;
    } else {
      url.searchParams.delete('featured');
      window.location.href = url.href;
    }
  });
}
