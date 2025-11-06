const filterButtonBrand = document.querySelector('.filter-button-brand');

if (filterButtonBrand) {
  filterButtonBrand.addEventListener('click', () => {
    const url = new URL(window.location.href);
    const filterBrandInputList = document.querySelectorAll('.filter-brand-input');

    let brandList = [];

    filterBrandInputList.forEach((input) => {
      if (input.checked === true) {
        brandList.push(input.value);
      }
      if (input.checked === false) {
        brandList = brandList.filter((brand) => brand !== input.value);
      }
    });

    const brandListString = brandList.join(', ');

    if (url && brandList.length > 0) {
      url.searchParams.set('brand', brandListString);
      window.location.href = url.href;
    }
  });
}
