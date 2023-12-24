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
  const campaign_slideLength = document.querySelectorAll('.js-top-campaign-swiper .swiper-slide').length;
  $(window).resize(function () {
    service_arrow();
  });
  service_arrow();
  function service_arrow() {
    if (window.matchMedia('(max-width: 767px)').matches || campaign_slideLength <= 2) {
      $('.js-top-campaign-arrow').hide();
    } else {
      $('.js-top-campaign-arrow').show();
    }
  }

  // Swiper
  const campaign_swiper = new Swiper('.js-top-campaign-swiper', {
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

  // カラーボックスの設定

  //要素の取得とスピードの設定
  // const box = $('.js-colorbox'),
  //   speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  $(function () {
    let box = $('.js-colorbox');
    let speed = 700;

    box.each(function () {
      $(this).append('<div class="color"></div>');
      let color = $(this).find($('.color')),
        image = $(this).find('img');
      let executed = false; // executedフラグを追加

      image.css('opacity', '0');
      color.css('width', '0%');

      // inviewイベントを使用して背景色が画面に現れたら処理をする
      color.on('inview', function () {
        if (!executed) {
          // アニメーションが未実行の場合のみ実行
          $(this)
            .delay(200)
            .animate({ width: '100%' }, speed, function () {
              image.css('opacity', '1');
              $(this).css({ left: '0', right: 'auto' });
              $(this).animate({ width: '0%' }, speed);
            });
          executed = true; // アニメーション実行後にフラグを更新
        }
      });
    });
  });
});

// モーダル

jQuery(function ($) {
  // 画像をクリックしたときのイベント
  $('.gallery-list__item img').on('click', function () {
    $('.gallery-modal').addClass('show');
    $('.gallery-modal__image').attr('src', $(this).attr('src')); // クリックされた画像のsrcを設定

    if ($(this).parent().is('.gallery-list__item:nth-of-type(6n + 1), .gallery-list__item:nth-of-type(6n + 6)')) {
      $('.gallery-modal__image').addClass('special-size');
    } else {
      $('.gallery-modal__image').removeClass('special-size');
    }
  });

  // モーダルをクリックしたときに閉じる
  $('.gallery-modal').on('click', function (event) {
    // イベントが発生した要素がモーダル自体であるか確認
    if (event.target === this) {
      $(this).removeClass('show');
    }
  });
});

// information タブ切り替え

$(function () {
  const tabButton = $('.js-tab-button'),
    tabContent = $('.js-tab-content');
  tabButton.on('click', function () {
    let index = tabButton.index(this);

    tabButton.removeClass('is-active');
    $(this).addClass('is-active');
    tabContent.removeClass('is-active');
    tabContent.eq(index).addClass('is-active');
  });
});

// Blog アコーディオン

$(function () {
  $('.js-accordion__item:first-child .js-accordion__content').css('display', 'block');
  $('.js-accordion__item:first-child .js-accordion__title').addClass('is-open');
  $('.js-accordion__title').on('click', function () {
    $(this).toggleClass('is-open');
    $(this).next().slideToggle(300);
  });
});

// Topへ戻るボタン
$(function () {
  const pageTop = $('.page-top');
  pageTop.hide(); // 最初はボタンを非表示にする
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      // 100pxスクロールしたら表示
      pageTop.fadeIn(); // 100px以上スクロールしたらボタンをフェードイン
    } else {
      pageTop.fadeOut(); // 100px以下になったらボタンをフェードアウト
    }
  });
  pageTop.click(function () {
    $('body,html').animate(
      {
        scrollTop: 0, // 上から0pxの位置に戻る
      },
      500 // 500ミリ秒かけて戻る
    );
    return false;
  });
});
