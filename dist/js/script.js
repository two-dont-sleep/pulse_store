$(document).ready(function () {
  $('.carousel__inner').slick({
    speed: 1000,
    prevArrow: '<button type="button" class="slick-prev"><img src="../icons/chevron_left.svg" alt="Влево"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="../icons/chevron_right.svg" alt="Вправо"></button>',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          dots: true,
          arrows: false
        }
      }
    ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(link) {
    $(link).each(function (i) {
      $(this).on('click', function (evt) {
        evt.preventDefault();
        $('.catalog-item__front').eq(i).toggleClass('catalog-item__front_active')
        $('.catalog-item__back').eq(i).toggleClass('catalog-item__back_active')
      });
    });
  }

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back-link');

  //Modals

  $('[data-model=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });

  $('.modal-custom__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow')
  })

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal-custom__descr').text(
        $('.catalog-item__subtitle').eq(i).text()
      );
      $('.overlay, #order').fadeIn('slow');
    });
  });

  function validateForm(id) {
    $(id).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите своё имя",
          minlength: jQuery.validator.format("Имя должно состоять как минимум из {0} символов")
        },
        phone: {
          required: "Пожалуйста, введите свой контактный телефон",
          email: "Пожалуйста, введите номер телефона в формате +7(800)555-35-35"
        },
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Пожалуйста, введите почту в формате example@domain.ru"
        }
      }
    })
  }

  validateForm('#consultation form')
  validateForm('#order  form')
  validateForm('#consult-form')

  //Phone mask
  $('input[name=phone]').mask("+7 (999) 999-99-99")

  //Forms sending
  $('form').submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function () {
      $(this).find("input").val("");

      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn("slow")
      $('form').trigger('reset')
    });
    return false;
  });

  //Scroll and page up
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn("slow");
    } else {
      $('.pageup').fadeOut("slow");
    }
  });

  //Smooth scroll
  $("a[href=#up]").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new AOS.init();

});