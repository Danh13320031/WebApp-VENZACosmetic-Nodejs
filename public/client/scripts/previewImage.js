const imgInputList = document.querySelectorAll('input[input-upload-image]');
const imageUploadBox = document.querySelector('.profile-avatar-icon-box');
const imgDeleteList = document.querySelectorAll('.image-delete');

if (imgInputList.length > 0) {
  function previewImage(classUpload, file) {
    const imgUpload = document.querySelector(
      classUpload ? `.image-upload.${classUpload}` : '.image-upload'
    );
    if (file) {
      imgUpload.src = URL.createObjectURL(file);
    } else {
      const inputHidden = document.querySelector(`.input-hidden.${classUpload}`);
      imgUpload.src = inputHidden.value;
    }
  }

  if (imageUploadBox) {
    imageUploadBox.addEventListener('click', () => {
      document.querySelector('input[input-upload-image]').click();
    });
  }

  imgInputList.forEach((input) => {
    input.addEventListener('input', (e) => {
      if (e.target.classList.contains('setting-admin-logo')) {
        previewImage('setting-admin-logo', e.target.files[0]);
      } else if (e.target.classList.contains('setting-admin-favicon')) {
        previewImage('setting-admin-favicon', e.target.files[0]);
      } else if (e.target.classList.contains('setting-client-logo')) {
        previewImage('setting-client-logo', e.target.files[0]);
      } else if (e.target.classList.contains('setting-client-favicon')) {
        previewImage('setting-client-favicon', e.target.files[0]);
      } else {
        previewImage(null, e.target.files[0]);
      }
    });
  });
}

if (imgDeleteList.length > 0) {
  function deleteImage(classDelete) {
    const imgInput = document.querySelector(
      classDelete ? `input[input-upload-image].${classDelete}` : 'input[input-upload-image]'
    );
    const imgUpload = document.querySelector(
      classDelete ? `.image-upload.${classDelete}` : '.image-upload'
    );
    const inputHidden = document.querySelector(`.input-hidden.${classDelete}`);

    imgInput.value = '';
    inputHidden ? (inputHidden.value = '') : '';
    imgUpload.src = '';
  }

  imgDeleteList.forEach((imgDelete) => {
    imgDelete.addEventListener('click', (e) => {
      if (e.target.classList.contains('setting-admin-logo')) {
        deleteImage('setting-admin-logo');
      } else if (e.target.classList.contains('setting-admin-favicon')) {
        deleteImage('setting-admin-favicon');
      } else if (e.target.classList.contains('setting-client-logo')) {
        deleteImage('setting-client-logo');
      } else if (e.target.classList.contains('setting-client-favicon')) {
        deleteImage('setting-client-favicon');
      } else {
        deleteImage(null);
      }
    });
  });
}
