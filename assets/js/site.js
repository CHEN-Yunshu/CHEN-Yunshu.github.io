/* nav, language switch, email assembly */

/*---------- mobile nav ----------*/
const nav = document.querySelector('[data-nav]');
document.querySelector('[data-burger]').addEventListener('click', () => nav.classList.toggle('open'));
nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });

/*---------- which section am I in ----------*/
const links = [...document.querySelectorAll('[data-nav] a[href^="#"]')];
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

/*---------- language ----------*/
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

/*---------- email, assembled at runtime so crawlers do not get it ----------*/
const USER = 'chenyunshu9';
const HOST = ['gmail', 'com'].join('.');
const address = USER + String.fromCharCode(64) + HOST;

document.querySelectorAll('[data-email]').forEach(n => { n.textContent = address; });
document.querySelectorAll('[data-email-link]').forEach(n => { n.href = 'mailto:' + address; });

/*---------- footer year ----------*/
const yearNode = document.querySelector('[data-year]');
if (yearNode) yearNode.textContent = new Date().getFullYear();
