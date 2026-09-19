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

## 📬 Forms → coastalexotics06@gmail.com

The Register and Contact forms email every submission to **coastalexotics06@gmail.com** using [FormSubmit](https://formsubmit.co) (free, no account needed).

**One-time activation:** the very first submission triggers an email from FormSubmit to coastalexotics06@gmail.com with an **"Activate Form"** button. Click it once — after that, every submission lands in the inbox. (Check Spam/Promotions if it doesn't show up.) Until activated, visitors are asked to email directly instead.

Public contact details on the site: **Instagram @coastalexotics_**, **(831) 737-7283**, and **coastalexotics06@gmail.com**.

To change the email later, update it in the footer of all five pages, the contact cards in `register.html` / `contact.html`, and the `action` + `data-mailto` attributes on both forms (a new address needs activating again).

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
