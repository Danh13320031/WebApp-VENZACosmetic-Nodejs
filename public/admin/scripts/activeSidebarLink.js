const sidebarLinkList = document.querySelectorAll('.sidebar-nav-link');
const pathname = window.location.href;

sidebarLinkList.forEach((sidebarLink) => {
  const sidebarLinkPathname = sidebarLink.getAttribute('href');
  if (pathname.includes(sidebarLinkPathname)) {
    sidebarLink.classList.add('active');
  } else {
    sidebarLink.classList.remove('active');
  }
});
