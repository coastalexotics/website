/* Coastal Exotics — site interactions */
(function () {
  'use strict';

  /* ---- sticky header state ---- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile nav ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      })
    );
  }

  /* ---- scroll reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ---- lightbox gallery ---- */
  const lb = document.querySelector('.lightbox');
  if (lb) {
    const lbImg = lb.querySelector('img');
    const items = Array.from(document.querySelectorAll('[data-lightbox]'));
    let idx = 0;
    const show = (i) => {
      idx = (i + items.length) % items.length;
      const src = items[idx].getAttribute('data-full') || items[idx].querySelector('img').src;
      lbImg.src = src;
      lbImg.alt = items[idx].querySelector('img')?.alt || '';
    };
    const open = (i) => { show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
    items.forEach((it, i) => it.addEventListener('click', () => open(i)));
    lb.querySelector('.lightbox__close')?.addEventListener('click', close);
    lb.querySelector('.lightbox__nav.prev')?.addEventListener('click', () => show(idx - 1));
    lb.querySelector('.lightbox__nav.next')?.addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });
  }

  /* ---- forms (emailed via FormSubmit, mailto fallback) ---- */
  document.querySelectorAll('form[data-form]').forEach((form) => {
    const status = form.querySelector('.form-status');
    const to = form.getAttribute('data-mailto') || 'coastalexotics06@gmail.com';
    const setStatus = (msg, type) => {
      if (!status) return;
      status.textContent = msg;
      status.className = 'form-status show ' + type;
    };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const action = form.getAttribute('action') || '';
      // No endpoint configured: fall back to a pre-filled email draft.
      if (!action) {
        const subject = encodeURIComponent('Coastal Exotics — ' + (form.getAttribute('data-subject') || 'Website inquiry'));
        let body = '';
        new FormData(form).forEach((v, k) => { if (v && k[0] !== '_') body += k.replace(/_/g, ' ') + ': ' + v + '\n'; });
        window.location.href = `mailto:${to}?subject=${subject}&body=${encodeURIComponent(body)}`;
        setStatus('Opening your email app to send the message…', 'ok');
        return;
      }
      // FormSubmit's JSON endpoint lives under /ajax/; the plain URL stays as the no-JS fallback.
      const endpoint = action.includes('formsubmit.co/') && !action.includes('/ajax/')
        ? action.replace('formsubmit.co/', 'formsubmit.co/ajax/')
        : action;
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          // FormSubmit activates each referring URL separately; sending only the
          // origin lets one activation cover every form on the site.
          referrerPolicy: 'origin',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });
        const data = await res.json().catch(() => ({}));
        // FormSubmit answers 200 with success:"false" when it didn't send (e.g. before activation).
        if (res.ok && String(data.success) !== 'false') {
          form.reset();
          setStatus('Thank you — your message is on its way. We’ll be in touch shortly.', 'ok');
        } else {
          setStatus(`Something went wrong. Please email us directly at ${to}.`, 'err');
        }
      } catch (err) {
        setStatus(`Network error. Please try again or email us at ${to}.`, 'err');
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = orig; }
      }
    });
  });

  /* ---- footer year ---- */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
