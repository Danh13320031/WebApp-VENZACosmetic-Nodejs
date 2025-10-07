$(document).ready(function () {
  $('.herobanner-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow:
      '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
    nextArrow:
      '<button class="slick-arrow slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
  });

  $('.card-feature-slider').slick({
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow:
      '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
    nextArrow:
      '<button class="slick-arrow slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          loop: true,
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
          loop: true,
          speed: 300,
          prevArrow:
            '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
          nextArrow:
            '<button class="slick-arrow slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          loop: true,
          speed: 300,
          prevArrow:
            '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
          nextArrow:
            '<button class="slick-arrow slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
        },
      },
    ],
  });

  $('.card-sale-slider').slick({
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

  $('.card-related-slide').slick({
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
