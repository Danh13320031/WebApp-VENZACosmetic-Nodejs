$(document).ready(function () {
  $('.single-item').slick({
    slidesToShow: 1,
    autoplay: true,
    prevArrow:
      '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
    nextArrow:
      '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-right"></i></button>',
  });

  $('.autoplay, .card__related-autoplay').slick({
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow:
      '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
    nextArrow:
      '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-right"></i></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          speed: 300,
          prevArrow:
            '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
          nextArrow:
            '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-right"></i></button>',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          speed: 300,
          prevArrow:
            '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
          nextArrow:
            '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-right"></i></button>',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          speed: 300,
          prevArrow:
            '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
          nextArrow:
            '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-right"></i></button>',
        },
      },
    ],
  });
});
