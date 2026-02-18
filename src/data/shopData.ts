interface ShopProduct {
  id: string;
  name: string;
  price: number;
  excerpt: string;
  description: string;
  tags: string[];
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  details: string[];
  careInstructions: string;
  relatedProducts: string[];
}

interface ShopCategory {
  id: string;
  title: string;
  description: string;
  items: ShopProduct[];
}

export type { ShopProduct, ShopCategory };

export const shopData: ShopCategory[] = [
  {
    id: "pantry",
    title: "Pantry",
    description: "Chef Antonie's selection of artisanal pantry essentials",
    items: [
      {
        id: "truffle-oil",
        name: "Black Truffle Oil",
        price: 185,
        excerpt:
          "Cold-pressed extra virgin olive oil infused with real black Périgord truffle. A luxurious finishing oil that elevates pasta, risotto, eggs, and salads with intoxicating earthy aroma.",
        description:
          "Crafted in small batches using premium Italian extra virgin olive oil and genuine black Périgord truffle shavings. Unlike many commercial truffle oils that rely on synthetic flavoring, ours contains real truffle pieces visible in every bottle. The cold-pressing process preserves the delicate truffle compounds, delivering an authentic, complex aroma. Chef Antonie uses this exact oil as a finishing touch on our Wild Mushroom Risotto and Beef Carpaccio.",
        tags: ["Pantry", "Premium"],
        image:
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
          "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&q=80",
        ],
        rating: 4.9,
        reviewCount: 87,
        details: [
          "250ml glass bottle",
          "Real black Périgord truffle pieces",
          "Cold-pressed extra virgin olive oil base",
          "Product of Italy",
          "Shelf life: 12 months unopened",
        ],
        careInstructions:
          "Store in a cool, dark place away from direct sunlight. Refrigerate after opening and use within 3 months. Shake gently before use to distribute truffle particles.",
        relatedProducts: ["aged-balsamic", "fleur-de-sel", "cookbook-signed"],
      },
      {
        id: "aged-balsamic",
        name: "25-Year Aged Balsamic",
        price: 220,
        excerpt:
          "Traditionally aged balsamic vinegar from Modena with rich, syrupy texture and complex sweet-tart flavour. The same vinegar used in our Truffle Burrata starter.",
        description:
          "This DOP-certified balsamic vinegar has been aged for a quarter century in a succession of oak, chestnut, cherry, mulberry, and juniper barrels. The result is a thick, syrupy condiment with extraordinary complexity — notes of fig, dark cherry, caramel, and a perfect balance of sweetness and acidity. Each bottle is hand-numbered and comes from a single acetaia in Modena, Italy. Only a few drops are needed to transform a dish.",
        tags: ["Pantry", "Luxury"],
        image:
          "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=800&q=80",
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
          "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&q=80",
        ],
        rating: 4.8,
        reviewCount: 64,
        details: [
          "100ml hand-blown glass bottle",
          "DOP certified from Modena, Italy",
          "Aged 25 years in five different woods",
          "Hand-numbered limited production",
          "Density: 1.30 (extra thick)",
        ],
        careInstructions:
          "Store at room temperature in a dark cupboard. No refrigeration needed. The vinegar will continue to develop in the bottle. Use sparingly — a few drops per dish.",
        relatedProducts: ["truffle-oil", "fleur-de-sel", "olive-oil-reserve"],
      },
      {
        id: "fleur-de-sel",
        name: "Fleur de Sel Collection",
        price: 95,
        excerpt:
          "Hand-harvested French sea salt trio — classic, smoked, and truffle-infused. The finishing salts used across our entire menu to add that final layer of flavour.",
        description:
          "Harvested by hand from the salt marshes of Guérande, Brittany, using traditional methods dating back to the 9th century. This collection includes three varieties: Pure Fleur de Sel with its delicate mineral sweetness, Smoked Fleur de Sel cold-smoked over applewood for 48 hours, and Truffle Fleur de Sel blended with dried black truffle. Each jar contains the 'cream of the salt' — the finest crystals that form on the surface of the evaporation pools.",
        tags: ["Pantry", "Artisanal"],
        image:
          "https://images.unsplash.com/photo-1604697976327-4f28ff459803?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: [
          "https://images.unsplash.com/photo-1604697976327-4f28ff459803?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
        ],
        rating: 4.7,
        reviewCount: 112,
        details: [
          "Three 80g glass jars with cork lids",
          "Pure, Smoked, and Truffle varieties",
          "Hand-harvested from Guérande, Brittany",
          "Unrefined and additive-free",
          "Gift box included",
        ],
        careInstructions:
          "Store in a cool, dry place. Keep lids sealed to prevent moisture absorption. Use as a finishing salt — add after cooking for best flavour and texture.",
        relatedProducts: ["truffle-oil", "aged-balsamic", "pepper-blend"],
      },
      {
        id: "olive-oil-reserve",
        name: "Reserve Extra Virgin Olive Oil",
        price: 145,
        excerpt:
          "Single-estate Tuscan olive oil from 400-year-old trees. Peppery, herbaceous, and bright — the foundation oil of our kitchen used in everything from dressings to finishing.",
        description:
          "Sourced from a single family estate in the hills of Tuscany, this extra virgin olive oil is pressed from hand-picked Frantoio, Leccino, and Moraiolo olives within hours of harvest. The oil has a brilliant green-gold colour, with aromas of fresh grass, artichoke, and green almond. On the palate, it's remarkably complex with a pleasant peppery finish. Chef Antonie considers this the backbone of our kitchen.",
        tags: ["Pantry", "Italian"],
        image:
          "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&q=80",
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
          "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=800&q=80",
        ],
        rating: 4.8,
        reviewCount: 93,
        details: [
          "500ml dark glass bottle",
          "Single estate, Tuscany, Italy",
          "Cold-extracted within 4 hours of harvest",
          "Acidity below 0.2%",
          "Current harvest vintage",
        ],
        careInstructions:
          "Store away from heat and light. Best consumed within 12 months of harvest. Do not refrigerate. The peppery finish indicates high polyphenol content — a sign of quality.",
        relatedProducts: ["truffle-oil", "aged-balsamic", "fleur-de-sel"],
      },
    ],
  },
  {
    id: "kitchen",
    title: "Kitchen Tools",
    description: "Professional-grade tools for the home chef",
    items: [
      {
        id: "japanese-chef-knife",
        name: "Japanese Chef's Knife",
        price: 850,
        excerpt:
          "Hand-forged 8-inch Gyuto knife from Sakai, Japan. 67-layer Damascus steel with a VG-10 core — the same knife Chef Antonie uses daily in our kitchen.",
        description:
          "This Gyuto (chef's knife) is hand-forged by a third-generation blacksmith in Sakai, Japan — the knife-making capital of the world. The blade features 67 layers of Damascus steel folded around a VG-10 stainless core, achieving a Rockwell hardness of 61 for exceptional edge retention. The octagonal rosewood handle is ergonomically shaped for extended use. Each knife takes approximately three weeks to complete and comes with a certificate of authenticity.",
        tags: ["Kitchen", "Premium"],
        image:
          "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80",
          "https://images.unsplash.com/photo-1566454419290-57a0589c9b17?w=800&q=80",
          "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
        ],
        rating: 5.0,
        reviewCount: 48,
        details: [
          "8-inch (210mm) Gyuto blade",
          "67-layer Damascus with VG-10 core",
          "Rockwell hardness: 61 HRC",
          "Octagonal rosewood handle",
          "Includes wooden saya (sheath)",
          "Certificate of authenticity",
        ],
        careInstructions:
          "Hand wash only — never use a dishwasher. Dry immediately after washing. Sharpen on whetstones (1000/3000 grit recommended). Store in the included saya or on a magnetic knife strip. Oil the blade monthly with food-safe mineral oil.",
        relatedProducts: [
          "steak-knife-set",
          "cutting-board",
          "knife-sharpening-set",
        ],
      },
      {
        id: "steak-knife-set",
        name: "Steak Knife Set of 4",
        price: 480,
        excerpt:
          "Set of four hand-forged steak knives with olive wood handles. Identical to the knives on every table at Lumière — razor-sharp with timeless elegance.",
        description:
          "These are the exact steak knives that grace every table at Lumière Dining. Forged from a single piece of high-carbon stainless steel, each knife features a serration-free straight edge that cuts through steak effortlessly without tearing the meat fibres. The handles are turned from 200-year-old Mediterranean olive wood, with each piece exhibiting unique grain patterns. Presented in a handmade walnut box.",
        tags: ["Kitchen", "Signature"],
        image:
          "https://images.unsplash.com/photo-1624290799129-60740e0ffec6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: [
          "https://images.unsplash.com/photo-1624290799129-60740e0ffec6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1592686092916-672fa9e86866?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1690983322345-a848a22bf2f3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        rating: 4.9,
        reviewCount: 76,
        details: [
          "Set of 4 steak knives",
          "High-carbon stainless steel blades",
          "Mediterranean olive wood handles",
          "Straight edge (no serration)",
          "Walnut presentation box",
          "Blade length: 4.5 inches",
        ],
        careInstructions:
          "Hand wash and dry immediately. The straight edge can be honed with a steel rod. Professional sharpening recommended annually. Oil the olive wood handles with mineral oil every few months to maintain their lustre.",
        relatedProducts: [
          "japanese-chef-knife",
          "cutting-board",
          "pepper-blend",
        ],
      },
      {
        id: "cutting-board",
        name: "End-Grain Cutting Board",
        price: 320,
        excerpt:
          "Handcrafted end-grain walnut cutting board with juice groove. A beautiful, knife-friendly surface that doubles as a stunning serving board for cheese and charcuterie.",
        description:
          "Crafted by a local Cape Town woodworker from sustainably sourced American black walnut. The end-grain construction means the wood fibres absorb knife blades rather than being cut by them, preserving both your knife edges and the board surface. Each board is sanded through 7 grits and finished with food-safe mineral oil and beeswax. The integrated juice groove catches liquids when carving meats. No two boards are identical.",
        tags: ["Kitchen", "Artisanal"],
        image:
          "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
          "https://images.unsplash.com/photo-1566454419290-57a0589c9b17?w=800&q=80",
          "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80",
        ],
        rating: 4.8,
        reviewCount: 55,
        details: [
          "American black walnut, end-grain",
          "Dimensions: 45cm × 30cm × 4cm",
          "Integrated juice groove",
          "Finished with mineral oil and beeswax",
          "Handcrafted in Cape Town",
          "Weight: approximately 3.5kg",
        ],
        careInstructions:
          "Hand wash with warm soapy water — never submerge or dishwasher. Dry standing upright. Re-oil monthly with food-safe mineral oil. Sand lightly with fine sandpaper if the surface becomes rough. Avoid prolonged exposure to water.",
        relatedProducts: [
          "japanese-chef-knife",
          "steak-knife-set",
          "knife-sharpening-set",
        ],
      },
      {
        id: "knife-sharpening-set",
        name: "Whetstone Sharpening Set",
        price: 195,
        excerpt:
          "Professional double-sided whetstone set with bamboo base and angle guide. Keep your knives performing at their peak with the same stones our kitchen team uses.",
        description:
          "A complete sharpening system featuring two premium Japanese whetstones: a 1000-grit stone for regular sharpening and a 3000-grit stone for polishing and refining the edge. The non-slip bamboo base holds the stones securely during use. Includes an angle guide for maintaining consistent 15° or 20° angles. Our kitchen team sharpens all knives weekly using this exact set.",
        tags: ["Kitchen", "Essential"],
        image:
          "https://images.unsplash.com/photo-1666013942797-9daa4b8b3b4f?q=80&w=1367&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: [
          "https://images.unsplash.com/photo-1666013942797-9daa4b8b3b4f?q=80&w=1367&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80",
          "https://images.unsplash.com/photo-1609467334293-030ac6448fd8?q=80&w=1125&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        rating: 4.7,
        reviewCount: 41,
        details: [
          "1000/3000 grit double-sided stones",
          "Non-slip bamboo base",
          "Angle guide included",
          "Flattening stone included",
          "Storage case",
          "Instruction booklet with QR code to video tutorial",
        ],
        careInstructions:
          "Soak stones in water for 10–15 minutes before use. Keep the surface wet during sharpening. Flatten the stones regularly using the included flattening stone. Allow to air dry completely before storing.",
        relatedProducts: [
          "japanese-chef-knife",
          "steak-knife-set",
          "cutting-board",
        ],
      },
    ],
  },
  {
    id: "books-gifts",
    title: "Books & Gifts",
    description: "Curated gifts for the food lover in your life",
    items: [
      {
        id: "cookbook-signed",
        name: "Lumière: The Cookbook (Signed)",
        price: 450,
        excerpt:
          "Chef Antonie's debut cookbook featuring 80 recipes from Lumière Dining, personally signed. Beautiful photography, stories behind each dish, and techniques from our kitchen.",
        description:
          "Three years in the making, this hardcover cookbook is a love letter to the art of fine dining at home. Chef Antonie shares 80 recipes spanning starters, mains, desserts, and cocktails — including many dishes from our menu. Each recipe is accompanied by stunning full-page photography shot at Lumière, along with personal stories, technique tips, and wine pairing suggestions. Every copy is personally signed by Chef Antonie with a custom message.",
        tags: ["Books", "Signature"],
        image:
          "https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80",
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
        ],
        rating: 4.9,
        reviewCount: 132,
        details: [
          "Hardcover, 320 pages",
          "80 recipes with full-page photography",
          "Personally signed by Chef Antonie",
          "Dimensions: 28cm × 23cm",
          "Published by Lumière Press",
          "Gift wrapping available",
        ],
        careInstructions:
          "Keep away from kitchen splashes! We recommend using a cookbook stand while cooking. The pages are coated for easy cleaning of minor spills.",
        relatedProducts: ["apron-chef", "pepper-blend", "truffle-oil"],
      },
      {
        id: "apron-chef",
        name: "Lumière Chef's Apron",
        price: 165,
        excerpt:
          "Premium waxed canvas apron with leather straps, embroidered with the Lumière crest. The same apron worn by our kitchen team — built to last a lifetime of cooking.",
        description:
          "Made from heavyweight waxed cotton canvas that develops a beautiful patina with use. The cross-back leather straps distribute weight evenly, eliminating neck strain during long cooking sessions. Features a large front pocket, towel loop, and the Lumière crest embroidered in gold thread. Available in one size with adjustable leather buckles. Each apron is individually waxed and will become more characterful with every use.",
        tags: ["Apparel", "Signature"],
        image:
          "https://images.unsplash.com/photo-1729774096404-e2a83029013f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: [
          "https://images.unsplash.com/photo-1729774096404-e2a83029013f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1729774092024-04d0b3066e1c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1738699302961-b0b5811f5ea1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        rating: 4.8,
        reviewCount: 89,
        details: [
          "Heavyweight waxed cotton canvas",
          "Cross-back leather straps",
          "Adjustable leather buckle closure",
          "Large front pocket and towel loop",
          "Lumière crest embroidered in gold",
          "One size fits most",
        ],
        careInstructions:
          "Spot clean with a damp cloth. Do not machine wash or dry clean — this will remove the wax coating. Re-wax annually with a canvas wax bar for continued water resistance. The leather straps will soften and darken naturally with use.",
        relatedProducts: ["cookbook-signed", "gift-voucher", "pepper-blend"],
      },
      {
        id: "gift-voucher",
        name: "Lumière Gift Voucher",
        price: 500,
        excerpt:
          "A beautifully presented gift voucher for dining at Lumière. Delivered in a branded envelope with a personalised message card. Valid for 12 months.",
        description:
          "The perfect gift for food lovers. This R500 voucher can be used for dining, drinks, or shop purchases at Lumière. Presented in a premium envelope with the Lumière seal, along with a personalised message card. The voucher is valid for 12 months from the date of purchase and can be used across multiple visits. Available in denominations of R500, R1000, and R2000.",
        tags: ["Gift", "Experience"],
        image:
          "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&q=80",
          "https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80",
          "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&q=80",
        ],
        rating: 4.9,
        reviewCount: 203,
        details: [
          "R500 value (other denominations available)",
          "Valid for 12 months",
          "Use for dining, drinks, or shop purchases",
          "Personalised message card included",
          "Premium branded envelope",
          "Can be used across multiple visits",
        ],
        careInstructions:
          "Keep the voucher code safe. Lost vouchers cannot be replaced. Contact info@lumieredining.com for balance enquiries or to request a different denomination.",
        relatedProducts: ["cookbook-signed", "apron-chef", "truffle-oil"],
      },
      {
        id: "pepper-blend",
        name: "Chef's Pepper Blend",
        price: 75,
        excerpt:
          "House-made five-pepper blend in a refillable grinder. Black, white, green, pink, and Sichuan peppercorns — the secret blend used across our entire menu.",
        description:
          "Chef Antonie's proprietary five-pepper blend is the secret behind the nuanced heat in many of our dishes. The blend combines Tellicherry black pepper for robust warmth, Muntok white pepper for earthy sharpness, freeze-dried green pepper for freshness, pink peppercorns for floral sweetness, and Sichuan peppercorns for a subtle tingly numbing sensation. Packaged in a ceramic grinder with an adjustable mechanism for fine or coarse grinding.",
        tags: ["Pantry", "Essential"],
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
          "https://images.unsplash.com/photo-1621317758612-3958e0f07c49?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
        ],
        rating: 4.6,
        reviewCount: 158,
        details: [
          "100g five-pepper blend",
          "Ceramic grinder with adjustable mechanism",
          "Tellicherry, Muntok, green, pink, Sichuan",
          "Refill bags available separately",
          "Hand-blended at Lumière",
        ],
        careInstructions:
          "Store in a cool, dry place. The ceramic grinder mechanism never wears out and won't corrode. Refill bags are available through our website. For maximum flavour, grind fresh over your dish.",
        relatedProducts: ["fleur-de-sel", "truffle-oil", "olive-oil-reserve"],
      },
    ],
  },
];
