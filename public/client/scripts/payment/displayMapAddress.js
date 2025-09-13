const inputAddress = document.querySelector('.form-inp-address');
const ul = document.querySelector('.form-map-list');
const formMap = document.querySelector('.form-map-address');
const formInputAddress = document.querySelector('.form-input-address');

const fetchAddresses = debounce(async () => {
  formMap.classList.add('show');
  const query = inputAddress.value.trim();

  if (!query) {
    ul.innerHTML = '';
    formMap.classList.remove('show');
    return;
  }

  try {
    const res = await fetch(
      `https://api.geocode.earth/v1/search?api_key=ge-2157efa2c2bb3593&text=${encodeURIComponent(
        query
      )}&limit=5&boundary.country=VN`
    );
    const data = await res.json();
    ul.innerHTML = '';

    if (data.features && data.features.length > 0) {
      data.features.forEach((feature) => {
        const li = document.createElement('li');
        const i = document.createElement('i');

        i.className = 'bi bi-geo-alt me-2';
        li.className = 'list-group-item border-0 rounded-0 form-map-item';
        li.innerHTML = i.outerHTML + feature.properties.label;
        li.value = feature.properties.label;
        ul.appendChild(li);

        handleClick();
      });
    } else {
      const li = document.createElement('li');

      li.className = 'form-map-item';
      li.textContent = 'Không tìm thấy kết quả';
      ul.appendChild(li);
    }
  } catch (err) {
    console.error(err);
  }
}, 300);

inputAddress.addEventListener('input', fetchAddresses);

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const handleClick = () => {
  const liItemList = document.querySelectorAll('.form-map-item');
  console.log(liItemList);

  liItemList.forEach((item) => {
    item.addEventListener('click', () => {
      inputAddress.value = item.textContent;
      formMap.classList.remove('show');
    });
  });
};

formInputAddress.addEventListener('mouseleave', () => {
  formMap.classList.remove('show');
});
