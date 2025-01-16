const formChangeMulti = document.querySelector('form[form-change-multi]');
const inputCheckAll = document.querySelector('input[name="checkall"]');
const inputCheckId = document.querySelectorAll('input[name="checkid"]');
const inputIds = formChangeMulti.querySelector('input[name="ids"]');
const ids = [];

// Handle check all
if (inputCheckAll) {
  inputCheckAll.addEventListener('click', () => {
    if (inputCheckAll.checked === true && inputCheckId.length > 0) {
      inputCheckId.forEach((input) => {
        input.checked = true;
        const id = input.value;
        ids.push(id);
      });
    } else {
      inputCheckId.forEach((input) => {
        input.checked = false;
        const id = input.value;
        ids.pop(id);
      });
    }
    const idsStr = ids.join(', ');
    inputIds.value = idsStr;
  });
}

// Handle check
if (inputCheckId.length > 0) {
  inputCheckId.forEach((input) => {
    if (input) {
      input.addEventListener('click', () => {
        const inputCheckedId = document.querySelectorAll('input[name="checkid"]:checked');
        const id = input.value;

        inputCheckedId.length == inputCheckId.length
          ? (inputCheckAll.checked = true)
          : (inputCheckAll.checked = false);

        if (input.checked === true) {
          if (ids.includes(id) !== true || ids.length === 0) ids.push(id);
        } else {
          const idIdx = ids.findIndex((i) => i === id);
          ids.splice(idIdx, 1);
        }
        const idStr = ids.join(', ');
        inputIds.value = idStr;
      });
    }
  });
}
