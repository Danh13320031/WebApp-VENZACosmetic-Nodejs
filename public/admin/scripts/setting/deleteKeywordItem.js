const keywordList = document.querySelector('.keyword-list');

keywordList.addEventListener('click', (e) => {
  if (e.target.classList.contains('keyword-delete')) {
    const keywordItem = e.target.closest('.keyword-item');
    keywordItem.remove();
  }
});
