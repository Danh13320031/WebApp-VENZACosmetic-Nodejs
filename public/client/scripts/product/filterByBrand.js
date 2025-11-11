const filterBrandApplyButton = document.querySelector('button.filter-brand-apply-button');
const filterBrandRemoveButton = document.querySelector('button.filter-brand-remove-button');

if (filterBrandApplyButton) {
  filterBrandApplyButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    const filterBrandInputList = document.querySelectorAll('input.filter-brand-input');

    if (url && filterBrandInputList && filterBrandInputList.length > 0) {
      let brandSlugList = [];

      filterBrandInputList.forEach((input) => {
        if (input.checked) {
          brandSlugList.push(input.value);
        } else {
          brandSlugList = brandSlugList.filter((slug) => slug !== input.value);
        }
      });

      const brandSlugListString = brandSlugList.join(',');

      url.searchParams.set('brand', brandSlugListString);
      window.location.href = url.href;

      if (brandSlugList.length === 0 || brandSlugList.length === filterBrandInputList.length) {
        url.searchParams.delete('brand');
        window.location.href = url.href;
      }
    }
  });
}

if (filterBrandRemoveButton) {
  filterBrandRemoveButton.addEventListener('click', () => {
    const url = new URL(window.location.href);

    if (url) {
      url.searchParams.delete('brand');
      window.location.href = url.href;
    }
  });
}
