$(document).ready(function () {
  $('.single-item').slick({
    slidesToShow: 1,
    autoplay: true,
  });

  $('.autoplay').slick({
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          speed: 300,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          speed: 300,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          speed: 300,
        },
      },
    ],
  });

  const buttonPre = document.querySelectorAll('.button-trans .slick-arrow.slick-prev');
  const buttonNext = document.querySelectorAll('.button-trans .slick-arrow.slick-next');

  buttonPre.forEach((btn) => {
    btn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  });
  buttonNext.forEach((btn) => {
    btn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  });
});
