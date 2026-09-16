/* Hash routes keep work chapters shareable and browser history useful. */
const panels = [...document.querySelectorAll('[data-panel]')];
const nav = document.querySelector('[data-nav]');
const burger = document.querySelector('[data-burger]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const aliases = { projects: 'work', experience: 'background' };
const chapterLinks = [...document.querySelectorAll('.project-nav [data-section]')];
const chapters = [...new Set(chapterLinks.map(link => document.getElementById(link.dataset.section)).filter(Boolean))];
const progress = document.querySelector('[data-reading-progress]');
const backTop = document.querySelector('[data-back-top]');
const languageToggle = document.querySelector('[data-lang-toggle]');
const dialog = document.querySelector('.image-dialog');
const address = 'chenyunshu9' + String.fromCharCode(64) + ['gmail', 'com'].join('.');
let activeRoute = 'home';
let navigationFromClick = false;
let routeFrame;
let scrollFrame;
let zoomTrigger;
let language = 'en';
try { language = localStorage.getItem('lang') === 'zh' ? 'zh' : 'en'; } catch {}

const words = {
  en: { home: 'Home', work: 'Work', papers: 'Papers', background: 'Background', menu: 'Toggle navigation', figure: 'Enlarge figure', preview: 'Figure preview', close: 'Close figure', top: 'Back to top', copy: 'Copy email', copied: 'Email copied', failed: 'Copy unavailable — use the email link', chapters: 'Project sections' },
  zh: { home: '首页', work: '工作', papers: '论文', background: '背景', menu: '展开或收起导航', figure: '放大查看图片', preview: '图片预览', close: '关闭图片', top: '返回顶部', copy: '复制邮箱', copied: '邮箱已复制', failed: '无法复制，请使用邮箱链接', chapters: '项目目录' }
};

function focusElement(element) {
  if (!element) return;
  if (!element.matches('a, button, input, select, textarea, [tabindex]')) element.tabIndex = -1;
  element.focus({ preventScroll: true });
}

function closeNav(restoreFocus = false) {
  nav?.classList.remove('open');
  burger?.setAttribute('aria-expanded', 'false');
  if (restoreFocus) burger?.focus({ preventScroll: true });
}

function setActiveChapter(id) {
  chapterLinks.forEach(link => {
    const active = activeRoute === 'work' && link.dataset.section === id;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function updateChapter() {
  if (activeRoute !== 'work' || !chapters.length) return;
  const line = window.innerHeight * 0.28;
  let current = chapters[0];
  for (const chapter of chapters) {
    if (chapter.getBoundingClientRect().top <= line) current = chapter;
    else break;
  }
  setActiveChapter(current.id);
}

const chapterObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(updateChapter, { rootMargin: '-20% 0px -65% 0px', threshold: 0 })
  : null;

function updateScrollUI() {
  scrollFrame = undefined;
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) {
    const percent = distance > 0 ? Math.max(0, Math.min(100, window.scrollY / distance * 100)) : 0;
    progress.style.width = `${percent}%`;
  }
  if (backTop) {
    const hidden = window.scrollY < 600;
    // Move focus before hiding a control that a keyboard user has just used.
    if (hidden && document.activeElement === backTop) {
      focusElement(panels.find(panel => panel.dataset.panel === activeRoute)?.querySelector('h1'));
    }
    backTop.hidden = hidden;
  }
  if (!chapterObserver) updateChapter();
}

function scheduleScrollUI() {
  if (scrollFrame === undefined) scrollFrame = requestAnimationFrame(updateScrollUI);
}

function updateTitle() {
  document.title = activeRoute === 'home'
    ? (language === 'zh' ? '陈云舒 · AI 与软件工程师' : 'Yunshu Chen · AI & Software Engineer')
    : `${words[language][activeRoute]} · ${language === 'zh' ? '陈云舒' : 'Yunshu Chen'}`;
}

function showRoute({ focus = false, smooth = false } = {}) {
  let [name, section] = location.hash.slice(1).split('/');
  name = aliases[name] || name || 'home';
  if (!panels.some(panel => panel.dataset.panel === name)) name = 'home';
  const panel = panels.find(item => item.dataset.panel === name);
  if (!panel) return;
  const previousPanel = document.activeElement?.closest('[data-panel]');
  const focusWillHide = previousPanel && previousPanel !== panel;
  const wasZoomOpen = dialog?.open;
  if (wasZoomOpen) dialog.close();
  activeRoute = name;
  panels.forEach(item => {
    const active = item === panel;
    if (!active) item.querySelectorAll('video').forEach(video => video.pause());
    item.classList.toggle('on', active);
    item.hidden = !active;
    item.inert = !active;
  });
  document.querySelectorAll('[data-nav] [data-tab]').forEach(link => {
    const active = (aliases[link.dataset.tab] || link.dataset.tab) === name;
    link.classList.toggle('on', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  closeNav();
  chapterObserver?.disconnect();
  if (name === 'work') chapters.forEach(chapter => chapterObserver?.observe(chapter));
  else setActiveChapter(null);
  updateTitle();

  const requested = section ? document.getElementById(section) : null;
  const destination = requested?.closest('[data-panel]') === panel ? requested : null;
  cancelAnimationFrame(routeFrame);
  routeFrame = requestAnimationFrame(() => {
    if (destination) destination.scrollIntoView({ behavior: smooth && !reducedMotion.matches ? 'smooth' : 'instant', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
    if (focus || focusWillHide || wasZoomOpen) focusElement(destination?.querySelector('h2, h3, h1') || destination || panel.querySelector('h1') || panel);
    if (name === 'work') setActiveChapter(destination?.id || chapters[0]?.id);
    updateScrollUI();
  });
}

document.querySelectorAll('[data-tab], a[data-section]').forEach(link => link.addEventListener('click', event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  const name = aliases[link.dataset.tab] || link.dataset.tab || 'work';
  if (!panels.some(panel => panel.dataset.panel === name)) return;
  event.preventDefault();
  const route = name + (link.dataset.section ? '/' + link.dataset.section : '');
  if (location.hash === '#' + route) showRoute({ focus: true, smooth: true });
  else {
    navigationFromClick = true;
    location.hash = route;
  }
}));
window.addEventListener('hashchange', () => {
  const fromClick = navigationFromClick;
  navigationFromClick = false;
  showRoute({ focus: fromClick, smooth: fromClick });
});

burger?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open') || false;
  burger.setAttribute('aria-expanded', String(open));
});
burger?.addEventListener('keydown', event => {
  if (event.key !== 'ArrowDown') return;
  event.preventDefault();
  nav?.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  nav?.querySelector('a[href]')?.focus();
});
nav?.addEventListener('keydown', event => {
  const links = [...nav.querySelectorAll('a[href]')];
  const index = links.indexOf(document.activeElement);
  if (index < 0) return;
  let next;
  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % links.length;
  if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + links.length) % links.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = links.length - 1;
  if (next !== undefined) { event.preventDefault(); links[next].focus(); }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) closeNav(true);
});
document.addEventListener('pointerdown', event => {
  if (nav?.classList.contains('open') && !nav.contains(event.target) && !burger?.contains(event.target)) {
    closeNav(nav.contains(document.activeElement));
  }
});
document.addEventListener('focusin', event => {
  if (nav?.classList.contains('open') && !nav.contains(event.target) && event.target !== burger) closeNav();
});

/* English works without JavaScript; stored preferences enhance the bilingual page. */
function setLanguage(lang) {
  language = lang;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    if (element.dataset[lang] !== undefined) element.innerHTML = element.dataset[lang];
  });
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  const label = document.querySelector('[data-lang-label]');
  if (label) label.textContent = lang === 'zh' ? 'EN' : '中文';
  languageToggle?.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');
  burger?.setAttribute('aria-label', words[lang].menu);
  document.querySelector('.project-nav')?.setAttribute('aria-label', words[lang].chapters);
  document.querySelectorAll('[data-zoom]').forEach(element => element.setAttribute('aria-label', words[lang].figure));
  dialog?.setAttribute('aria-label', words[lang].preview);
  dialog?.querySelector('[data-close-zoom]')?.setAttribute('aria-label', words[lang].close);
  backTop?.setAttribute('aria-label', words[lang].top);
  document.querySelectorAll('[data-copy-email]').forEach(button => {
    button.setAttribute('aria-label', words[lang].copy);
    const copyLabel = button.querySelector('[data-copy-label]');
    if (copyLabel) {
      copyLabel.setAttribute('aria-live', 'polite');
      copyLabel.textContent = words[lang].copy;
    }
  });
  if (dialog?.open && zoomTrigger) updateFigure(zoomTrigger);
  updateTitle();
  scheduleScrollUI();
  try { localStorage.setItem('lang', lang); } catch {}
}
languageToggle?.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));

