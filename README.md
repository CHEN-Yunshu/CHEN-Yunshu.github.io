# chen-yunshu.github.io

Source for my personal site: **https://chen-yunshu.github.io**

Static: no build step, no dependencies, no framework. Everything lives in
`index.html`; the five pages are tabs, not separate files.

```
index.html              all content
assets/css/style.css    template styles + a #CUSTOM ADDITIONS block at the end
assets/js/script.js     nav, project filters, language switch, email assembly
assets/images/          avatar, icons, project thumbnails, link-preview cover
```

## Editing

Text is bilingual. One element carries both languages, and the visible text
between the tags is what non-JS visitors and search engines get:

```html
<p data-i18n data-en="Hello" data-zh="你好">Hello</p>
```

Push to `main` and GitHub Pages redeploys in about a minute.

## Notes

- The email address is assembled in JavaScript at runtime, so it is not in the
  HTML source for crawlers, but it is still a normal clickable `mailto:` for humans.
- Language choice persists in `localStorage`; English is the default.
- Built on the [vCard Personal Portfolio](https://github.com/codewithsadee/vcard-personal-portfolio)
  template by codewithsadee, MIT. The original licence is kept in `LICENSE`.
