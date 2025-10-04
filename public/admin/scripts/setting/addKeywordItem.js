const buttonAddKeyword = document.getElementById('button-add-keyword');

if (buttonAddKeyword) {
  buttonAddKeyword.addEventListener('click', () => {
    const keywordInput = document.getElementById('keyword');
    const keywordList = document.querySelector('.keyword-list');
    const keywordTitle = document.querySelectorAll('.keyword-title');

    if (keywordInput.value === '') {
      alert('Vui lòng nhập từ khóa');
      return;
    }

    for (const keyword of keywordTitle) {
      if (keyword.textContent.toLocaleLowerCase() === keywordInput.value) {
        alert('Từ khóa đã tồn tại');
        return;
      }
    }

    const keywordItem = document.createElement('li');
    keywordItem.classList.add('keyword-item');
    keywordItem.setAttribute('title', keywordInput.value);

    const html = `
      <input name="seoMetaKeyword" type="text" class="d-none" value="${keywordInput.value.toLocaleLowerCase()}" />
      <div class="btn-group">
        <button type="button" class="btn btn-primary text-nowrap keyword-title">${keywordInput.value.toLocaleLowerCase()}</button>
        <button type="button" class="btn btn-danger keyword-delete">X</button>
      </div>
    `;

    keywordItem.innerHTML = html;
    keywordList.appendChild(keywordItem);
    keywordInput.value = '';
  });
}
