const buttonSearch = document.querySelector('button[type="button"].btn-search');
const buttonRemoveSearch = document.querySelector('.btn-remove-search');

if (buttonSearch) {
  buttonSearch.addEventListener('click', () => {
    const url = new URL(window.location.href);
    const inputSearchValue = document.querySelector('input[id="input-search"].input-search').value;

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
