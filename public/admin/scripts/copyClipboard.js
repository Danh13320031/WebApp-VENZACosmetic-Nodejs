const btnCopyList = document.querySelectorAll('i[btn-copy]');

if (btnCopyList && btnCopyList.length > 0) {
  const time = 1000;

  btnCopyList.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const btnCopyId = e.target.getAttribute('data-id');
      const textCopyList = document.querySelectorAll('div[text-copy]');

      if (textCopyList && textCopyList.length > 0) {
        textCopyList.forEach((text) => {
          const textCopyId = text.getAttribute('data-id');

          if (btnCopyId === textCopyId) {
            navigator.clipboard.writeText(text.textContent);
            e.target.classList.add('copied');

            const setClassCopied = setTimeout(() => {
              e.target.classList.remove('copied');
              clearTimeout(setClassCopied);
            }, time);
          }
        });
      }
    });
  });
}
