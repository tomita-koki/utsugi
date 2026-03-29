// -----------------------------------------
// Personal サブメニュー
// -----------------------------------------
const personalNav = () => {
  const items = document.querySelectorAll('.container__item--hasChild');
  if (!items.length) return;

  items.forEach((item) => {
    const subList = item.querySelector('.container__subList');
    if (!subList) return;

    // ▼ 追加：サブメニューの中のリスト項目(li)を取得し、順番に遅延時間を設定
    // ※タグ名 'li' は実際のHTMLに合わせて調整してください
    const subItems = subList.querySelectorAll('li'); 
    subItems.forEach((subItem, index) => {
      // 0.05秒ずつ表示タイミングをズラす
      subItem.style.transitionDelay = `${index * 0.05}s`; 
    });

    let leaveTimer;

    const show = () => {
      clearTimeout(leaveTimer);
      item.classList.add('is-active');
      subList.classList.add('is-visible');
    };

    const hide = () => {
      leaveTimer = setTimeout(() => {
        item.classList.remove('is-active');
        subList.classList.remove('is-visible');
      }, 50); // カーソルが少し外れてもすぐ消えないための猶予
    };

    item.addEventListener('mouseenter', show);
    item.addEventListener('mouseleave', hide);
    // ※ subListがitemの中に入っているHTML構造であれば、下の2行は不要な場合が多いですが、念のため残しています
    subList.addEventListener('mouseenter', show);
    subList.addEventListener('mouseleave', hide);
  });
};

document.addEventListener('DOMContentLoaded', personalNav);


// -----------------------------------------
// SP Hamburger Menu
// -----------------------------------------
const spHamburger = () => {
  const btn = document.getElementById('sp-hamburger-btn');
  const nav = document.getElementById('sp-nav');
  if (!btn || !nav) return;

  const open = () => {
    btn.classList.add('is-active');
    nav.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'メニューを閉じる');
    nav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    btn.classList.remove('is-active');
    nav.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'メニューを開く');
    nav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  btn.addEventListener('click', () => {
    btn.classList.contains('is-active') ? close() : open();
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', close);
  });
};

spHamburger();

// -----------------------------------------
// 画像表示アニメーション
// -----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => img.classList.add('fadeUp-target'));
  let delay = 0;
  const delayIncrement = 0.15;
  let resetTimeout = null;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries, observer) => {
    let triggered = false;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggered = true;
        const target = entry.target;
        target.style.animationDelay = `${delay}s`;
        target.classList.add('fadeUp-active');
        observer.unobserve(target);
        delay += delayIncrement;
      }
    });

    if (triggered) {
      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        delay = 0;
      }, 300);
    }
  }, observerOptions);

  images.forEach(img => {
    observer.observe(img);
  });
});

// -----------------------------------------
// トップカルーセル (Splide)
// -----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('top-carousel');
  if (!el) return;

  new Splide(el, {
    type       : 'fade',
    rewind     : true,
    autoplay   : true,
    interval   : 5000,
    speed      : 5000,
    arrows     : false,
    pagination : false,
    pauseOnHover: false,
  }).mount();
});