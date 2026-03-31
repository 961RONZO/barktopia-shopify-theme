/* ============================================
   BARKTOPIA — PLAYGROUND THEME JS
   Animations, Cart, Mobile Menu, Nav
   ============================================ */

(function() {
  'use strict';

  const isMobile = window.innerWidth < 768;

  // ========================
  // GSAP + ScrollTrigger
  // ========================
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll Progress
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 0.3 }
      });
    }

    // Section title reveals
    document.querySelectorAll('.animate-title').forEach(function(title) {
      if (typeof SplitType !== 'undefined') {
        var split = new SplitType(title, { types: 'words' });
        gsap.from(split.words, {
          y: isMobile ? 25 : 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.04,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: title,
            start: isMobile ? 'top 88%' : 'top 82%',
            toggleActions: 'play none none none'
          }
        });
      }
    });

    // Staggered card reveals
    document.querySelectorAll('.animate-stagger').forEach(function(container) {
      var items = container.children;
      gsap.from(items, {
        y: isMobile ? 20 : 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        stagger: isMobile ? 0.05 : 0.08,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: container,
          start: isMobile ? 'top 90%' : 'top 75%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Fade-up reveals
    document.querySelectorAll('.animate-fade-up').forEach(function(el) {
      gsap.from(el, {
        y: isMobile ? 20 : 40,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: el,
          start: isMobile ? 'top 90%' : 'top 75%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Hero animation
    var heroHeadline = document.getElementById('hero-headline');
    if (heroHeadline && typeof SplitType !== 'undefined') {
      var heroTl = gsap.timeline({ delay: 0.2 });
      var heroSplit = new SplitType(heroHeadline, { types: 'words' });

      heroTl.from(heroSplit.words, {
        y: isMobile ? 30 : 50, opacity: 0,
        duration: 0.7, stagger: 0.06,
        ease: 'back.out(1.7)'
      });

      var heroDesc = document.querySelector('.hero-desc');
      if (heroDesc) heroTl.from(heroDesc, { y: 20, opacity: 0, duration: 0.5, ease: 'back.out(1.4)' }, '-=0.3');

      var heroCta = document.querySelector('.hero-cta');
      if (heroCta) heroTl.from(heroCta, { y: 20, opacity: 0, duration: 0.5, ease: 'back.out(1.4)' }, '-=0.2');

      var heroSticker = document.querySelector('.hero-sticker');
      if (heroSticker) heroTl.from(heroSticker, { scale: 0, rotation: -10, duration: 0.4, ease: 'elastic.out(1,0.5)' }, '-=0.6');

      var heroImages = document.querySelectorAll('.hero-collage img');
      if (heroImages.length) {
        heroTl.from(heroImages, {
          scale: 0.6, opacity: 0, rotation: 10,
          duration: 0.6, stagger: 0.12,
          ease: 'back.out(1.7)'
        }, '-=0.8');
      }
    }

    // Bounce-in for stickers
    document.querySelectorAll('.animate-bounce-in').forEach(function(el) {
      gsap.from(el, {
        scale: 0, rotation: -10,
        duration: 0.5,
        ease: 'elastic.out(1,0.5)',
        scrollTrigger: {
          trigger: el,
          start: isMobile ? 'top 90%' : 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.clear();
      ScrollTrigger.getAll().forEach(function(st) { st.kill(); });
    }
  }

  // ========================
  // NAV SCROLL
  // ========================
  var header = document.querySelector('.header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }, { passive: true });
  }

  // ========================
  // MOBILE MENU
  // ========================
  var menuToggle = document.querySelector('.header__hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    var menuOpen = false;
    var lines = menuToggle.querySelectorAll('span');

    menuToggle.addEventListener('click', function() {
      menuOpen = !menuOpen;
      if (menuOpen) {
        mobileMenu.classList.add('mobile-menu--open');
        if (lines[0]) { lines[0].style.transform = 'rotate(45deg) translate(2px, 2px)'; }
        if (lines[1]) { lines[1].style.transform = 'rotate(-45deg) translate(2px, -2px)'; lines[1].style.width = '20px'; }
        document.body.style.overflow = 'hidden';
      } else {
        closeMobileMenu();
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove('mobile-menu--open');
    if (menuToggle) {
      var lines = menuToggle.querySelectorAll('span');
      if (lines[0]) lines[0].style.transform = '';
      if (lines[1]) { lines[1].style.transform = ''; lines[1].style.width = ''; }
    }
    document.body.style.overflow = '';
  }

  // ========================
  // CART DRAWER
  // ========================
  var cartDrawer = document.querySelector('.cart-drawer');
  var cartOverlay = document.querySelector('.cart-drawer__overlay');
  var cartClose = document.querySelector('.cart-drawer__close');
  var cartTriggers = document.querySelectorAll('[data-cart-trigger]');

  function openCart() {
    if (cartDrawer) cartDrawer.classList.add('cart-drawer--open');
    if (cartOverlay) cartOverlay.classList.add('cart-drawer__overlay--open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('cart-drawer--open');
    if (cartOverlay) cartOverlay.classList.remove('cart-drawer__overlay--open');
    document.body.style.overflow = '';
  }

  cartTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', openCart);
  });
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // ========================
  // ADD TO CART (AJAX)
  // ========================
  document.addEventListener('submit', function(e) {
    var form = e.target;
    if (!form.matches('[data-add-to-cart-form]')) return;
    e.preventDefault();

    var submitBtn = form.querySelector('[type="submit"]');
    var originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.textContent = 'Adding...';
      submitBtn.disabled = true;
    }

    fetch('/cart/add.js', {
      method: 'POST',
      body: new FormData(form)
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (submitBtn) {
        submitBtn.textContent = 'Added! ✓';
        setTimeout(function() {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }
      // Update cart drawer
      refreshCartDrawer();
      openCart();
    })
    .catch(function(err) {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  });

  function refreshCartDrawer() {
    fetch('/cart.js')
      .then(function(res) { return res.json(); })
      .then(function(cart) {
        var itemsContainer = document.querySelector('.cart-drawer__items');
        var subtotalEl = document.querySelector('.cart-drawer__subtotal-price');
        var countEls = document.querySelectorAll('[data-cart-count]');

        // Update count badges
        countEls.forEach(function(el) {
          el.textContent = cart.item_count;
          el.style.display = cart.item_count > 0 ? '' : 'none';
        });

        // Update subtotal
        if (subtotalEl) {
          subtotalEl.textContent = '$' + (cart.total_price / 100).toFixed(2);
        }

        // Update items
        if (itemsContainer) {
          if (cart.items.length === 0) {
            itemsContainer.innerHTML = '<div class="cart-drawer__empty"><p>🛒</p><p>Your cart is empty</p></div>';
          } else {
            var html = '';
            cart.items.forEach(function(item) {
              html += '<div class="cart-item">';
              html += '<div class="cart-item__image"><img src="' + item.image + '" alt="' + item.title + '" loading="lazy"></div>';
              html += '<div class="cart-item__info">';
              html += '<p class="cart-item__title">' + item.product_title + '</p>';
              if (item.variant_title && item.variant_title !== 'Default Title') {
                html += '<p class="text-sm text-muted">' + item.variant_title + '</p>';
              }
              html += '<p class="cart-item__price">$' + (item.final_line_price / 100).toFixed(2) + '</p>';
              html += '<div class="cart-item__qty">';
              html += '<button onclick="updateCartItem(' + item.key + ', ' + (item.quantity - 1) + ')">−</button>';
              html += '<span>' + item.quantity + '</span>';
              html += '<button onclick="updateCartItem(' + item.key + ', ' + (item.quantity + 1) + ')">+</button>';
              html += '</div></div></div>';
            });
            itemsContainer.innerHTML = html;
          }
        }
      });
  }

  // Make updateCartItem available globally
  window.updateCartItem = function(key, qty) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: qty })
    })
    .then(function(res) { return res.json(); })
    .then(function() { refreshCartDrawer(); });
  };

  // ========================
  // PRODUCT PAGE — VARIANT SELECTOR
  // ========================
  var variantBtns = document.querySelectorAll('.product-page__variant-btn');
  var variantInput = document.getElementById('variant-id');
  var priceEl = document.querySelector('.product-page__price');
  var compareEl = document.querySelector('.product-page__compare-price');
  var mainImage = document.querySelector('.product-page__main-image img');

  variantBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      variantBtns.forEach(function(b) { b.classList.remove('product-page__variant-btn--selected'); });
      btn.classList.add('product-page__variant-btn--selected');

      if (variantInput) variantInput.value = btn.dataset.variantId;
      if (priceEl && btn.dataset.price) priceEl.textContent = '$' + (parseInt(btn.dataset.price) / 100).toFixed(2);
      if (compareEl && btn.dataset.comparePrice) {
        compareEl.textContent = '$' + (parseInt(btn.dataset.comparePrice) / 100).toFixed(2);
        compareEl.style.display = btn.dataset.comparePrice ? '' : 'none';
      }
      if (mainImage && btn.dataset.image) mainImage.src = btn.dataset.image;
    });
  });

  // ========================
  // PRODUCT PAGE — THUMBNAIL GALLERY
  // ========================
  var thumbs = document.querySelectorAll('.product-page__thumb');
  thumbs.forEach(function(thumb) {
    thumb.addEventListener('click', function() {
      thumbs.forEach(function(t) { t.classList.remove('product-page__thumb--active'); });
      thumb.classList.add('product-page__thumb--active');
      if (mainImage) mainImage.src = thumb.dataset.fullImage;
    });
  });

})();
