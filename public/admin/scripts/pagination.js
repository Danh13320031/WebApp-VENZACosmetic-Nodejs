const pageNumber = document.querySelectorAll('button[page-number]');
const previousButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');

if (pageNumber.length > 0) {
  const url = new URL(window.location.href);

  if (previousButton) {
    previousButton.addEventListener('click', () => {
      const currentPage = Number.parseInt(url.searchParams.get('page'));
      url.searchParams.set('page', currentPage - 1);
      window.location.href = url.href;
    });
  }

  pageNumber.forEach((page) => {
    if (page) {
      page.addEventListener('click', (e) => {
        const currentPage = Number.parseInt(e.target.getAttribute('page-number'));

        url && currentPage
          ? url.searchParams.set('page', currentPage)
          : url.searchParams.set('page', 1);

        window.location.href = url.href;
      });
    }
  });

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      const currentPage = Number.parseInt(url.searchParams.get('page'));
      url.searchParams.set('page', currentPage + 1 || 2);
      window.location.href = url.href;
    });
  }
}
