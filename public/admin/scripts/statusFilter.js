const btnStatusFilter = document.querySelectorAll('button[btn-status-filter]');

if (btnStatusFilter.length > 0) {
  const url = new URL(window.location.href);

  btnStatusFilter.forEach((button) => {
    if (button) {
      button.addEventListener('click', (e) => {
        const status = e.target.getAttribute('btn-status-filter');

        url && status ? url.searchParams.set('status', status) : url.searchParams.delete('status');
        window.location.href = url.href;
      });
    }
  });
}
