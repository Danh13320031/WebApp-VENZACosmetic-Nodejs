const formSearch = document.getElementById('form-search');
const buttonRemoveSearch = document.querySelector('.btn-remove-search');

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

if (buttonRemoveSearch) {
  buttonRemoveSearch.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('keyword');
    window.location.href = url.href;
  });
}
