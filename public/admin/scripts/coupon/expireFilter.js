const btnExpireFilter = document.querySelectorAll('button[btn-expire-filter]');

if (btnExpireFilter.length > 0) {
  const url = new URL(window.location.href);

  btnExpireFilter.forEach((button) => {
    if (button) {
      button.addEventListener('click', (e) => {
        const expire = e.target.getAttribute('btn-expire-filter');

        url && expire ? url.searchParams.set('expire', expire) : url.searchParams.delete('expire');
        window.location.href = url.href;
      });
    }
  });
}
