# Palm Coast Smart Home & Handyman Services

Static marketing website for **Palm Coast Smart Home and Handyman Services** — a licensed & insured handyman and smart home business serving Palm Coast, FL.

Converted from an Express/EJS app to a fully static **HTML / CSS / JS** site (no server runtime required).

## Structure

```
index.html          Single-page site (nav, hero, trust strip, services, gallery, contact)
css/styles.css      Styles (brand palette: navy #2a5252 / orange #c8522a)
js/main.js          Mobile nav, smooth scroll, AJAX contact form
images/             Logo + work gallery (jpg + webp), grouped by category
favicon.ico
robots.txt
sitemap.xml
```

## Contact form

The form posts to **[Formsubmit.co](https://formsubmit.co)** via AJAX (no backend):

```
https://formsubmit.co/ajax/palmcoastsmarthome@gmail.com
```

> **First-run activation:** the first time the form is submitted from the live
> domain, Formsubmit sends a one-time confirmation email to
> `palmcoastsmarthome@gmail.com`. Click the link in that email once to start
> receiving submissions. A hidden `_honey` honeypot field filters bots.

## Contact info

- **Phone:** (386) 848-0879
- **Email:** palmcoastsmarthome@gmail.com
- Serving Palm Coast & surrounding communities

## Local preview

It's a static site — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy

Upload the folder contents to any static host (Hostinger, Netlify, etc.).
Root paths (`/css`, `/js`, `/images`) assume the project root is the web root.