/* Native dialog keeps figures inspectable and restores the reader's focus. */
function updateFigure(button) {
  const source = button.querySelector('img');
  const target = dialog?.querySelector('img');
  if (!source || !target) return false;
  const caption = button.closest('figure')?.querySelector('figcaption')?.textContent.trim() || source.alt;
  target.src = button.dataset.zoom || source.currentSrc || source.src;
  target.alt = caption;
  const text = dialog.querySelector('p');
  if (text) text.textContent = caption;
  return true;
}
document.querySelectorAll('[data-zoom]').forEach(button => button.addEventListener('click', () => {
  if (!dialog || typeof dialog.showModal !== 'function' || !updateFigure(button)) return;
  zoomTrigger = button;
  dialog.showModal();
}));
dialog?.querySelector('[data-close-zoom]')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog?.addEventListener('close', () => {
  if (zoomTrigger?.isConnected && !zoomTrigger.closest('[hidden]')) zoomTrigger.focus({ preventScroll: true });
  zoomTrigger = undefined;
});

const copyTimers = new WeakMap();
document.querySelectorAll('[data-copy-email]').forEach(button => button.addEventListener('click', async () => {
  const label = button.querySelector('[data-copy-label]');
  let copied = false;
  try { await navigator.clipboard.writeText(address); copied = true; } catch {}
  if (label) {
    label.textContent = words[language][copied ? 'copied' : 'failed'];
    clearTimeout(copyTimers.get(button));
    copyTimers.set(button, setTimeout(() => { label.textContent = words[language].copy; }, 2400));
  }
}));
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' }));
window.addEventListener('scroll', scheduleScrollUI, { passive: true });
window.addEventListener('resize', scheduleScrollUI);
window.addEventListener('load', scheduleScrollUI);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) document.querySelectorAll('video').forEach(video => video.pause());
});
document.querySelectorAll('[data-email]').forEach(element => { element.textContent = address; });
document.querySelectorAll('[data-email-link]').forEach(element => { element.href = 'mailto:' + address; });
document.querySelectorAll('[data-year]').forEach(element => { element.textContent = new Date().getFullYear(); });
setLanguage(language);
showRoute();
