const sidebarToggle = document.getElementById('sidebarToggle');

if (sidebarToggle) {
  const sidebarOverlay = document.getElementById('sidebar-nav-overlay');

  sidebarToggle.addEventListener('click', () => {
    const sidebarNav = document.getElementById('sidebar-nav-box');

    sidebarNav.classList.toggle('show');
    sidebarOverlay.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
  });

  sidebarOverlay.addEventListener('click', () => {
    const sidebarNav = document.getElementById('sidebar-nav-box');
    const sidebarOverlay = document.getElementById('sidebar-nav-overlay');

    sidebarNav.classList.remove('show');
    sidebarOverlay.classList.remove('show');
    document.body.classList.remove('no-scroll');
  });
}
