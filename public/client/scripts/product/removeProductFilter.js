const filterRemoveItemList = document.querySelectorAll('.filter__remove-item');

if (filterRemoveItemList.length > 0) {
  filterRemoveItemList.forEach((removeItem) => {
    if (removeItem) {
      removeItem.addEventListener('click', (e) => {
        const selectedItem = e.target.getAttribute('keyword');
        const url = new URL(window.location.href);

        switch (selectedItem) {
          case 'search':
            url.searchParams.delete('keyword');
            window.location.href = url.href;
            break;

          case 'category':
            url.searchParams.delete('category');
            window.location.href = url.href;
            break;

          case 'price':
            url.searchParams.delete('from');
            url.searchParams.delete('to');
            window.location.href = url.href;
            break;

          case 'freeship':
            url.searchParams.delete('freeship');
            window.location.href = url.href;
            break;

          case 'sale':
            url.searchParams.delete('sale');
            window.location.href = url.href;
            break;

          case 'featured':
            url.searchParams.delete('featured');
            window.location.href = url.href;
            break;

          default:
            break;
        }
      });
    }
  });
}
