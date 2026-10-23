# EcoVedica Website

The product catalogue website for **ECOVEDICA HERBAL ENTERPRISES** (ecovedica.co.in).

It is a plain static website (HTML, CSS and JavaScript). There is no database, no server code and no build step, so it can be hosted for free. Customers browse products here and buy on Amazon, Flipkart or Meesho, or message you on WhatsApp.

---

## Chosen setup and costs

| Item | Choice | Cost |
|---|---|---|
| Website files | Static HTML/CSS/JS (this folder) | Free |
| Hosting | **GitHub Pages** (recommended) | Free for public repositories |
| Domain | Your existing GoDaddy domain `ecovedica.co.in` | Only your yearly GoDaddy renewal |
| HTTPS certificate | Issued automatically by GitHub Pages | Free |
| Fonts | Google Fonts | Free |

**Why GitHub Pages:** it is free, needs no build tools, issues HTTPS automatically, and works with a GoDaddy domain by adding DNS records in GoDaddy. You do **not** need GoDaddy hosting.

**Limitations to know:**
- On the free GitHub plan the repository must be **public**, so anyone can see the website's source files. That is normal for a public website; never put passwords or private data in these files.
- There is no online payment, cart or customer login. Orders happen on the marketplaces.
- The contact form does not store or email anything. It opens WhatsApp with the message ready to send.
- Product lists and product details are filled in by JavaScript. Google can read JavaScript pages, but no website can be promised a ranking.

**Alternative:** Cloudflare Pages is also free and lets you upload the folder by drag-and-drop. Connecting the main domain `ecovedica.co.in` there normally requires moving your domain's nameservers from GoDaddy to Cloudflare. Use it only if you're comfortable with that.

---

## What's in this folder

```
index.html                       Home page
products.html                    All products (search, filter, sort)
hair-care.html                   Category pages
skin-care.html
herbal-powders.html
traditional-beauty-ingredients.html
products/<product>.html          One page per product (14 pages)
about.html  contact.html
privacy-policy.html  terms.html  disclaimer.html
404.html                         "Page not found" page
assets/css/style.css             All styling (brand colours at the top)
assets/js/config.js              ← YOUR SETTINGS: WhatsApp, email, social links
assets/js/products.js            ← YOUR PRODUCTS: names, photos, links, prices
assets/js/main.js                Site logic (you don't need to edit this)
assets/images/                   Logo, favicon, share image, product photos
sitemap.xml  robots.txt          For search engines
CNAME                            Tells GitHub Pages your domain name
.nojekyll                        Tells GitHub Pages to serve files as-is
```

---

## Before you go live: what to fill in

When you open the site anywhere other than ecovedica.co.in, a yellow **Setup checklist** box at the bottom lists what's still missing. It disappears automatically on the live domain.

1. **WhatsApp number**: done (7742343313, set in `assets/js/config.js`).
2. **Email, phone, address and social links** in `config.js` (each one appears only after you fill it in).
3. **Logo**: done (your logo is in `assets/images/logo.png`).
4. **Product photos** for each product.
5. For each product: **availability**, **pack sizes**, and **real Amazon / Flipkart / Meesho links**. Links added so far: Amla Powder (Amazon), Rosemary Leaves (Flipkart), Phitkari (Flipkart).
6. **Review every product description** in `products.js` so it matches your actual product and pack label.
7. **Yellow `[ … ]` boxes** in `about.html`, `privacy-policy.html` and `terms.html`: replace them with your details (story, date, email, address, jurisdiction city). Have the legal pages reviewed for your business.

---

## 1. Preview the website on your computer

Easiest: open the folder and double-click `index.html`. It opens in your browser and everything works, including search and product pages.

For a preview closer to the real hosting (optional, needs Python installed):

```
cd ecovedica-site
python -m http.server 8000
```

Then open http://localhost:8000 in your browser. Press Ctrl+C to stop.

## 2. Replace the logo

1. Save your logo as **`logo.png`** (transparent background, about 400 px wide) or `logo.svg`.
2. Put it in `assets/images/`.
3. Keep the file name `logo.png` and it will be picked up automatically.
4. Optional: replace `assets/images/favicon.svg` (the browser tab icon) and `assets/images/og-image.png` (the picture shown when the site is shared on WhatsApp/Facebook, 1200 × 630 px).


