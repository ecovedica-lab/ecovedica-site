/* =====================================================================
   ECOVEDICA — SITE SCRIPT
   Builds the header, footer, product grids, product pages, search,
   filters and WhatsApp links from config.js and products.js.
   You normally don't need to edit this file.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.ECO_CONFIG || {};
  var P = window.ECO_PRODUCTS || [];
  var body = document.body;
  var ROOT = body.getAttribute("data-root") || "";
  var PAGE = body.getAttribute("data-page") || "";

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function url(path) {
    if (!path) return "";
    if (/^(https?:)?\/\//.test(path) || path.indexOf("data:") === 0) return path;
    return ROOT + path;
  }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function productUrl(p) { return ROOT + "products/" + p.slug + ".html"; }
  function catById(id) {
    var list = C.categories || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function digits(s) { return String(s || "").replace(/\D/g, ""); }
  function hasWhatsApp() { return digits(C.whatsappNumber).length >= 10; }
  function waLink(message) {
    return "https://wa.me/" + digits(C.whatsappNumber) + "?text=" + encodeURIComponent(message || C.whatsappGeneralMessage || "");
  }
  function productWaMessage(p) {
    if (p.whatsappMessage) return p.whatsappMessage;
    return "Hello " + (C.brandName || "EcoVedica") + ", I would like to enquire about " + p.name +
      " (" + p.id + "). Please share availability and pack sizes.";
  }
  function isValidLink(u) { return /^https:\/\/\S+\.\S+/.test(u || ""); }
  function marketplaceLinks(p) {
    var out = [];
    if (p.availability !== "available") return out;           // never offer purchase if not available
    var m = C.marketplaces || {};
    ["amazon", "flipkart", "meesho"].forEach(function (key) {
      var link = p.links && p.links[key];
      if (m[key] && m[key].enabled !== false && isValidLink(link)) {
        out.push({ key: key, label: m[key].label, href: link });
      }
    });
    return out;
  }
  var availLabel = {
    available: "Available",
    unavailable: "Currently unavailable",
    enquire: "Enquire for availability"
  };

  var ICON = {
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3Z"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm5.2 12.2L21 21"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>',
    up: '<svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 14l6-6 6 6"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><path fill="currentColor" d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4A20 20 0 0 0 14.3 4C12.1 4 10.5 5.4 10.5 7.9v2.6H8v3h2.5V21h3Z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.7 2 12 2 12s0 3.3.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.5.4-4.8.4-4.8s0-3.3-.4-4.8ZM10 15V9l5.2 3L10 15Z"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16"><path fill="currentColor" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></svg>'
  };

  /* ---------- placeholder image (shown until a real photo is added) ---------- */
  function placeholderHTML(p, extraClass) {
    return '<div class="ph ' + (extraClass || "") + '" style="--swatch:' + esc(p.swatch || "#8fa58a") + '" role="img" aria-label="' + esc(p.name) + ' — photo coming soon">' +
      '<span class="ph-heap" aria-hidden="true"></span>' +
      '<span class="ph-name" aria-hidden="true">' + esc(p.name) + '</span>' +
      '</div>';
  }
  function imageHTML(p, src, opts) {
    opts = opts || {};
    if (!src) return placeholderHTML(p, opts.cls);
    return '<img class="' + (opts.cls || "") + '" src="' + esc(url(src)) + '" alt="' + esc(opts.alt || (p.name + " by " + (C.brandName || "EcoVedica"))) + '"' +
      (opts.eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async" data-fallback="' + esc(p.slug) + '">';
  }
  // Swap any broken product image for its placeholder
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (!img || img.tagName !== "IMG" || !img.getAttribute("data-fallback")) return;
    var p = P.filter(function (x) { return x.slug === img.getAttribute("data-fallback"); })[0];
    if (!p) return;
    var wrap = document.createElement("div");
    wrap.innerHTML = placeholderHTML(p, img.className);
    img.replaceWith(wrap.firstChild);
  }, true);

  /* ---------- header ---------- */
  function navItems() {
    return [
      { href: "index.html", label: "Home", key: "home" },
      { href: "products.html", label: "All Products", key: "products" },
      { href: "hair-care.html", label: "Hair Care", key: "hair-care" },
      { href: "skin-care.html", label: "Skin Care", key: "skin-care" },
      { href: "herbal-powders.html", label: "Herbal Powders", key: "herbal-powders" },
      { href: "about.html", label: "About", key: "about" },
      { href: "contact.html", label: "Contact", key: "contact" }
    ];
  }
  function currentNavKey() {
    if (PAGE === "category") return body.getAttribute("data-category");
    if (PAGE === "product") return "products";
    return PAGE;
  }
  function renderHeader() {
    var slot = $("#site-header");
    if (!slot) return;
    var active = currentNavKey();
    var links = navItems().map(function (n) {
      return '<li><a href="' + ROOT + n.href + '"' + (n.key === active ? ' aria-current="page"' : "") + ">" + esc(n.label) + "</a></li>";
    }).join("");
    var q = "";
    try { q = new URLSearchParams(location.search).get("q") || ""; } catch (e) {}
    slot.innerHTML =
      '<div class="announce"><div class="wrap">Explore Herbal Ingredients for Your Beauty &amp; Wellness Routine</div></div>' +
      '<div class="masthead"><div class="wrap masthead-row">' +
        '<a class="logo" href="' + ROOT + 'index.html" aria-label="' + esc(C.brandName) + ' home">' +
          '<img src="' + esc(url(C.logo)) + '" alt="' + esc(C.brandName) + ' logo" width="138" height="52"></a>' +
        '<form class="search" action="' + ROOT + 'products.html" method="get" role="search">' +
          '<label class="sr-only" for="site-search">Search products</label>' +
          '<input id="site-search" name="q" type="search" placeholder="Search products" autocomplete="off" value="' + esc(q) + '">' +
          '<button type="submit" aria-label="Search">' + ICON.search + '</button>' +
        '</form>' +
        (hasWhatsApp() ? '<a class="btn btn-wa btn-sm head-wa" href="' + esc(waLink()) + '" target="_blank" rel="noopener">' + ICON.wa + '<span>WhatsApp</span></a>' : "") +
        '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Open menu">' + ICON.menu + '</button>' +
      '</div></div>' +
      '<nav class="mainnav" id="main-nav" aria-label="Main"><div class="wrap"><ul>' + links + '</ul></div></nav>';

    var btn = $(".menu-btn", slot), nav = $("#main-nav", slot);
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  /* ---------- footer ---------- */
  function renderFooter() {
    var slot = $("#site-footer");
    if (!slot) return;
    var social = Object.keys(C.social || {}).filter(function (k) { return isValidLink(C.social[k]); })
      .map(function (k) {
        var names = { instagram: "Instagram", facebook: "Facebook", youtube: "YouTube", x: "X" };
        return '<a href="' + esc(C.social[k]) + '" target="_blank" rel="noopener" aria-label="' + names[k] + '">' + (ICON[k] || names[k]) + "</a>";
      }).join("");
    var contact = [];
    if (hasWhatsApp()) contact.push('<li><a href="' + esc(waLink()) + '" target="_blank" rel="noopener">WhatsApp us</a></li>');
    if (C.email) contact.push('<li><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></li>");
    if (C.phone) contact.push("<li>" + esc(C.phone) + "</li>");
    if (C.address) contact.push("<li>" + esc(C.address) + "</li>");
    contact.push('<li><a href="' + ROOT + 'contact.html">Contact page</a></li>');

    var cats = (C.categories || []).map(function (c) {
      return '<li><a href="' + ROOT + c.page + '">' + esc(c.name) + "</a></li>";
    }).join("");

    slot.innerHTML =
      '<div class="wrap foot-grid">' +
        '<div class="foot-brand">' +
          '<img src="' + esc(url(C.logo)) + '" alt="' + esc(C.brandName) + ' logo" width="127" height="48" loading="lazy">' +
          "<p>" + esc(C.tagline) + ". Shop through trusted marketplaces or contact us directly.</p>" +
          (social ? '<div class="social">' + social + "</div>" : "") +
        "</div>" +
        '<div><h2 class="foot-h">Shop</h2><ul><li><a href="' + ROOT + 'products.html">All Products</a></li>' + cats + "</ul></div>" +
        '<div><h2 class="foot-h">Company</h2><ul>' +
          '<li><a href="' + ROOT + 'about.html">About Us</a></li>' +
          '<li><a href="' + ROOT + 'privacy-policy.html">Privacy Policy</a></li>' +
          '<li><a href="' + ROOT + 'terms.html">Terms &amp; Conditions</a></li>' +
          '<li><a href="' + ROOT + 'disclaimer.html">Disclaimer</a></li>' +
        "</ul></div>" +
        '<div><h2 class="foot-h">Contact</h2><ul>' + contact.join("") + "</ul></div>" +
      "</div>" +
      '<div class="wrap foot-base"><span>© ' + esc(C.copyrightYear || new Date().getFullYear()) + " " + esc(C.businessName) + ". All rights reserved.</span>" +
      '<span>Product information is for general reference. Please read the <a href="' + ROOT + 'disclaimer.html">disclaimer</a>.</span></div>';
  }

  /* ---------- setup checklist (only shown off the live domain) ---------- */
  function renderSetupNotice() {
    var live = C.siteUrl && location.hostname && C.siteUrl.indexOf(location.hostname.replace(/^www\./, "")) !== -1;
    if (live) return;
    var todo = [];
    if (!hasWhatsApp()) todo.push("WhatsApp number");
    if (!C.email) todo.push("email");
    if (/logo\.svg$/.test(C.logo || "")) todo.push("your original logo");
    var noPhoto = P.filter(function (p) { return !p.image; }).length;
    if (noPhoto) todo.push(noPhoto + " product photos");
    var noLinks = P.filter(function (p) { return p.availability === "available" && marketplaceLinks(p).length === 0; }).length;
    var enquire = P.filter(function (p) { return p.availability === "enquire"; }).length;
    if (enquire) todo.push("availability + marketplace links for " + enquire + " products");
    if (noLinks) todo.push(noLinks + " available products without links");
    if (!todo.length) return;
    try { if (sessionStorage.getItem("eco-setup-hide")) return; } catch (e) {}
    var el = document.createElement("div");
    el.className = "setup-note";
    el.setAttribute("role", "note");
    el.innerHTML = "<p><strong>Setup checklist</strong> (visible only before the site is on " + esc(C.siteUrl.replace(/^https?:\/\//, "")) + "): add " +
      esc(todo.join(", ")) + ". See README.md.</p><button type=\"button\">Hide</button>";
    $("button", el).addEventListener("click", function () {
      el.remove();
      try { sessionStorage.setItem("eco-setup-hide", "1"); } catch (e) {}
    });
    body.appendChild(el);
  }

  /* ---------- product card ---------- */
  function cardHTML(p) {
    var cats = (p.categories || []).map(catById).filter(Boolean);
    return '<article class="card">' +
      '<a class="card-media" href="' + productUrl(p) + '" tabindex="-1" aria-hidden="true">' + imageHTML(p, p.image) + "</a>" +
      '<div class="card-body">' +
        (cats[0] ? '<span class="card-cat">' + esc(cats[0].name) + "</span>" : "") +
        '<h3 class="card-title"><a href="' + productUrl(p) + '">' + esc(p.name) + "</a></h3>" +
        '<p class="card-text">' + esc(p.short) + "</p>" +
        '<div class="card-foot">' +
          '<span class="avail avail-' + esc(p.availability) + '">' + esc(availLabel[p.availability] || "") + "</span>" +
          (p.price ? '<span class="price">' + esc(p.price) + "</span>" : "") +
        "</div>" +
        '<a class="btn btn-outline btn-block" href="' + productUrl(p) + '">View details</a>' +
      "</div></article>";
  }

  /* ---------- product listing with search, filter, sort ---------- */
  function renderListing(slot) {
    var fixedCat = slot.getAttribute("data-category") || "";
    var params;
    try { params = new URLSearchParams(location.search); } catch (e) { params = { get: function () { return null; } }; }
    var state = {
      q: params.get("q") || "",
      cat: fixedCat || params.get("category") || "",
      sort: params.get("sort") === "za" ? "za" : "az"
    };
    var catOptions = '<option value="">All categories</option>' + (C.categories || []).map(function (c) {
      return '<option value="' + esc(c.id) + '">' + esc(c.name) + "</option>";
    }).join("");

    slot.innerHTML =
      '<div class="toolbar">' +
        '<div class="field grow"><label for="list-q">Search</label>' +
          '<input id="list-q" type="search" placeholder="e.g. amla, neem, henna" value="' + esc(state.q) + '"></div>' +
        (fixedCat ? "" : '<div class="field"><label for="list-cat">Category</label><select id="list-cat">' + catOptions + "</select></div>") +
        '<div class="field"><label for="list-sort">Sort</label><select id="list-sort">' +
          '<option value="az">Name: A to Z</option><option value="za">Name: Z to A</option></select></div>' +
      "</div>" +
      (fixedCat ? "" : '<div class="chips" role="group" aria-label="Filter by category"></div>') +
      '<p class="count" aria-live="polite"></p>' +
      '<div class="grid"></div>' +
      '<div class="empty" hidden><h3>No products found</h3><p>Try a different spelling or a shorter word, or browse all categories.</p>' +
        '<button type="button" class="btn btn-outline js-clear">Clear search &amp; filters</button>' +
        (hasWhatsApp() ? ' <a class="btn btn-wa" target="_blank" rel="noopener" href="' + esc(waLink("Hello EcoVedica, I am looking for: ")) + '">' + ICON.wa + "<span>Ask on WhatsApp</span></a>" : "") +
      "</div>";

    var qIn = $("#list-q", slot), catSel = $("#list-cat", slot), sortSel = $("#list-sort", slot);
    var chips = $(".chips", slot), grid = $(".grid", slot), count = $(".count", slot), empty = $(".empty", slot);
    if (catSel) catSel.value = state.cat;
    sortSel.value = state.sort;

    function drawChips() {
      if (!chips) return;
      var all = [{ id: "", name: "All" }].concat(C.categories || []);
      chips.innerHTML = all.map(function (c) {
        return '<button type="button" class="chip" data-cat="' + esc(c.id) + '" aria-pressed="' + (state.cat === c.id) + '">' + esc(c.name) + "</button>";
      }).join("");
    }
    function draw() {
      var q = state.q.trim().toLowerCase();
      var list = P.filter(function (p) {
        if (state.cat && (p.categories || []).indexOf(state.cat) === -1) return false;
        if (!q) return true;
        return (p.name + " " + p.short + " " + p.slug.replace(/-/g, " ")).toLowerCase().indexOf(q) !== -1;
      });
      list.sort(function (a, b) {
        var r = a.name.localeCompare(b.name, "en", { sensitivity: "base" });
        return state.sort === "za" ? -r : r;
      });
      grid.innerHTML = list.map(cardHTML).join("");
      count.textContent = list.length + (list.length === 1 ? " product" : " products") + (q ? ' matching “' + state.q.trim() + '”' : "");
      empty.hidden = list.length !== 0;
      grid.hidden = list.length === 0;
      drawChips();
    }
    var t;
    qIn.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(function () { state.q = qIn.value; draw(); }, 120);
    });
    if (catSel) catSel.addEventListener("change", function () { state.cat = catSel.value; draw(); });
    sortSel.addEventListener("change", function () { state.sort = sortSel.value; draw(); });
    if (chips) chips.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      state.cat = b.getAttribute("data-cat");
      if (catSel) catSel.value = state.cat;
      draw();
    });
    $(".js-clear", slot).addEventListener("click", function () {
      state.q = ""; qIn.value = "";
      if (!fixedCat) { state.cat = ""; if (catSel) catSel.value = ""; }
      draw(); qIn.focus();
    });
    draw();
  }

  /* ---------- homepage pieces ---------- */
  function renderFeatured(slot) {
    var list = P.filter(function (p) { return p.featured; });
    if (!list.length) list = P.slice(0, 8);
    slot.innerHTML = list.map(cardHTML).join("");
  }
  function renderCategoryCards(slot) {
    slot.innerHTML = (C.categories || []).map(function (c) {
      var items = P.filter(function (p) { return (p.categories || []).indexOf(c.id) !== -1; });
      var dots = items.slice(0, 5).map(function (p) {
        return '<span style="--swatch:' + esc(p.swatch || "#8fa58a") + '"></span>';
      }).join("");
      return '<a class="cat-card" href="' + ROOT + c.page + '">' +
        '<span class="cat-dots" aria-hidden="true">' + dots + "</span>" +
        '<span class="cat-name">' + esc(c.name) + "</span>" +
        '<span class="cat-blurb">' + esc(c.blurb) + "</span>" +
        '<span class="cat-count">' + items.length + " products →</span></a>";
    }).join("");
  }

  /* ---------- WhatsApp buttons placed in page HTML ---------- */
  function wireWhatsAppButtons() {
    $all("[data-wa]").forEach(function (el) {
      if (!hasWhatsApp()) {
        var fb = el.getAttribute("data-wa-fallback");
        if (fb) { el.setAttribute("href", ROOT + fb); el.removeAttribute("target"); el.classList.remove("btn-wa");
          if (!el.classList.contains("btn-ghost")) el.classList.add("btn-outline");
          var s = el.querySelector("span"); if (s) s.textContent = "Contact Us"; var i = el.querySelector(".wa-ico"); if (i) i.remove(); }
        else el.remove();
        return;
      }
      var ico = el.querySelector(".wa-ico");
      if (ico) ico.outerHTML = ICON.wa;
      el.setAttribute("href", waLink(el.getAttribute("data-wa") || ""));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /* ---------- product detail page ---------- */
  function setMeta(name, value, attr) {
    attr = attr || "name";
    var m = document.head.querySelector("meta[" + attr + '="' + name + '"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute(attr, name); document.head.appendChild(m); }
    m.setAttribute("content", value);
  }
  function addJsonLd(obj) {
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }
  function renderProduct(slot) {
    var slug = body.getAttribute("data-slug");
    var p = P.filter(function (x) { return x.slug === slug; })[0];
    if (!p) {
      slot.innerHTML = '<div class="wrap section"><h1>Product not found</h1><p>This product may have been removed. <a href="' + ROOT + 'products.html">Browse all products</a>.</p></div>';
      return;
    }
    if (p.seoTitle) document.title = p.seoTitle;
    if (p.seoDescription) setMeta("description", p.seoDescription);

    var cats = (p.categories || []).map(catById).filter(Boolean);
    var mainCat = cats[0];
    var images = [p.image].concat(p.gallery || []).filter(Boolean);
    var buy = marketplaceLinks(p);

    var gallery = '<div class="pd-main">' + imageHTML(p, images[0] || "", { eager: true, cls: "pd-img" }) + "</div>";
    if (images.length > 1) {
      gallery += '<div class="thumbs" role="group" aria-label="Product photos">' + images.map(function (src, i) {
        return '<button type="button" class="thumb" aria-pressed="' + (i === 0) + '" data-src="' + esc(url(src)) + '" aria-label="Show photo ' + (i + 1) + '">' +
          '<img src="' + esc(url(src)) + '" alt="" loading="lazy" data-fallback="' + esc(p.slug) + '"></button>';
      }).join("") + "</div>";
    }

    var buyHTML = buy.map(function (b) {
      return '<a class="btn btn-mkt btn-' + b.key + '" href="' + esc(b.href) + '" target="_blank" rel="noopener">' + esc(b.label) + "</a>";
    }).join("");
    var waHTML = hasWhatsApp() ? '<a class="btn btn-wa" href="' + esc(waLink(productWaMessage(p))) + '" target="_blank" rel="noopener">' + ICON.wa + "<span>Enquire on WhatsApp</span></a>" : "";
    var statusNote = "";
    if (p.availability === "unavailable") statusNote = '<p class="pd-status">This product is currently unavailable for purchase.' + (hasWhatsApp() ? " Message us to ask when it will be back." : "") + "</p>";
    else if (p.availability === "enquire") statusNote = '<p class="pd-status">Availability is confirmed on request.' + (hasWhatsApp() ? " Send us an enquiry and we'll reply with details." : ' Please <a href="' + ROOT + 'contact.html">contact us</a> for details.') + "</p>";
    else if (!buy.length) statusNote = '<p class="pd-status">Marketplace links will be added soon.' + (hasWhatsApp() ? " You can enquire on WhatsApp meanwhile." : ' Please <a href="' + ROOT + 'contact.html">contact us</a> meanwhile.') + "</p>";

    var related = P.filter(function (x) {
      return x.slug !== p.slug && (x.categories || []).some(function (c) { return (p.categories || []).indexOf(c) !== -1; });
    }).slice(0, 4);

    slot.innerHTML =
      '<div class="wrap">' +
        '<nav class="crumbs" aria-label="Breadcrumb"><ol>' +
          '<li><a href="' + ROOT + 'index.html">Home</a></li>' +
          '<li><a href="' + ROOT + 'products.html">Products</a></li>' +
          (mainCat ? '<li><a href="' + ROOT + mainCat.page + '">' + esc(mainCat.name) + "</a></li>" : "") +
          '<li aria-current="page">' + esc(p.name) + "</li></ol></nav>" +
        '<div class="pd">' +
          '<div class="pd-gallery">' + gallery + "</div>" +
          '<div class="pd-info">' +
            '<div class="pd-cats">' + cats.map(function (c) { return '<a href="' + ROOT + c.page + '">' + esc(c.name) + "</a>"; }).join("") + "</div>" +
            "<h1>" + esc(p.name) + "</h1>" +
            '<p class="pd-short">' + esc(p.short) + "</p>" +
            '<div class="pd-meta">' +
              '<span class="avail avail-' + esc(p.availability) + '">' + esc(availLabel[p.availability] || "") + "</span>" +
              (p.price ? '<span class="price price-lg">' + esc(p.price) + "</span>" : "") +
            "</div>" +
            (p.sizes && p.sizes.length ? '<div class="sizes"><span class="label">Pack sizes</span><ul>' + p.sizes.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>" : "") +
            statusNote +
            ((buyHTML || waHTML) ? '<div class="pd-buy">' + buyHTML + waHTML + "</div>" : "") +
            (buy.length ? '<p class="fine">You will be taken to the marketplace to complete your purchase. Prices, offers and delivery are shown there.</p>' : "") +
            '<div class="pd-desc"><h2>About this product</h2>' + (p.description || []).map(function (d) { return "<p>" + esc(d) + "</p>"; }).join("") + "</div>" +
            '<p class="fine">For external use products, do a patch test first. This information is for general reference only. <a href="' + ROOT + 'disclaimer.html">Read disclaimer</a>.</p>' +
          "</div>" +
        "</div>" +
        (related.length ? '<section class="section related"><h2 class="h2">Related products</h2><div class="grid">' + related.map(cardHTML).join("") + "</div></section>" : "") +
      "</div>";

    $all(".thumb", slot).forEach(function (b) {
      b.addEventListener("click", function () {
        var main = $(".pd-main img", slot);
        if (main) main.src = b.getAttribute("data-src");
        $all(".thumb", slot).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      });
    });

    // Structured data: breadcrumb always; Product only when price + availability + a buy link are real
    var base = (C.siteUrl || "").replace(/\/$/, "");
    var crumbs = [{ n: "Home", u: base + "/" }, { n: "Products", u: base + "/products.html" }];
    if (mainCat) crumbs.push({ n: mainCat.name, u: base + "/" + mainCat.page });
    crumbs.push({ n: p.name, u: base + "/products/" + p.slug + ".html" });
    addJsonLd({
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: crumbs.map(function (c, i) { return { "@type": "ListItem", position: i + 1, name: c.n, item: c.u }; })
    });
    var priceNum = parseFloat(String(p.price).replace(/[^0-9.]/g, ""));
    if (priceNum > 0 && p.availability === "available" && buy.length) {
      var ld = {
        "@context": "https://schema.org", "@type": "Product",
        name: p.name, description: (p.description || []).join(" "), sku: p.id,
        brand: { "@type": "Brand", name: C.brandName },
        url: base + "/products/" + p.slug + ".html",
        offers: { "@type": "Offer", priceCurrency: "INR", price: priceNum, availability: "https://schema.org/InStock", url: buy[0].href }
      };
      if (p.image) ld.image = [base + "/" + p.image];
      addJsonLd(ld);
    }
  }

  /* ---------- contact form → WhatsApp ---------- */
  function renderContact() {
    var details = $("#contact-details");
    if (details) {
      var rows = [];
      if (hasWhatsApp()) rows.push('<li><span class="label">WhatsApp</span><a href="' + esc(waLink()) + '" target="_blank" rel="noopener">Chat with us</a></li>');
      if (C.phone) rows.push('<li><span class="label">Phone</span><span>' + esc(C.phone) + "</span></li>");
      if (C.email) rows.push('<li><span class="label">Email</span><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></li>");
      if (C.address) rows.push('<li><span class="label">Address</span><span>' + esc(C.address) + "</span></li>");
      Object.keys(C.social || {}).forEach(function (k) {
        if (isValidLink(C.social[k])) rows.push('<li><span class="label">' + k.charAt(0).toUpperCase() + k.slice(1) + '</span><a href="' + esc(C.social[k]) + '" target="_blank" rel="noopener">Visit profile</a></li>');
      });
      details.innerHTML = rows.length ? "<ul class=\"dl\">" + rows.join("") + "</ul>" :
        '<p class="muted">Our contact details will be listed here shortly. Meanwhile, you can reach us through the seller contact option on our marketplace listings.</p>';
    }
    var form = $("#contact-form");
    if (!form) return;
    if (!hasWhatsApp()) { form.hidden = true; return; }
    var sel = $("#cf-product", form);
    sel.innerHTML = '<option value="">General enquiry</option>' + P.map(function (p) {
      return '<option value="' + esc(p.name) + '">' + esc(p.name) + "</option>";
    }).join("");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#cf-name", form), msg = $("#cf-msg", form), err = $(".form-error", form);
      if (!name.value.trim() || !msg.value.trim()) {
        err.textContent = "Please enter your name and a message.";
        err.hidden = false;
        (name.value.trim() ? msg : name).focus();
        return;
      }
      err.hidden = true;
      var text = "Hello EcoVedica, my name is " + name.value.trim() + "." +
        (sel.value ? "\nProduct: " + sel.value : "") + "\n" + msg.value.trim();
      window.open(waLink(text), "_blank", "noopener");
      var done = $(".form-done", form);
      done.innerHTML = 'WhatsApp should open with your message ready to send. If it didn\'t open, <a href="' + esc(waLink(text)) + '" target="_blank" rel="noopener">tap here</a>.';
      done.hidden = false;
    });
  }

  /* ---------- back to top ---------- */
  function backToTop() {
    var b = document.createElement("button");
    b.type = "button"; b.className = "to-top"; b.setAttribute("aria-label", "Back to top"); b.innerHTML = ICON.up;
    b.hidden = true;
    body.appendChild(b);
    b.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    window.addEventListener("scroll", function () { b.hidden = window.scrollY < 600; }, { passive: true });
  }

  /* ---------- dev warnings for missing data (browser console) ---------- */
  function warnings() {
    if (!window.console) return;
    P.forEach(function (p) {
      var miss = [];
      if (!p.image) miss.push("image");
      if (!p.sizes || !p.sizes.length) miss.push("sizes");
      if (p.availability === "available" && !marketplaceLinks(p).length) miss.push("marketplace link");
      if (miss.length) console.info("[EcoVedica] " + p.name + " is missing: " + miss.join(", "));
    });
  }

  /* ---------- boot ---------- */
  renderHeader();
  renderFooter();
  $all("[data-listing]").forEach(renderListing);
  var f = $("#featured-grid"); if (f) renderFeatured(f);
  var cc = $("#category-cards"); if (cc) renderCategoryCards(cc);
  var pd = $("#product-detail"); if (pd) renderProduct(pd);
  if (PAGE === "contact") renderContact();
  $all("[data-year]").forEach(function (el) { el.textContent = C.copyrightYear || new Date().getFullYear(); });
  $all("[data-brand]").forEach(function (el) { el.textContent = C.businessName || ""; });
  wireWhatsAppButtons();
  backToTop();
  renderSetupNotice();
  warnings();
})();
