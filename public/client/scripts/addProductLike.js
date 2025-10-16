const btnAddFavoriteList = document.querySelectorAll('button.btn-add-favorite');

if (btnAddFavoriteList && btnAddFavoriteList.length > 0) {
  btnAddFavoriteList.forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      const formAddFavorite = document.getElementById('form-add-favorite');

      if (id && formAddFavorite) {
        formAddFavorite.action = `${formAddFavorite.action}/${id}`;
        formAddFavorite.submit();
      }
    });
  });
}
