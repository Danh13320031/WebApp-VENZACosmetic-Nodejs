const inputImageArray = document.querySelectorAll('input[input-image-array]');
const imageDeleteArray = document.querySelectorAll('.image-delete-array');

if (inputImageArray.length > 0) {
  const previewImage = (classUpload, file) => {
    const imageUpload = document.querySelector(`.image-upload-array.${classUpload}`);

    console.log(classUpload, file);

    if (file) {
      imageUpload.src = URL.createObjectURL(file);
    } else {
      const inputHidden = document.querySelector(`.input-hidden-array.${classUpload}`);
      imageUpload.src = inputHidden.value;
    }
  };

  inputImageArray.forEach((input) =>
    input.addEventListener('input', (e) => {
      const dataOrder = e.target.getAttribute('data-order');
      previewImage(`product-image-item-${dataOrder}`, e.target.files[0]);
    })
  );
}

if (imageDeleteArray.length > 0) {
  imageDeleteArray.forEach((imageDelete) =>
    imageDelete.addEventListener('click', (e) => {
      const dataOrder = e.target.getAttribute('data-order');
      const imageUpload = document.querySelector(
        `.image-upload-array.product-image-item-${dataOrder}`
      );
      const inputHidden = document.querySelector(
        `.input-hidden-array.product-image-item-${dataOrder}`
      );

      imageUpload.value = '';
      inputHidden ? (inputHidden.value = '') : '';
      imageUpload.src = '';
    })
  );
}
