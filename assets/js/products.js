/* =====================================================================
   ECOVEDICA — PRODUCT CATALOGUE
   ---------------------------------------------------------------------
   One block = one product. To edit a product, change its values here.
   To add a product, copy a whole { ... } block, paste it at the end of
   the list (keep the commas), and change every value.
   See README.md → "Add or edit products" for the full steps.

   FIELD GUIDE
   id            Unique short code (e.g. "EV-001").
   name          Product name shown on the site.
   slug          URL name, lowercase-with-dashes. Must match the file
                 products/<slug>.html
   categories    One or more ids from config.js → categories.
   image         Main photo, e.g. "assets/images/products/amla-powder.jpg".
                 Leave "" until you upload a photo — a neat placeholder shows.
   gallery       Extra photos: ["assets/images/products/amla-2.jpg", ...]
   swatch        Placeholder colour (hex) used until a photo is added.
   short         One-line description for product cards.
   description   Full description for the product page (paragraphs as array).
   sizes         Pack sizes, e.g. ["100 g", "250 g"]. [] = hidden.
   price         Display price text, e.g. "₹199". "" = hidden.
                 Only enter a price you have verified; marketplace prices change.
   availability  "available"   → shows purchase buttons
                 "unavailable" → shows "Currently unavailable", hides buy buttons
                 "enquire"     → availability not confirmed; enquiry only
   featured      true = show on the homepage.
   links         Marketplace product URLs. "" = that button is hidden.
   whatsappMessage  Prefilled WhatsApp enquiry text. "" = automatic message.
   seoTitle / seoDescription  Used for search results and link previews.
                 Also update the same text in products/<slug>.html.

   >>> PLEASE REVIEW every description before going live. They are
       general, non-medical texts and should match your actual products. <<<
   ===================================================================== */
