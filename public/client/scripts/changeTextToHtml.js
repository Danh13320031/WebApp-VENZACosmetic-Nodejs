const text = document.querySelector('.text-to-html');

if (text) {
  text.innerHTML = he.decode(text.innerHTML);
}