## 3. Add product photos

1. Use square photos, about **1000 × 1000 px**, saved as JPG or WebP, ideally under 200 KB each (use a free tool like squoosh.app to shrink them).
2. Name them simply, e.g. `amla-powder.jpg`, and put them in `assets/images/products/`.
3. In `assets/js/products.js`, find the product and set:
   ```js
   image: "assets/images/products/amla-powder.jpg",
   ```
4. Extra photos for the gallery:
   ```js
   gallery: ["assets/images/products/amla-powder-2.jpg", "assets/images/products/amla-powder-3.jpg"],
   ```
Until a photo is added, a neat coloured placeholder is shown. If a photo file is missing or misspelled, the placeholder is shown instead of a broken image.

## 4. Add or edit products

All products live in **`assets/js/products.js`**. Each product is one `{ ... }` block. The comments at the top of that file explain every field.

**To edit:** change the values inside the product's block and save.

**To add a new product:**
1. In `products.js`, copy a whole product block from `{` to `},`, paste it at the end of the list (before the final `];`), and change every value. Give it a new `id` (e.g. `"EV-015"`) and a new `slug` (e.g. `"tulsi-powder"`).
2. In the `products` folder, copy `amla-powder.html` and rename the copy to match the slug: `tulsi-powder.html`.
3. Open the new file in a text editor and change:
   - `data-slug="amla-powder"` → `data-slug="tulsi-powder"`
   - the text inside `<title>…</title>`
   - the `content="…"` of the `description`, `og:title` and `og:description` lines
   - the two `amla-powder.html` web addresses (`canonical` and `og:url`)
4. Add one line to `sitemap.xml`:
   ```xml
   <url><loc>https://ecovedica.co.in/products/tulsi-powder.html</loc></url>
   ```

**To remove a product:** delete its block from `products.js`, delete its file in `products/`, and remove its line from `sitemap.xml`.

**Show on the homepage:** set `featured: true` (4 or 8 featured products fill the rows neatly).

**Availability:**
- `"available"`: purchase buttons appear (for links you have filled in).
- `"enquire"`: no purchase buttons; shows "Enquire for availability".
- `"unavailable"`: shows "Currently unavailable" and hides purchase buttons even if links are filled in.

**Price:** leave `price: ""` unless you're sure, because marketplace prices change. If you do add one, write it like `price: "₹199"`.

## 5. Enter Amazon, Flipkart and Meesho links

1. Open your product on the marketplace in a browser.
2. Copy the address from the address bar. Shorter is better:
   - Amazon: `https://www.amazon.in/dp/ASIN` (e.g. `https://www.amazon.in/dp/B0GW3C7W5R`)
   - Flipkart / Meesho: copy the product page address; you can remove everything after `?`
3. Paste it into the product's `links`:
   ```js
   links: {
     amazon: "https://www.amazon.in/dp/B0GW3C7W5R",
     flipkart: "https://www.flipkart.com/...",
     meesho: ""
   },
   ```
4. Make sure `availability` is `"available"`.

Empty links are hidden automatically. Each button opens in a new tab. To hide a marketplace across the whole site, set `enabled: false` for it in `config.js` → `marketplaces`.

## 6. Set the WhatsApp number

In `assets/js/config.js`:

```js
whatsappNumber: "919876543210",
```

Write it as country code + number, digits only: `91` for India, then the 10-digit mobile number. No `+`, spaces or dashes. This one setting controls every WhatsApp button on the site. Each product's button sends a prefilled message naming the product; you can customise it per product with `whatsappMessage`.

Test it: open any product page and tap **Enquire on WhatsApp**. It should open a chat with your business number.

## 7. Publish free on GitHub Pages

1. Create a free account at **github.com**.
2. Click **+** (top right) → **New repository**. Name it `ecovedica-site`, choose **Public**, click **Create repository**.
3. On the new repository page, click **uploading an existing file**. Open the `ecovedica-site` folder on your computer, select **everything inside it** (including the `assets` and `products` folders, `CNAME` and `.nojekyll`) and drag it into the browser. Click **Commit changes**.
   - Hidden files: `.nojekyll` may be hidden on your computer. On Windows enable *View → Hidden items*; on Mac press Cmd+Shift+. in Finder.
