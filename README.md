# Coastal Exotics — Website

A fast, responsive, single-purpose website for **Coastal Exotics**, a supercar & hypercar members' club based in Carmel-by-the-Sea, California.

Built as a static site (plain HTML, CSS, and vanilla JavaScript) — no build step, no dependencies. It loads fast and deploys anywhere, including free GitHub Pages.

## Pages
- `index.html` — Home (hero, about, membership benefits, gallery strip, call-to-action)
- `events.html` — Events ("news coming soon" + Instagram @coastalexotics_)
- `register.html` — Membership inquiry form
- `gallery.html` — Photo gallery with full-screen lightbox
- `contact.html` — Contact form + club details

## Structure
```
website-docs/
├── index.html  events.html  register.html  gallery.html  contact.html
├── css/styles.css          # all styling + responsive design
├── js/main.js              # nav, scroll effects, lightbox, forms
├── assets/images/          # web-optimized photos, logos, favicons
├── source-images/          # original full-resolution photos + logo (backup)
├── .nojekyll               # tells GitHub Pages to serve files as-is
└── README.md
```

---

## ✅ Two things to finish setup

### 1. Wire up the forms (Formspree — free)
The Register and Contact forms are ready for [Formspree](https://formspree.io). Until configured, a form submit falls back to opening the visitor's email app.

1. Create a free account at <https://formspree.io> and add a new form.
2. Copy your form endpoint (looks like `https://formspree.io/f/abcwxyz`).
3. In **`register.html`** and **`contact.html`**, find:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   and replace `YOUR_FORM_ID` with your real ID. (You can use one form for both, or create two.)

### 2. Add your email (optional)
When you have a club email, update the placeholder `info@coastalexotics.com`:
- `data-mailto="info@coastalexotics.com"` in `register.html` and `contact.html`
- Add it to the footer / contact info if you'd like it shown publicly.

Current public contact: **Instagram @coastalexotics_** and **(831) 737-7283**.

---

## Adding more gallery photos
1. Drop new images into `assets/images/` (JPEGs, ideally ~2000px wide).
2. In `gallery.html`, copy one `<figure class="gallery-item …">` block and update the
   `data-full`, `src`, `alt`, and caption. Use grid classes `g-wide`, `g-tall`, `g-half`, or `g-sq` to size each tile.

> Tip to optimize a new photo on macOS:
> `sips -s format jpeg -s formatOptions 86 -Z 2200 input.jpg --out assets/images/name.jpg`

---

## Deploy with GitHub Pages
1. Push this folder to the repo (see below).
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Your site goes live at `https://coastalexotics.github.io/website/` (or your custom domain).

To use a custom domain (e.g. `coastalexotics.com`), add a file named `CNAME` containing the domain and set the DNS records GitHub provides.

---

© Coastal Exotics LLC.
