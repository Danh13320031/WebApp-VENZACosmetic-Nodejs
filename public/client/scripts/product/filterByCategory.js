const filterCategoryLink = document.querySelectorAll('.filter-category-link');

if (filterCategoryLink.length > 0) {
  filterCategoryLink.forEach((categoryItem) => {
    categoryItem.addEventListener('click', (e) => {
      e.target.parentNode.classList.toggle('active');
      const categoryTitle = categoryItem.getAttribute('category');
      const url = new URL(window.location.href);

      url.searchParams.set('category', categoryTitle);
      window.location.href = url.href;
    });
  });
}
