/* ==========================================
   GARAGEM 3D — MAIN SCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- SWIPER CAROUSELS ---- */
  const baseConfig = {
    slidesPerView: 1.2,
    spaceBetween: 16,
    loop: true,
    speed: 700,
    autoplay: { delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true },
    breakpoints: {
      480:  { slidesPerView: 2   },
      768:  { slidesPerView: 3   },
      1024: { slidesPerView: 4.2 },
    },
  };

  document.querySelectorAll('.car-swiper').forEach(el => {
    new Swiper(el, { ...baseConfig });
  });

  document.querySelectorAll('.car-swiper-reverse').forEach(el => {
    new Swiper(el, {
      ...baseConfig,
      autoplay: { ...baseConfig.autoplay, reverseDirection: true },
    });
  });

  /* ---- CARROSSEL DE DEPOIMENTOS ---- */
  const testimonialsEl = document.querySelector('.testimonials-swiper');
  if (testimonialsEl) {
    new Swiper(testimonialsEl, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      speed: 600,
      autoplay: { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { el: '.testimonials-pagination', clickable: true },
      breakpoints: {
        640: { slidesPerView: 1.3 },
        900: { slidesPerView: 2 },
      },
    });
  }


  /* ---- SCROLL REVEAL ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-up').forEach((el, i) => {
    el.dataset.delay = (i % 3) * 100;
    revealObserver.observe(el);
  });


  /* ---- FAQ ACCORDION ---- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });


  /* ---- SALE NOTIFICATION ---- */
  const buyers = [
    { name: 'Ana P. — São Paulo, SP',        viewers: 12 },
    { name: 'Carlos M. — Curitiba, PR',       viewers: 8  },
    { name: 'Rafael S. — Rio de Janeiro, RJ', viewers: 17 },
    { name: 'Marcos T. — Belo Horizonte, MG', viewers: 21 },
    { name: 'Juliana F. — Porto Alegre, RS',  viewers: 9  },
    { name: 'Pedro H. — Fortaleza, CE',       viewers: 14 },
    { name: 'Beatriz L. — Goiânia, GO',       viewers: 6  },
    { name: 'Rodrigo A. — Brasília, DF',      viewers: 19 },
    { name: 'Fernando C. — Recife, PE',       viewers: 11 },
    { name: 'Tatiane R. — Florianópolis, SC', viewers: 7  },
  ];

  let buyerIndex = 0;
  const notification = document.getElementById('sale-notification');
  const saleNameEl   = document.getElementById('sale-name');
  const viewersEl    = document.getElementById('sale-viewers');
  const closeBtn     = document.getElementById('close-notification');

  function showNotification() {
    const buyer = buyers[buyerIndex % buyers.length];
    saleNameEl.textContent = buyer.name;
    viewersEl.textContent  = `${buyer.viewers} pessoas no site agora`;
    notification.classList.add('visible');
    buyerIndex++;

    setTimeout(() => notification.classList.remove('visible'), 5500);
  }

  closeBtn.addEventListener('click', () => notification.classList.remove('visible'));

  setTimeout(showNotification, 3500);
  setInterval(() => {
    if (!notification.classList.contains('visible')) showNotification();
  }, 14000);


  /* ---- SMOOTH SCROLL FOR ANCHOR LINKS ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });



});
