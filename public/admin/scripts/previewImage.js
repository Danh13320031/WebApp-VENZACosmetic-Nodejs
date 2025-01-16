const formCreateProduct = document.getElementById('form-handle');

if (formCreateProduct) {
  const imgInput = formCreateProduct.querySelector('input[input-upload-image]');
  const imgDelete = formCreateProduct.querySelector('.image-delete');
  const imgUpload = formCreateProduct.querySelector('.image-upload');

  if (imgInput) {
    imgInput.addEventListener('input', (e) => {
      const [file] = e.target.files;
      imgUpload.src = URL.createObjectURL(file);
    });
  }

  if (imgDelete) {
    imgDelete.addEventListener('click', () => {
      imgInput.value = '';
      imgUpload.src = '';
    });
  }
}