4. Go to the repository's **Settings → Pages**.
5. Under **Build and deployment**, set **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)**, and click **Save**.
6. After a minute or two the page shows your site address, like `https://yourname.github.io/ecovedica-site/`. Open it to check.

## 8. Connect ecovedica.co.in (GoDaddy)

**Don't guess DNS records.** Use the exact records GitHub lists in its official guide, because they can change:
👉 GitHub Docs → *"Managing a custom domain for your GitHub Pages site"* (docs.github.com, search for that title).

Steps:
1. In GitHub → **Settings → Pages → Custom domain**, enter `ecovedica.co.in` and click **Save**. (The `CNAME` file in this folder already contains it.)
2. Recommended: verify the domain first (GitHub Docs → *"Verifying your custom domain for GitHub Pages"*). It protects your domain from being claimed by others.
3. Sign in to **GoDaddy → My Products → ecovedica.co.in → DNS** (Manage DNS).
4. Delete any existing **A** records for `@` that point to GoDaddy "Parked" or website-builder addresses, and any existing **CNAME** for `www` (only those; leave email records such as MX and TXT alone).
5. Add the records from GitHub's guide:
   - the **A** records (and optionally **AAAA** records) for the apex domain, Name/Host `@`
   - a **CNAME** record with Name/Host `www`, pointing to your `yourname.github.io` address
6. Save and wait. DNS changes usually take from a few minutes up to 24–48 hours.
7. Back in **Settings → Pages**, the custom domain check should show a green tick.

**www or no www?** This site uses **`https://ecovedica.co.in`** (without www) as its main address in the canonical tags and sitemap. With the custom domain set to `ecovedica.co.in` and the `www` CNAME record added, GitHub automatically redirects `www.ecovedica.co.in` to `ecovedica.co.in`. If you'd rather use www as the main address, change `siteUrl` in `config.js`, the `CNAME` file, and the addresses in every page's canonical/og:url lines and in `sitemap.xml`.

If you used GoDaddy's website builder before, turn it off/unpublish it so it doesn't hold on to the domain.

## 9. Turn on HTTPS

After the domain check is green, go to **Settings → Pages** and tick **Enforce HTTPS**. If the box is greyed out, GitHub is still issuing the certificate; wait (it can take up to 24 hours) and refresh. Afterwards, check that `http://ecovedica.co.in` redirects to `https://ecovedica.co.in`.

## 10. Updating the website later

1. Edit the files on your computer (usually `products.js` or `config.js`) and check them by opening `index.html`.
2. In your GitHub repository, open the same folder, click **Add file → Upload files**, drag the changed files in (same names replace the old ones), and click **Commit changes**.
   - Or edit a file directly on GitHub: open it, click the ✏️ pencil icon, change it, then **Commit changes**.
3. The live site updates within a minute or two. Refresh with Ctrl+F5 if you still see the old version.

## After launch: search engines

1. Add the site to **Google Search Console** (free): search.google.com/search-console → add property `ecovedica.co.in` → verify using a DNS TXT record in GoDaddy.
2. Submit the sitemap: `https://ecovedica.co.in/sitemap.xml`.
3. Optional: do the same in Bing Webmaster Tools.

The pages already include titles, descriptions, canonical tags, social-sharing tags, a sitemap, robots.txt and breadcrumb data. Product rich-result data (`Product` schema) is added automatically only for products that are available, have a marketplace link and have a price you entered, so Google is never given incomplete or invented product data.

---

## What works now / what needs your input

**Working now:** all 27 pages and links; search, category filters and sorting; mobile menu; product pages with breadcrumbs, gallery and related products; Amazon button on Amla Powder; automatic hiding of missing links, prices, sizes, photos and contact details; image fallbacks; back-to-top button; WhatsApp buttons and WhatsApp contact form (as soon as the number is set); SEO files.

**Needs your information:** email/address/social links, product photos, marketplace links and availability for the remaining products, pack sizes, the About story, and the yellow placeholders in the legal pages.
