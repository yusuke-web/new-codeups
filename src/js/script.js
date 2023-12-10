jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
  // ヘッダーの高さ分だけコンテンツを下げる

  $(function () {
    // ヘッダーの高さ取得
    const headerHeight = $('.js-header').height();
    $('a[href^="#"]').click(function () {
      const speed = 600;
      let href = $(this).attr('href');
      let target = $(href === '#' || href === '' ? 'html' : href);

      // スクロール位置の計算
      let position;
      if (href === '.mv') {
        // mvセクションへのリンクの場合、ヘッダーの高さは考慮しない
        position = target.offset().top;
      } else {
        // それ以外の場合、ヘッダーの高さを差し引く
        position = target.offset().top - headerHeight;
      }

      $('body,html').animate({ scrollTop: position }, speed, 'swing');
      return false;
    });
  });
});
// ハンバーガーメニュー
$(function () {
  $('.js-hamburger').on('click', function () {
    $(this).toggleClass('is-open');
    $('.js-header').addClass('header--green'); // 新しいクラスをトグルする
    $('body').addClass('active');
    //追加
    if ($(this).hasClass('is-open')) {
      openDrawer();
    } else {
      closeDrawer();
    }
  });

  // backgroundまたはページ内リンクをクリックで閉じる
  $('.js-drawer a[href]').on('click', function () {
    closeDrawer();
  });
  function closeDrawer() {
    $('body').removeClass('active');
    $('.js-header').removeClass('header--green');
    $('.js-hamburger').removeClass('is-open');

    $('.js-drawer').fadeOut();
  }
});

// resizeイベント
$(window).on('resize', function () {
  if (window.matchMedia('(min-width: 768px)').matches) {
    closeDrawer();
  }
});

function openDrawer() {
  $('.js-drawer').fadeIn();
  $('.js-hamburger').addClass('is-open');
}

function closeDrawer() {
  $('.js-drawer').fadeOut();
  $('.js-hamburger').removeClass('is-open');
  $('.js-header').removeClass('header--green');

  $('body').removeClass('active');
}
// MV スライダー
const swiper = new Swiper('.js-top-mv-swiper', {
  loop: true,
  effect: 'fade',
  speed: 3000,
  allowTouchMove: true,
  autoplay: {
    delay: 3000,
  },
});

// Top-Campaign スライダー
jQuery(function ($) {
  // リサイズ処理（PC時のみ矢印表示）
  const service_slideLength = document.querySelectorAll(
    '.js-top-campaign-swiper .swiper-slide'
  ).length;
  $(window).resize(function () {
    service_arrow();
  });
  service_arrow();
  function service_arrow() {
    if (
      window.matchMedia('(max-width: 767px)').matches ||
      service_slideLength <= 2
    ) {
      $('.js-top-campaign-arrow').hide();
    } else {
      $('.js-top-campaign-arrow').show();
    }
  }

  // Swiper
  const service_swiper = new Swiper('.js-top-campaign-swiper', {
    loop: true,
    speed: 3000,
    slidesPerView: 1.31,
    // slidesPerView: 'auto',
    spaceBetween: 24,
    // paginationClickable: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        // slidesPerView: 4.5,
        slidesPerView: 'auto',
        // loopAdditionalSlides: 4,

        spaceBetween: 40,
      },
    },

    navigation: {
      nextEl: '.top-campaign__button-next',
      prevEl: '.top-campaign__button-prev',
      clickable: true,
    },
  });
  //要素の取得とスピードの設定
  var box = $('.js-colorbox'),
    speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="color"></div>');
    var color = $(this).find($('.color')),
      image = $(this).find('img');
    var counter = 0;

    image.css('opacity', '0');
    color.css('width', '0%');
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function () {
      if (counter == 0) {
        $(this)
          .delay(200)
          .animate({ width: '100%' }, speed, function () {
            image.css('opacity', '1');
            $(this).css({ left: '0', right: 'auto' });
            $(this).animate({ width: '0%' }, speed);
          });
        counter = 1;
      }
    });
  });
});

// モーダル

// 画像を取得
var images = document.querySelectorAll('.gallery__item img');
var modal = document.querySelector('.gallery-modal');
var modalImg = document.querySelector('.modal__image'); // モーダル内の画像要素
var captionText = document.querySelector('.caption'); // キャプション要素


// 画像をクリックしたときのイベント
images.forEach(image => {
  image.onclick = function() {
    modal.classList.add('show');
    modalImg.src = this.src; // クリックされた画像のsrcを設定

    // if (this.classList.contains('js-tall')) {
    //   modalImg.classList.add('tall');
    // } else {
    //   modalImg.classList.remove('tall');
    // }
    if (this.parentElement.matches('.gallery__item:nth-of-type(6n + 1), .gallery__item:nth-of-type(6n + 6)')) {
      modalImg.classList.add('special-size');
    } else {
      modalImg.classList.remove('special-size');
    }
  }
});

// モーダルをクリックしたときに閉じる
modal.onclick = function() {
  modal.classList.remove('show');
}
