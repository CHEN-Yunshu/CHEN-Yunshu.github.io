/* tabs, language switch, email assembly */

/*---------- panels ----------*/
const panels = document.querySelectorAll('[data-panel]');
const tabs = document.querySelectorAll('[data-tab]');
const navEl = document.querySelector('[data-nav]');

const show = name => {
  if (![...panels].some(p => p.dataset.panel === name)) name = 'home';
  panels.forEach(p => p.classList.toggle('on', p.dataset.panel === name));
  document.querySelectorAll('[data-nav] [data-tab]').forEach(t => t.classList.toggle('on', t.dataset.tab === name));
  navEl.classList.remove('open');
  window.scrollTo(0, 0);
};

tabs.forEach(t => t.addEventListener('click', e => {
  e.preventDefault();
  const name = t.dataset.tab;
  history.replaceState(null, '', name === 'home' ? location.pathname : '#' + name);
  show(name);
}));

show(location.hash.replace('#', '') || 'home');
window.addEventListener('hashchange', () => show(location.hash.replace('#', '') || 'home'));

/*---------- mobile nav ----------*/
document.querySelector('[data-burger]').addEventListener('click', () => navEl.classList.toggle('open'));

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
  langLabel.textContent = lang === 'zh' ? 'EN' : '\u4e2d\u6587';
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
