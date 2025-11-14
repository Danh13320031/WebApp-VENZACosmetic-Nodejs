const productFlashSaleList = $('.card-flash-sale-slider');
const productFlashSaleListLength = Number.parseInt(productFlashSaleList.attr('data-length'));

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

  $('.card-brand-slider').slick({
    infinite: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: 'linear',
    slidesToShow: 5,
    autoplay: true,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    focusOnSelect: true,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          speed: 5000,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          arrows: false,
          autoplaySpeed: 0,
          cssEase: 'linear',
          focusOnSelect: true,
          pauseOnHover: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          speed: 5000,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          arrows: false,
          autoplaySpeed: 0,
          cssEase: 'linear',
          focusOnSelect: true,
          pauseOnHover: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          speed: 5000,
          slidesToShow: 2,
          infinite: true,
          autoplay: true,
          slidesToScroll: 1,
          arrows: false,
          cssEase: 'linear',
          autoplaySpeed: 0,
          focusOnSelect: true,
          pauseOnHover: false,
        },
      },
    ],
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

  $('.card-flash-sale-slider').slick({
    infinite: false,
    speed: 300,
    slidesToShow: productFlashSaleListLength > 5 ? 5 : productFlashSaleListLength,
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
          slidesToShow: 1,
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

  $('.product-review-card-sider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow:
      '<button class="slick-arrow slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
    nextArrow:
      '<button class="slick-arrow slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
  });
});
