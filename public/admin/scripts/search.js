const formSearch = document.getElementById('form-search');

if (formSearch) {
  formSearch.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = new URL(window.location.href);
    const inputSearchValue = formSearch.querySelector('.input-search').value;

    url && inputSearchValue
      ? url.searchParams.set('keyword', inputSearchValue)
      : url.searchParams.delete('keyword');

    window.location.href = url.href;
  });
}
