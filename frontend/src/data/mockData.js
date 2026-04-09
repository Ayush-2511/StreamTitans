const slugify = (text) => {
  if (!text) return 'product';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const LOCAL_ASSETS = [
  'accessories.jpg', 'bags-and-luxury.jpg', 'box-logo-hoodie.jpg', 'canvas-tote-bag.jpg',
  'cloth-jacket.jpg', 'curated-90s-streetwear.jpg', 'early-2000s-finds.jpg', 'gorpcore-basics.jpg',
  'homemade-preserve-set.jpg', 'mechanical-keyboard.jpg', 'menswear.jpg', 'mini-bag.jpg',
  'minimalist-desk-lamp.jpg', 'nylon-mini-bag.jpg', 'oversized-leather-jacket.jpg', 'retro-gaming-consoles.jpg',
  'sherpa-trucker-jacket.jpg', 'shoes.jpg', 'silk-scarf.jpg', 'silver-chain.jpg',
  'smart-air-fryer-xl.jpg', 'upcycled-denim.jpg', 'vintage-band-tees.jpg', 'vintage-cap.jpg',
  'vintage-denim-jacket.jpg', 'wireless-earbuds-pro.jpg', 'desklamp.jpg', 'ergonomic-chair.jpg'
];

/**
 * SEMANTIC IMAGE ROUTING SYSTEM
 * Keywords map to prioritize specific images for specific item titles.
 */
const KEYWORD_MAP = {
  'lamp': ['desklamp.jpg', 'minimalist-desk-lamp.jpg'],
  'light': ['desklamp.jpg', 'minimalist-desk-lamp.jpg'],
  'fryer': ['smart-air-fryer-xl.jpg'],
  'keyboard': ['mechanical-keyboard.jpg'],
  'earbuds': ['wireless-earbuds-pro.jpg'],
  'preserve': ['homemade-preserve-set.jpg'],
  'jacket': ['sherpa-trucker-jacket.jpg', 'vintage-denim-jacket.jpg', 'cloth-jacket.jpg'],
  'denim': ['upcycled-denim.jpg', 'vintage-denim-jacket.jpg'],
  'bag': ['bags-and-luxury.jpg', 'nylon-mini-bag.jpg', 'mini-bag.jpg', 'canvas-tote-bag.jpg'],
  'shoes': ['shoes.jpg'],
  'sneakers': ['shoes.jpg'],
  'hoodie': ['box-logo-hoodie.jpg'],
  'shirt': ['menswear.jpg', 'vintage-band-tees.jpg'],
  'cap': ['vintage-cap.jpg'],
  'vintage': ['vintage-band-tees.jpg', 'vintage-cap.jpg', 'vintage-denim-jacket.jpg'],
  'electronic': ['mechanical-keyboard.jpg', 'wireless-earbuds-pro.jpg', 'retro-gaming-consoles.jpg'],
  'chair': ['ergonomic-chair.jpg'],
  'home': ['desklamp.jpg', 'minimalist-desk-lamp.jpg', 'ergonomic-chair.jpg'],
  'furniture': ['ergonomic-chair.jpg'],
  'food': ['homemade-preserve-set.jpg', 'smart-air-fryer-xl.jpg'],
  'accessories': ['accessories.jpg', 'silver-chain.jpg', 'silk-scarf.jpg']
};

/**
 * CATEGORICAL BUCKETS
 * Broad fallback categories based on item types.
 */
const BUCKETS = {
  ELECTRONICS: ['mechanical-keyboard.jpg', 'wireless-earbuds-pro.jpg', 'retro-gaming-consoles.jpg', 'smart-air-fryer-xl.jpg', 'desklamp.jpg'],
  FASHION: [
    'menswear.jpg', 'shoes.jpg', 'silver-chain.jpg', 'vintage-band-tees.jpg', 'vintage-cap.jpg', 
    'vintage-denim-jacket.jpg', 'upcycled-denim.jpg', 'sherpa-trucker-jacket.jpg', 'gorpcore-basics.jpg',
    'box-logo-hoodie.jpg', 'oversized-leather-jacket.jpg'
  ],
  HOME: ['desklamp.jpg', 'ergonomic-chair.jpg', 'minimalist-desk-lamp.jpg', 'smart-air-fryer-xl.jpg'],
  FOOD: ['homemade-preserve-set.jpg', 'smart-air-fryer-xl.jpg'],
  ACCESSORIES: ['accessories.jpg', 'bags-and-luxury.jpg', 'mini-bag.jpg', 'nylon-mini-bag.jpg', 'silk-scarf.jpg', 'silver-chain.jpg']
};

export const getImage = (title, index, category = '') => {
  const normalizedTitle = title.toLowerCase();
  const slug = slugify(title);
  const fileName = `${slug}.jpg`;
  
  // 1. EXACT MATCH: If the title slug exactly matches a file
  if (LOCAL_ASSETS.includes(fileName)) {
    return `/assets/products/${fileName}`;
  }
  
  // 2. KEYWORD HINT: Check for recognized keywords in the title
  for (const [keyword, images] of Object.entries(KEYWORD_MAP)) {
    if (normalizedTitle.includes(keyword)) {
      // Pick one from the keyword list based on index to ensure variety if multiple matches
      const img = images[index % images.length];
      return `/assets/products/${img}`;
    }
  }

  // 3. CATEGORICAL BUCKET: Fallback to the broad category bucket if provided
  if (category && BUCKETS[category]) {
    const bucket = BUCKETS[category];
    const img = bucket[index % bucket.length];
    return `/assets/products/${img}`;
  }
  
  // 4. GLOBAL ROTATION: Extreme fallback
  const rotatedImage = LOCAL_ASSETS[index % LOCAL_ASSETS.length];
  return `/assets/products/${rotatedImage}`;
};

export const CATEGORIES = ["ALL", "CASUAL", "ETHNIC", "STREETWEAR", "HOME", "ACCESSORIES"];

export const HERO_MOSAIC = [
  { id: 1, isLive: true, title: "Archive Designer Collection", seller: "@vintage_vault", img: getImage("Archive Designer Collection", 0) },
  { id: 2, isLive: true, title: "Curated 90s Streetwear", seller: "@hype_kicks", img: getImage("Curated 90s Streetwear", 1) },
  { id: 3, isLive: false, title: "Minimalist Essentials Drop", seller: "@chic_picks", img: getImage("Minimalist Essentials Drop", 2) },
  { id: 4, isLive: false, title: "Luxury Bags & Accessories", seller: "@luxe_loop", img: getImage("Luxury Bags & Accessories", 3) },
];

export const LIVE_DECK = [
  { id: 1, variantClass: 'live-card-v1', title: "Early 2000s Finds", seller: "@y2k_babe", viewers: "1.2k", category: "STREETWEAR", image: getImage("Early 2000s Finds", 0, "FASHION") },
  { id: 2, variantClass: 'live-card-v2', title: "Sneaker Grails", seller: "@sole_collector", viewers: "845", category: "ACCESSORIES", image: getImage("Sneaker Grails", 1, "ACCESSORIES") },
  { id: 3, variantClass: 'live-card-v3', title: "Outerwear Grails", seller: "@winter_wardrobe", viewers: "3.4k", category: "CASUAL", image: getImage("Outerwear Grails", 2, "FASHION") },
  { id: 4, variantClass: 'live-card-v4', title: "Gorpcore Basics", seller: "@trail_mix", viewers: "420", category: "CASUAL", image: getImage("Gorpcore Basics", 3, "FASHION") },
  { id: 5, variantClass: 'live-card-v5', title: "Upcycled Denim", seller: "@patch_work", viewers: "115", category: "STREETWEAR", image: getImage("Upcycled Denim", 4, "FASHION") },
  { id: 6, variantClass: 'live-card-v1', title: "Designer Handbags", seller: "@luxe_collector", viewers: "920", category: "ACCESSORIES", image: getImage("Designer Handbags", 5, "ACCESSORIES") },
  { id: 7, variantClass: 'live-card-v2', title: "Retro Gaming Consoles", seller: "@pixel_perfect", viewers: "5.1k", category: "ACCESSORIES", image: getImage("Retro Gaming Consoles", 6, "ELECTRONICS") },
  { id: 8, variantClass: 'live-card-v4', title: "Vintage Band Tees", seller: "@rock_n_roll", viewers: "389", category: "STREETWEAR", image: getImage("Vintage Band Tees", 7, "FASHION") },
  { id: 9, variantClass: 'live-card-v5', title: "Archive Designer Collection", seller: "@vintage_vault", viewers: "2.1k", category: "STREETWEAR", image: getImage("Archive Designer Collection", 8, "FASHION") },
  { id: 10, variantClass: 'live-card-v3', title: "Luxury Bags & Accessories", seller: "@luxe_loop", viewers: "1.5k", category: "ACCESSORIES", image: getImage("Luxury Bags & Accessories", 9, "ACCESSORIES") },
];

export const THRIFT_POLAROIDS = [
  { id: 1, title: "Leather Box Jacket", price: "₹2,499", img: getImage("Leather Box Jacket", 0, "FASHION") },
  { id: 2, title: "Graphic Band Tee", price: "₹899", img: getImage("Graphic Band Tee", 1, "FASHION") },
  { id: 3, title: "Corduroy Trousers", price: "₹1,299", img: getImage("Corduroy Trousers", 2, "FASHION") },
  { id: 4, title: "Knit Sweater", price: "₹1,499", img: getImage("Knit Sweater", 3, "FASHION") },
  { id: 5, title: "Silver Chain", price: "₹699", img: getImage("Silver Chain", 4, "ACCESSORIES") },
  { id: 6, title: "Vintage Cap", price: "₹499", img: getImage("Vintage Cap", 5, "FASHION") },
  { id: 7, title: "Retro Sunglasses", price: "₹899", img: getImage("Retro Sunglasses", 6, "ACCESSORIES") },
  { id: 8, title: "Denim Overall", price: "₹1,899", img: getImage("Denim Overall", 7, "FASHION") },
  { id: 9, title: "Puffer Vest", price: "₹2,199", img: getImage("Puffer Vest", 8, "FASHION") },
  { id: 10, title: "Nylon Mini Bag", price: "₹1,199", img: getImage("Nylon Mini Bag", 9, "ACCESSORIES") },
  { id: 11, title: "Sherpa Trucker Jacket", price: "₹3,499", img: getImage("Sherpa Trucker Jacket", 10, "FASHION") },
  { id: 12, title: "Minimalist Desk Lamp", price: "₹899", img: getImage("Minimalist Desk Lamp", 11, "HOME") },
  { id: 13, title: "Silk Scarf", price: "₹1,299", img: getImage("Silk Scarf", 12, "ACCESSORIES") },
  { id: 14, title: "Vintage Denim Jacket", price: "₹2,899", img: getImage("Vintage Denim Jacket", 13, "FASHION") },
  { id: 15, title: "Mechanical Keyboard", price: "₹4,500", img: getImage("Mechanical Keyboard", 14, "ELECTRONICS") },
];

export const ECOMMERCE_CATEGORIES = [
  { id: 'menswear', title: 'Menswear', items: '450 items', img: getImage("Menswear", 0, "FASHION") },
  { id: 'ladies_wear', title: 'Ladies Wear', items: '620 items', img: getImage("Ladies Wear", 1, "FASHION") },
  { id: 'kids_wear', title: 'Kids Wear', items: '120 items', img: getImage("Kids Wear", 2, "FASHION") },
  { id: 'outerwear', title: 'Outerwear', items: '340 items', img: getImage("Outerwear", 3, "FASHION") },
  { id: 'sneakers', title: 'Sneakers', items: '210 items', img: getImage("Sneakers", 4, "FASHION") },
  { id: 'bags', title: 'Bags', items: '185 items', img: getImage("Bags", 5, "ACCESSORIES") },
  { id: 'dresses', title: 'Dresses', items: '290 items', img: getImage("Dresses", 6, "FASHION") },
  { id: 'jewellery', title: 'Jewellery', items: '420 items', img: getImage("Jewellery", 7, "ACCESSORIES") },
  { id: 'food', title: 'Food Items', items: '55 items', img: getImage("Food Items", 8, "FOOD") }
];

export const FEATURED_DROPS = [
  { id: 1, brand: "LEVI'S VINTAGE", title: "Sherpa Trucker Jacket", size: "Size L", condition: "9/10 Condition", price: "₹3,200", img: getImage("Sherpa Trucker Jacket", 0, "FASHION") },
  { id: 2, brand: "NIKE ARCHIVE", title: "Air Max '97 OG", size: "Size UK 9", condition: "8/10 Condition", price: "₹5,499", img: getImage("Air Max '97 OG", 1, "FASHION") },
  { id: 3, brand: "ZARA STUDIO", title: "Structured Crop Top", size: "One Size", condition: "10/10 Condition", price: "₹2,100", img: getImage("Structured Crop Top", 2, "FASHION") },
  { id: 4, brand: "PRADA ARCHIVE", title: "Nylon Mini Bag", size: "One Size", condition: "9.5/10 Condition", price: "₹18,500", img: getImage("Nylon Mini Bag", 3, "ACCESSORIES") }
];

export const BRANDS_LIST = [
  "Zara Archive", "H&M Studio", "Levi's Vintage", "Ralph Lauren", "Diesel", "Mango", "Prada", "Gucci"
];

export const ECOMMERCE_V2_LIVE_STREAMS = [
  { id: 1, title: "Smart Air Fryer XL", seller: "@chef_gadgets", category: "ELECTRONICS · KITCHEN", viewers: "2.4K", price: "₹3,499", img: getImage("Smart Air Fryer XL", 0, "ELECTRONICS"), icon: "CookingPot" },
  { id: 2, title: "Wireless Earbuds Pro", seller: "@tech_drops", category: "ELECTRONICS", viewers: "1.1K", price: "₹1,999", img: getImage("Wireless Earbuds Pro", 1, "ELECTRONICS"), icon: "Headphones" },
  { id: 3, title: "Homemade Preserve Set", seller: "@kitchen_studio", category: "FOOD · ARTISAN", viewers: "640", price: "₹649", img: getImage("Homemade Preserve Set", 2, "FOOD"), icon: "Flame" },
  { id: 4, title: "Minimalist Desk Lamp", seller: "@home_essentials", category: "HOME · DECOR", viewers: "890", price: "₹1,299", img: getImage("Minimalist Desk Lamp", 3, "HOME"), icon: "Lightbulb" },
  { id: 5, title: "Mechanical Keyboard", seller: "@desk_setup", category: "ELECTRONICS", viewers: "3.2K", price: "₹4,999", img: getImage("Mechanical Keyboard", 4, "ELECTRONICS"), icon: "Keyboard" },
  { id: 6, title: "Ergonomic Lounge Chair", seller: "@living_space", category: "HOME · FURNITURE", viewers: "1.8K", price: "₹8,499", img: getImage("Ergonomic Lounge Chair", 5, "HOME"), icon: "Armchair" },
  { id: 7, title: "Retro Gaming Consoles", seller: "@pixel_perfect", category: "ELECTRONICS", viewers: "5.1K", price: "₹4,200", img: getImage("Retro Gaming Consoles", 6, "ELECTRONICS"), icon: "Gamepad2" },
  { id: 8, title: "Silk Scarf Edition", seller: "@luxe_loop", category: "ACCESSORIES", viewers: "920", price: "₹1,299", img: getImage("Silk Scarf Edition", 7, "ACCESSORIES"), icon: "Shirt" },
];

export const ECOMMERCE_V2_TRENDING = [
  { id: 1, label: "Artisan Chocolate", icon: "Gift" },
  { id: 2, label: "Refurbished Phones", icon: "Smartphone" },
  { id: 3, label: "Indoor Plants", icon: "Sprout" },
  { id: 4, label: "Ceramics", icon: "Gem" },
];

export const ECOMMERCE_V2_CATEGORIES = [
  { id: 'food', title: 'Food & Gourmet', items: '340 items live', icon: 'Utensils', bg: '#f4ede4' },
  { id: 'electronics', title: 'Electronics', items: '210 items live', icon: 'Smartphone', bg: '#e5eff5' },
  { id: 'home', title: 'Home & Living', items: '185 items live', icon: 'Home', bg: '#f2e8f1' },
  { id: 'wellness', title: 'Wellness', items: '160 items live', icon: 'Flower2', bg: '#e8f4eb' },
  { id: 'fashion', title: 'Fashion', items: '420 items live', icon: 'Shirt', bg: '#f5ebe6' },
  { id: 'crafts', title: 'Art & Crafts', items: '120 items live', icon: 'Palette', bg: '#f2f1e6' },
];

export const ECOMMERCE_V2_HOT_RIGHT_NOW = [
  { id: 1, title: "Mango Chilli Preserve", seller: "@kitchen_studio is streaming", category: "FOOD · ARTISAN", details: "200g · Homemade · Limited Batch", badge: "LIVE", badgeColor: "#FF5B22", bg: "#faf6f2", img: getImage("Mango Chilli Preserve", 0, "FOOD") },
  { id: 2, title: "Portable Bluetooth Speaker", seller: "@tech_drops is streaming", category: "ELECTRONICS", details: "Waterproof · 12hr Battery", badge: "40% OFF", badgeColor: "#1A1A1A", bg: "#eff4f8", img: getImage("Portable Bluetooth Speaker", 1, "ELECTRONICS") },
  { id: 3, title: "Rosehip Face Serum", seller: "@pure_roots is streaming", category: "WELLNESS · SKINCARE", details: "30ml · Cold-pressed", badge: "NEW", badgeColor: "#2A8139", bg: "#f8f2f6", img: getImage("Rosehip Face Serum", 2, "WELLNESS") },
  { id: 4, title: "Monstera Deliciosa", seller: "@home_vibes is streaming", category: "HOME · PLANTS", details: "6\" pot · Healthy rooted cutting", badge: "LIVE", badgeColor: "#FF5B22", bg: "#f2f7ef", img: getImage("Monstera Deliciosa", 3, "HOME") },
  { id: 5, title: "Retro Instant Camera", seller: "@photo_vault is streaming", category: "ELECTRONICS", details: "Vintage Yellow · Includes Film", badge: "20% OFF", badgeColor: "#1A1A1A", bg: "#fff7e6", img: getImage("Retro Instant Camera", 4, "ELECTRONICS") },
  { id: 6, title: "Hand Poured Soy Candle", seller: "@scent_studio is streaming", category: "HOME · WELLNESS", details: "Vanilla Bean · 40hr Burn", badge: "LIVE", badgeColor: "#FF5B22", bg: "#f9f6f0", img: getImage("Hand Poured Soy Candle", 5, "HOME") },
  { id: 7, title: "Bamboo Yoga Mat", seller: "@flex_body is streaming", category: "FITNESS", details: "Eco-friendly non-slip", badge: "HOT", badgeColor: "#FF5B22", bg: "#eef5f0", img: getImage("Bamboo Yoga Mat", 6, "WELLNESS") }
];

export const ECOMMERCE_V2_CURATED_PICKS = [
  { id: 1, title: "Artisan Ceramic Mug", seller: "@clay_studio is streaming", category: "HOME · KITCHEN", details: "Handmade · Off-white", badge: "LIVE", badgeColor: "#FF5B22", bg: "#fdf5ea", img: getImage("Artisan Ceramic Mug", 0, "HOME") },
  { id: 2, title: "Linen Lounge Shirt", seller: "@minimalist_threads", category: "FASHION", details: "Size M · Beige", badge: "20% OFF", badgeColor: "#1A1A1A", bg: "#f0efe9", img: getImage("Linen Lounge Shirt", 1, "FASHION") },
  { id: 3, title: "Silver Loop Earrings", seller: "@silversmith is streaming", category: "ACCESSORIES", details: "Handcrafted 925 Silver", badge: "NEW", badgeColor: "#2A8139", bg: "#f2f7f9", img: getImage("Silver Loop Earrings", 2, "ACCESSORIES") },
  { id: 4, title: "Matcha Whisk Set", seller: "@zen_tea is streaming", category: "WELLNESS", details: "Bamboo · Authentic", badge: "LIVE", badgeColor: "#FF5B22", bg: "#eef3eb", img: getImage("Matcha Whisk Set", 3, "WELLNESS") },
  { id: 5, title: "Minimalist Wall Clock", seller: "@time_decor is streaming", category: "HOME · DECOR", details: "Silent Sweep · Matte Black", badge: "15% OFF", badgeColor: "#1A1A1A", bg: "#f5f5f5", img: getImage("Minimalist Wall Clock", 4, "HOME") },
  { id: 6, title: "Leather Card Holder", seller: "@hide_craft is streaming", category: "ACCESSORIES", details: "Full Grain · Tan", badge: "LIVE", badgeColor: "#FF5B22", bg: "#f4edeb", img: getImage("Leather Card Holder", 5, "ACCESSORIES") },
  { id: 7, title: "Organic Cotton Throw", seller: "@cozy_home is streaming", category: "HOME", details: "Queen Size · Handwoven", badge: "RESTOCKED", badgeColor: "#2A8139", bg: "#f8f5f2", img: getImage("Organic Cotton Throw", 6, "HOME") }
];

export const THRIFT_LIVE_DROPS_DATA = [
  { id: 1, badge: "LIVE", tag: "1990s", title: "Sherpa Trucker Jacket", brand: "LEVI'S VINTAGE", details: "Size L · 9/10 · Authenticated", price: "₹3,200", viewers: "640 watching", img: getImage("Sherpa Trucker Jacket", 0, "FASHION") },
  { id: 2, badge: "LIVE", tag: "2000s", title: "Air Max '97 OG", brand: "NIKE ARCHIVE", details: "UK 9 · 8/10 · Original box", price: "₹5,499", viewers: "890 watching", img: getImage("Air Max '97 OG", 1, "FASHION") },
  { id: 3, badge: "LIVE", tag: "Rare", title: "Nylon Mini Bag", brand: "PRADA ARCHIVE", details: "Black · Like New · 1 left", price: "₹12,999", viewers: "1.2K watching", img: getImage("Nylon Mini Bag", 2, "ACCESSORIES") },
  { id: 4, badge: "LIVE", tag: "Vintage", title: "Oversized Leather Jacket", brand: "ALLSAINTS", details: "Size M · 7/10 · Natural fade", price: "₹4,500", viewers: "430 watching", img: getImage("Oversized Leather Jacket", 3, "FASHION") },
  { id: 5, badge: "LIVE", tag: "Streetwear", title: "Box Logo Hoodie", brand: "SUPREME", details: "Size L · 9/10 · Verified", price: "₹8,999", viewers: "2.1K watching", img: getImage("Box Logo Hoodie", 4, "FASHION") },
  { id: 6, badge: "LIVE", tag: "Archive", title: "Canvas Tote Bag", brand: "DIOR", details: "Beige · 8.5/10 Condition", price: "₹14,500", viewers: "950 watching", img: getImage("Canvas Tote Bag", 5, "ACCESSORIES") }
];

export const THRIFT_TRENDING_WEEK_DATA = [
  { id: 1, badge: "LIVE", badgeColor: "#FF5B22", rating: "9/10", brand: "LEVI'S · 1990S", title: "Sherpa Trucker Jacket", details: "Size L · Authenticated", price: "₹3,200", originalPrice: "₹5,000", seller: "@vintage_vault", img: getImage("Sherpa Trucker Jacket", 0, "FASHION") },
  { id: 2, badge: "RARE", badgeColor: "#000", rating: "8/10", brand: "NIKE · 2000S", title: "Air Max '97 OG", details: "UK 9 · Original Box", price: "₹5,499", originalPrice: "₹8,000", seller: "@hype_kicks", img: getImage("Air Max '97 OG", 1, "FASHION") },
  { id: 3, badge: "RARE", badgeColor: "#000", rating: "9.5/10", brand: "PRADA · ARCHIVE", title: "Nylon Mini Bag", details: "Black · 1 left", price: "₹12,999", originalPrice: "", seller: "@luxe_loop", img: getImage("Nylon Mini Bag", 2, "ACCESSORIES") },
  { id: 4, badge: "NEW IN", badgeColor: "#2A8139", rating: "10/10", brand: "RALPH LAUREN · 90S", title: "Leather Driving Gloves", details: "Size M · Brand New", price: "₹1,450", originalPrice: "", seller: "@chic_picks", img: getImage("Leather Driving Gloves", 3, "ACCESSORIES") },
  { id: 5, badge: "LIVE", badgeColor: "#FF5B22", rating: "9/10", brand: "RAY-BAN · VINTAGE", title: "Wayfarer OG", details: "One Size · With case", price: "₹2,100", originalPrice: "₹3,200", seller: "@sole_collector", img: getImage("Wayfarer OG", 4, "ACCESSORIES") },
  { id: 6, badge: "20% OFF", badgeColor: "#551a1a", rating: "10/10", brand: "BURBERRY · CLASSIC", title: "Check Wool Scarf", details: "Beige · Like new", price: "₹4,800", originalPrice: "₹6,000", seller: "@luxe_loop", img: getImage("Check Wool Scarf", 5, "ACCESSORIES") },
  { id: 7, badge: "NEW IN", badgeColor: "#2A8139", rating: "8/10", brand: "ZARA · EARLY 2000S", title: "Structured Crop Top", details: "Size S · Gently used", price: "₹799", originalPrice: "", seller: "@y2k_babe", img: getImage("Structured Crop Top", 6, "FASHION") },
  { id: 8, badge: "RARE", badgeColor: "#000", rating: "9/10", brand: "GUCCI · ARCHIVE", title: "Loafer Mules", details: "EU 38 · Horsebit detail", price: "₹9,500", originalPrice: "", seller: "@vintage_vault", img: getImage("Loafer Mules", 7, "FASHION") }
];

export const THRIFT_TOP_SELLERS_DATA = [
  { id: 1, name: "Vintage Vault", handle: "@vintage_vault", img: "Footprints", followers: "5.2K", rating: "99%", sold: "412", tags: ["Sneakers", "Denim"] },
  { id: 2, name: "Luxe Loop", handle: "@luxe_loop", img: "ShoppingBag", followers: "3.8K", rating: "98%", sold: "290", tags: ["Luxury", "Bags"] },
  { id: 3, name: "Y2K Babe", handle: "@y2k_babe", img: "Shirt", followers: "4.1K", rating: "97%", sold: "358", tags: ["Y2K", "Womenswear"] },
  { id: 4, name: "Hype Kicks", handle: "@hype_kicks", img: "Glasses", followers: "6.4K", rating: "99%", sold: "520", tags: ["Sneakers", "Accessories"] }
];

export const THRIFT_SHOP_EDIT_DATA = [
  { id: 'menswear', title: 'Menswear', items: '450 items', badge: 'HOT', badgeColor: '#FF5B22', bg: '#2b2118', img: getImage("Menswear", 0, "FASHION") },
  { id: 'ladies_wear', title: 'Ladies Wear', items: '620 items', badge: null, bg: '#112217', img: getImage("Ladies Wear", 1, "FASHION") },
  { id: 'sneakers', title: 'Sneakers', items: '210 items', badge: 'NEW', badgeColor: '#FF5B22', bg: '#101223', img: getImage("Sneakers", 2, "FASHION") },
  { id: 'bags', title: 'Bags & Luxury', items: '185 items', badge: null, bg: '#2a1111', img: getImage("Bags & Luxury", 3, "ACCESSORIES") },
  { id: 'accessories', title: 'Accessories', items: '340 items', badge: null, bg: '#131e13', img: getImage("Accessories", 4, "ACCESSORIES") }
];
