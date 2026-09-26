(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll('[data-copy-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target || !navigator.clipboard) return;
      try {
        await navigator.clipboard.writeText(target.innerText);
        const originalText = button.textContent;
        button.textContent = 'Copied';
        window.setTimeout(() => { button.textContent = originalText; }, 1600);
      } catch (_) {
        button.textContent = 'Select text';
      }
    });
  });
})();
