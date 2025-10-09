const sortForm = document.getElementById('sort');

if (sortForm) {
  const url = new URL(window.location.href);
  const sortSelect = sortForm.querySelector('.sort-select');

  // Sort Option
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const sortOption = sortSelect.querySelectorAll('.sort-option');

      if (sortOption.length > 0) {
        sortOption.forEach((option) => {
          if (option.selected === true) {
            const optionValueArr = option.value.split('-');

            if (optionValueArr.length > 0 && url) {
              url.searchParams.set('sortBy', optionValueArr[0]);
              url.searchParams.set('sortType', optionValueArr[1]);
              window.location.href = url.href;
            }
          }
        });
      }
    });
  }

  // Sort Clear
  sortForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (url) {
      url.searchParams.delete('sortBy');
      url.searchParams.delete('sortType');
      window.location.href = url.href;
    }
  });
}