window.ECO_PRODUCTS = [
  {
    id: "EV-001",
    name: "Amla Powder",
    slug: "amla-powder",
    categories: ["hair-care", "herbal-powders"],
    image: "",
    gallery: [],
    swatch: "#9aa84a",
    short: "Powder made from dried Indian gooseberry (amla) fruit.",
    description: [
      "Amla Powder is made from dried Indian gooseberry fruit, ground into a fine powder.",
      "Amla has a long history in Indian kitchens and traditional hair-care routines, where it is commonly mixed with water, curd or other herbal powders to make a hair pack."
    ],
    sizes: [],
    price: "",
    availability: "available",
    featured: true,
    links: {
      amazon: "https://www.amazon.in/dp/B0GW3C7W5R",
      flipkart: "",
      meesho: ""
    },
    whatsappMessage: "",
    seoTitle: "Amla Powder | EcoVedica",
    seoDescription: "EcoVedica Amla Powder — dried Indian gooseberry fruit powder. View details and buy on your preferred marketplace."
  },
  {
    id: "EV-002",
    name: "Multani Mitti",
    slug: "multani-mitti",
    categories: ["skin-care", "traditional-beauty"],
    image: "", gallery: [], swatch: "#c9b48a",
    short: "Fuller's earth clay powder used in traditional face packs.",
    description: [
      "Multani Mitti, also known as fuller's earth, is a natural clay that has been used in Indian beauty routines for generations.",
      "It is typically mixed with water or rose water to make a face or hair pack."
    ],
    sizes: [], price: "", availability: "enquire", featured: true,
    links: { amazon: "", flipkart: "", meesho: "" },
    whatsappMessage: "",
    seoTitle: "Multani Mitti (Fuller's Earth) | EcoVedica",
    seoDescription: "EcoVedica Multani Mitti — natural fuller's earth clay powder for traditional face and hair packs."
  },
  {
    id: "EV-003",
    name: "Mulethi Powder",
    slug: "mulethi-powder",
    categories: ["skin-care", "herbal-powders"],
    image: "", gallery: [], swatch: "#c8a46a",
    short: "Powder made from dried liquorice (mulethi) root.",
    description: [
      "Mulethi Powder is made from dried liquorice root, ground into a fine powder.",
      "It is a familiar ingredient in traditional Indian homemade face packs and herbal preparations."
    ],
    sizes: [], price: "", availability: "enquire", featured: false,
    links: { amazon: "", flipkart: "", meesho: "" },
    whatsappMessage: "",
    seoTitle: "Mulethi Powder (Liquorice Root) | EcoVedica",
    seoDescription: "EcoVedica Mulethi Powder — dried liquorice root powder used in traditional homemade packs."
  },
  {
    id: "EV-004",
    name: "Moringa Powder",
    slug: "moringa-powder",
    categories: ["herbal-powders"],
    image: "", gallery: [], swatch: "#6f8f3a",
    short: "Powder made from dried moringa (drumstick tree) leaves.",
    description: [
      "Moringa Powder is made from the dried leaves of the moringa, or drumstick, tree.",
      "Moringa leaves are widely used in Indian cooking, and the powder is also used in homemade face and hair packs."
    ],
    sizes: [], price: "", availability: "enquire", featured: true,
    links: { amazon: "", flipkart: "", meesho: "" },
    whatsappMessage: "",
    seoTitle: "Moringa Leaf Powder | EcoVedica",
    seoDescription: "EcoVedica Moringa Powder — dried moringa (drumstick) leaf powder."
  },
  {
    id: "EV-005",
    name: "Rosemary Leaves",
    slug: "rosemary-leaves",
    categories: ["hair-care", "traditional-beauty"],
    image: "", gallery: [], swatch: "#55704f",
    short: "Dried rosemary leaves for herbal infusions and DIY hair rinses.",
    description: [
      "Dried rosemary leaves from the aromatic rosemary herb.",
      "They are popular for making homemade hair rinses and infused oils, and are also used as a kitchen herb."
    ],
    sizes: [], price: "", availability: "available", featured: true,
    links: { amazon: "", flipkart: "https://www.flipkart.com/ecovedica-rosemary-leaves-dried-leaf-pure-natural-hair-growth-nourishment/p/itm74ad45f5aad13", meesho: "" },
    whatsappMessage: "",
    seoTitle: "Dried Rosemary Leaves | EcoVedica",
    seoDescription: "EcoVedica dried Rosemary Leaves for homemade hair rinses and infusions."
  },
  {
    id: "EV-006",
    name: "Neem Powder",
    slug: "neem-powder",
    categories: ["skin-care", "hair-care", "herbal-powders"],
    image: "", gallery: [], swatch: "#5f7d3c",
    short: "Powder made from dried neem leaves.",
    description: [
      "Neem Powder is made from dried neem leaves, ground into a fine powder.",
      "Neem is one of the best-known plants in Indian tradition and is a common ingredient in homemade face and hair packs."
    ],
    sizes: [], price: "", availability: "enquire", featured: false,
    links: { amazon: "", flipkart: "", meesho: "" },
    whatsappMessage: "",
    seoTitle: "Neem Leaf Powder | EcoVedica",
    seoDescription: "EcoVedica Neem Powder — dried neem leaf powder for traditional face and hair packs."
  },
  {
    id: "EV-007",
    name: "Chandan Powder",
    slug: "chandan-powder",
    categories: ["skin-care", "traditional-beauty"],
    image: "", gallery: [], swatch: "#d9b98c",
    short: "Sandalwood (chandan) powder for traditional beauty routines.",
    description: [
      "Chandan Powder is a sandalwood powder with a warm, woody fragrance.",
      "It has been part of Indian beauty and ritual traditions for centuries and is commonly mixed with rose water to make a paste."
    ],
    sizes: [], price: "", availability: "enquire", featured: false,
    links: { amazon: "", flipkart: "", meesho: "" },
    whatsappMessage: "",
    seoTitle: "Chandan (Sandalwood) Powder | EcoVedica",
    seoDescription: "EcoVedica Chandan Powder — sandalwood powder for traditional beauty routines."
  },
  {
    id: "EV-008",
    name: "Indigo Powder",
    slug: "indigo-powder",
    categories: ["hair-care", "traditional-beauty"],
    image: "", gallery: [], swatch: "#34477a",
    short: "Powder made from dried indigo leaves, used in natural hair colouring.",
    description: [
      "Indigo Powder is made from the dried leaves of the indigo plant.",
      "It is traditionally used together with henna in natural hair-colouring routines. Always do a patch test before use."
    ],
    sizes: [], price: "", availability: "enquire", featured: false,
    links: { amazon: "", flipkart: "", meesho: "" },
    whatsappMessage: "",
    seoTitle: "Indigo Leaf Powder | EcoVedica",
    seoDescription: "EcoVedica Indigo Powder — dried indigo leaf powder used with henna in natural hair colouring."
  },
  {
    id: "EV-009",
    name: "Henna Powder",
    slug: "henna-powder",
    categories: ["hair-care", "traditional-beauty"],
    image: "", gallery: [], swatch: "#7c8a3e",
    short: "Powder made from dried henna (mehndi) leaves.",
    description: [
      "Henna Powder is made from the dried leaves of the henna plant, known in India as mehndi.",
      "It is widely used in traditional hair-colouring and hair-conditioning routines. Always do a patch test before use."
    ],
    sizes: [], price: "", availability: "enquire", featured: false,
    links: { amazon: "", flipkart: "", meesho: "" },
    whatsappMessage: "",
    seoTitle: "Henna (Mehndi) Powder | EcoVedica",
    seoDescription: "EcoVedica Henna Powder — dried henna leaf powder for traditional hair routines."
  },
  {
    id: "EV-010",
    name: "Reetha Powder",
    slug: "reetha-powder",
    categories: ["hair-care", "traditional-beauty"],
    image: "", gallery: [], swatch: "#a0764a",
    short: "Powder made from dried reetha (soapnut) shells.",
    description: [
      "Reetha Powder is made from dried soapnut shells, which naturally lather in water.",
      "It is a traditional ingredient in homemade hair-wash blends, often used together with shikakai and amla."
    ],
    sizes: [], price: "", availability: "enquire", featured: false,
    links: { amazon: "", flipkart: "", meesho: "" },
    whatsappMessage: "",
    seoTitle: "Reetha (Soapnut) Powder | EcoVedica",
    seoDescription: "EcoVedica Reetha Powder — soapnut powder for traditional homemade hair-wash blends."
  },
  {
    id: "EV-011",
    name: "Shikakai Powder",
    slug: "shikakai-powder",
    categories: ["hair-care", "traditional-beauty"],
    image: "", gallery: [], swatch: "#8b6a3e",
    short: "Powder made from dried shikakai pods.",
    description: [
      "Shikakai Powder is made from the dried pods of the shikakai plant.",
      "Its name is often translated as 'fruit for hair', and it is a classic ingredient in traditional Indian hair-wash blends."
    ],
    sizes: [], price: "", availability: "enquire", featured: false,
    links: { amazon: "", flipkart: "", meesho: "" },
    whatsappMessage: "",
    seoTitle: "Shikakai Powder | EcoVedica",
    seoDescription: "EcoVedica Shikakai Powder — dried shikakai pod powder for traditional hair-wash blends."
  },
  {
    id: "EV-012",
    name: "Bhringraj Powder",
    slug: "bhringraj-powder",
    categories: ["hair-care", "herbal-powders"],
    image: "", gallery: [], swatch: "#4a6440",
    short: "Powder made from the dried bhringraj herb.",
    description: [
      "Bhringraj Powder is made from the dried bhringraj herb, ground into a fine powder.",
      "It is a well-known ingredient in traditional Indian hair packs and herbal hair-oil preparations."
    ],
    sizes: [], price: "", availability: "enquire", featured: false,
    links: { amazon: "", flipkart: "", meesho: "" },
    whatsappMessage: "",
    seoTitle: "Bhringraj Powder | EcoVedica",
    seoDescription: "EcoVedica Bhringraj Powder — dried bhringraj herb powder for traditional hair packs."
  },
  {
    id: "EV-013",
    name: "Hibiscus Powder",
    slug: "hibiscus-powder",
    categories: ["hair-care", "herbal-powders"],
    image: "", gallery: [], swatch: "#9c3b4a",
    short: "Powder made from dried hibiscus flowers.",
    description: [
      "Hibiscus Powder is made from dried hibiscus flowers, ground into a fine powder.",
      "It is commonly used in homemade hair packs and herbal blends, and gives a natural reddish colour."
    ],
    sizes: [], price: "", availability: "enquire", featured: false,
    links: { amazon: "", flipkart: "", meesho: "" },
    whatsappMessage: "",
    seoTitle: "Hibiscus Flower Powder | EcoVedica",
    seoDescription: "EcoVedica Hibiscus Powder — dried hibiscus flower powder for homemade hair packs."
  },
  {
    id: "EV-015",
    name: "Phitkari (Alum Stone)",
    slug: "phitkari-alum-stone",
    categories: ["skin-care", "traditional-beauty"],
    image: "", gallery: [], swatch: "#d8d4cc",
    short: "Natural alum stone (phitkari / fitkari) block.",
    description: [
      "Phitkari, also called fitkari or alum stone, is a natural mineral block that has been part of Indian households for generations.",
      "It is traditionally used after shaving and in simple home care routines. Always do a patch test first, and keep it away from the eyes."
    ],
    sizes: [], price: "", availability: "available", featured: false,
    links: {
      amazon: "",
      flipkart: "https://www.flipkart.com/ecovedica-organic-phitkari-alum-stone-face-fitkari-block-hair-men-women/p/itm041927577cdb1",
      meesho: ""
    },
    whatsappMessage: "",
    seoTitle: "Phitkari (Alum Stone) | EcoVedica",
    seoDescription: "EcoVedica Phitkari — natural alum stone (fitkari) block. View details and buy on Flipkart."
  },
  {
    id: "EV-014",
    name: "Other Herbal Ingredients & Seeds",
    slug: "other-herbal-ingredients",
    categories: ["herbal-powders", "traditional-beauty"],
    image: "", gallery: [], swatch: "#8fa58a",
    short: "Looking for another herb, powder or seed? Ask us on WhatsApp.",
    description: [
      "Along with our listed products, we may be able to help with other herbal powders, dried herbs and seeds.",
      "Send us an enquiry with the ingredient name and quantity you need, and we will let you know about availability."
    ],
    sizes: [], price: "", availability: "enquire", featured: false,
    links: { amazon: "", flipkart: "", meesho: "" },
    whatsappMessage: "Hello EcoVedica, I am looking for a herbal ingredient that is not listed on your website: ",
    seoTitle: "Other Herbal Ingredients & Seeds | EcoVedica",
    seoDescription: "Enquire with EcoVedica about other herbal powders, dried herbs and seeds."
  }
];
