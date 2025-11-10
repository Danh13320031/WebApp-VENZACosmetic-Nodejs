tinymce.init({
  selector: 'textarea#detail, textarea#content, textarea.product-brand-description',
  license_key: 'gpl',
  plugins:
    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
  toolbar:
    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
});
