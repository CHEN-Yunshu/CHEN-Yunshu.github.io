'use strict';

// generic toggle
const toggle = el => el.classList.toggle('active');


/*---------- sidebar (mobile) ----------*/
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
sidebarBtn.addEventListener('click', () => toggle(sidebar));


/*---------- page navigation ----------*/
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

const goToPage = name => {
  pages.forEach((page, i) => {
    const match = page.dataset.page === name;
    page.classList.toggle('active', match);
    navLinks[i].classList.toggle('active', match);
  });
  window.scrollTo(0, 0);
};

// nav order matches the article order; map by index rather than by label text
// so navigation keeps working after a language switch
navLinks.forEach((link, i) => {
  link.addEventListener('click', () => goToPage(pages[i].dataset.page));
});

// in-page jump buttons (e.g. "All 12 projects", "Get in touch")
document.querySelectorAll('[data-nav-jump]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    goToPage(btn.dataset.navJump);
  });
});


/*---------- project filter ----------*/
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

const applyFilter = value => {
  filterItems.forEach(item => {
    item.classList.toggle('active', value === 'all' || item.dataset.category === value);
  });
};

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // read the English label so filtering survives a language switch
    const value = (btn.dataset.en || btn.textContent).toLowerCase();
    applyFilter(value);
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});


/*---------- language switch ----------*/
const i18nNodes = document.querySelectorAll('[data-i18n]');
const langBtn = document.querySelector('[data-lang-toggle]');
const langLabel = document.querySelector('[data-lang-label]');

const setLang = lang => {
  i18nNodes.forEach(node => {
    const text = node.dataset[lang];
    if (text) node.innerHTML = text;
  });
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  langLabel.textContent = lang === 'zh' ? 'EN' : '中文';
  localStorage.setItem('lang', lang);
};

langBtn.addEventListener('click', () => {
  setLang(localStorage.getItem('lang') === 'zh' ? 'en' : 'zh');
});

setLang(localStorage.getItem('lang') || 'en');


/*---------- email (assembled at runtime so crawlers don't scrape it) ----------*/
const USER = 'chenyunshu9';
const HOST = ['gmail', 'com'].join('.');
const address = USER + String.fromCharCode(64) + HOST;

document.querySelectorAll('[data-email]').forEach(node => {
  node.textContent = address;
  if (node.tagName === 'A') node.href = 'mailto:' + address;
});
const emailCard = document.querySelector('[data-email-card]');
if (emailCard) emailCard.href = 'mailto:' + address;


/*---------- footer year ----------*/
const yearNode = document.querySelector('[data-year]');
if (yearNode) yearNode.textContent = new Date().getFullYear();
