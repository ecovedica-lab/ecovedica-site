/* =====================================================================
   ECOVEDICA — SITE CONFIGURATION
   Edit the values below. Everything on the website reads from here.
   Leave a value as "" (empty) if you don't have it yet — the website
   will simply hide that button or link instead of showing a broken one.
   ===================================================================== */
window.ECO_CONFIG = {
  brandName: "EcoVedica",
  businessName: "ECOVEDICA HERBAL ENTERPRISES",
  siteUrl: "https://ecovedica.co.in",          // no trailing slash
  tagline: "Herbal powders & traditional beauty ingredients",

  // Logo shown in the header and footer. Replace the file, or point to your own.
  logo: "assets/images/logo.png",

  // WhatsApp business number: country code + number, digits only.
  // Example for India: "919876543210"  (91 = India, then the 10-digit mobile)
  // >>> FILL THIS IN — WhatsApp buttons stay hidden while it is empty. <<<
  whatsappNumber: "917742343313",

  // Default WhatsApp message for general enquiries
  whatsappGeneralMessage: "Hello EcoVedica, I would like to know more about your herbal products.",

  // Contact details shown on the Contact page and footer. Leave "" to hide.
  email: "",          // e.g. "hello@ecovedica.co.in"
  phone: "+91 77423 43313",
  address: "",        // e.g. "Shop no., Street, City, State, PIN"
  gstin: "",          // only if you want to display it

  // Social media profile URLs. Leave "" to hide an icon.
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
    x: ""
  },

  // Marketplace buttons: label and on/off switch for the whole site.
  marketplaces: {
    amazon:   { label: "Buy on Amazon",   enabled: true },
    flipkart: { label: "Buy on Flipkart", enabled: true },
    meesho:   { label: "Buy on Meesho",   enabled: true }
  },

  // Category list used by filters, category pages and the homepage.
  categories: [
    { id: "hair-care",           name: "Hair Care",                     page: "hair-care.html",
      blurb: "Powders and leaves used in traditional Indian hair routines." },
    { id: "skin-care",           name: "Skin Care",                     page: "skin-care.html",
      blurb: "Clays and powders used in face packs and skin routines." },
    { id: "herbal-powders",      name: "Herbal Powders",                page: "herbal-powders.html",
      blurb: "Finely ground dried herbs, leaves, roots and fruits." },
    { id: "traditional-beauty",  name: "Traditional Beauty Ingredients", page: "traditional-beauty-ingredients.html",
      blurb: "Time-honoured ingredients from Indian beauty traditions." }
  ],

  copyrightYear: 2026
};
