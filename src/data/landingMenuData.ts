interface MenuItem {
  name: string;
  price: number;
  excerpt: string;
  description: string;
  tags: string[];
  image: string;
}

interface MenuSection {
  id: string;
  title: string;
  description: string;
  items: MenuItem[];
}

export const landingMenuData: MenuSection[] = [
  {
    id: "starters",
    title: "Starters",
    description: "Light bites to awaken your taste buds",
    items: [
      {
        name: "Seared Scallops",
        price: 28,
        excerpt:
          "Pan-seared diver scallops with cauliflower purée, crispy pancetta, and microgreens drizzled with brown butter sauce. A delicate balance of ocean sweetness and earthy richness that melts on your palate.",
        description:
          "Our signature seared scallops showcase the finest day-boat catch from the Atlantic coast. Each U10 scallop is hand-selected for its size and sweetness, then perfectly seared to achieve a golden caramelized crust while maintaining a tender, buttery interior. The dish is elevated with a silky cauliflower purée that provides a subtle, creamy foundation, complemented by crispy pancetta that adds a satisfying textural contrast and smoky depth. Fresh microgreens add a peppery brightness, while our house-made brown butter sauce, infused with thyme and lemon, ties everything together. This dish represents our commitment to celebrating pure, quality ingredients with minimal intervention, allowing the natural sweetness of the scallops to shine through. Perfect as an opening act to your dining experience, this dish sets the tone for the culinary journey ahead. Each element is carefully composed to create a harmonious balance of flavors and textures that will awaken your palate.",
        tags: ["Seafood", "Gluten-Free"],
        image:
          "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
      },
      {
        name: "Truffle Burrata",
        price: 24,
        excerpt:
          "Creamy burrata cheese with black truffle shavings, heirloom tomatoes, and aged balsamic on grilled sourdough. An indulgent celebration of Italian craftsmanship with luxurious truffle aromatics.",
        description:
          "Experience the pinnacle of Italian cheesemaking with our handcrafted burrata, flown in twice weekly from Puglia. This delicate cheese, with its cream-filled center, is adorned with generous shavings of black Périgord truffle, creating an intoxicating aroma that announces the dish before it reaches your table. We pair this with peak-season heirloom tomatoes from local farms, each variety selected for its unique flavor profile and vibrant color. The tomatoes are marinated in extra virgin olive oil with fresh basil to enhance their natural sweetness. A drizzle of 25-year aged balsamic vinegar from Modena adds complexity with its syrupy texture and notes of fig and cherry. The dish is served with house-made sourdough, grilled to achieve the perfect char and crunch. This starter is our homage to the simplicity of Italian cuisine, where quality ingredients speak for themselves. It's a dish that changes with the seasons, always showcasing the best produce available.",
        tags: ["Vegetarian", "Premium"],
        image:
          "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80",
      },
      {
        name: "Tuna Tartare",
        price: 26,
        excerpt:
          "Yellowfin tuna with avocado, crispy wonton, sesame oil, and wasabi aioli. Fresh, vibrant, and beautifully balanced with Asian-inspired flavors that dance across your taste buds.",
        description:
          "Our tuna tartare is a masterclass in precision and freshness. We source sushi-grade yellowfin tuna, selecting only the deep red loin meat for its superior flavor and texture. The tuna is hand-diced into perfect cubes and gently tossed with toasted sesame oil, creating a nutty undertone that enhances the fish's natural richness. Creamy Hass avocado adds a luxurious texture, while finely diced shallots and fresh cilantro provide aromatic complexity. The dish is crowned with crispy wonton chips that we fry to order, offering a satisfying crunch that contrasts beautifully with the silky tuna. Our house-made wasabi aioli brings a gentle heat that builds slowly, never overwhelming the delicate fish. A finishing touch of microgreens and black sesame seeds adds visual appeal and subtle flavor notes. This dish represents the fusion of Japanese technique with California freshness, creating a starter that's both refined and exciting. It's perfect for those who appreciate raw fish preparations and bold, clean flavors.",
        tags: ["Raw", "Spicy"],
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      },
      {
        name: "Foie Gras Torchon",
        price: 32,
        excerpt:
          "Silky foie gras with fig compote, toasted brioche, and sea salt. An opulent French classic that exemplifies luxury dining with every rich, buttery bite.",
        description:
          "This is French gastronomy at its finest. We prepare our foie gras torchon using traditional techniques passed down through generations of French chefs. Grade A duck foie gras is carefully deveined, seasoned with Sauternes, cognac, and a touch of quatre épices, then wrapped in cheesecloth and gently poached to achieve a silky, spreadable texture. After aging for several days to develop its complex flavors, the foie gras is sliced and served at the perfect temperature to showcase its buttery richness. We pair it with our house-made fig compote, which balances the richness with natural sweetness and acidity. The accompanying brioche is baked fresh daily and toasted to order, providing a warm, slightly crispy vehicle for the foie gras. A sprinkle of fleur de sel and a drizzle of aged balsamic reduction complete this indulgent dish. This preparation respects the ingredient's quality while showcasing classical French technique. It's a dish that demands attention and appreciation, perfect for those special occasions when only the finest will do.",
        tags: ["Luxury", "French"],
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      },
      {
        name: "Oysters Rockefeller",
        price: 22,
        excerpt:
          "Six fresh oysters baked with spinach, Pernod, and parmesan crust. A New Orleans classic that transforms briny oysters into a warm, herbaceous delicacy.",
        description:
          "Named after John D. Rockefeller and created at Antoine's Restaurant in 1899, this iconic dish represents American culinary history. We source our oysters daily from pristine waters, selecting only the plumpest specimens. Each oyster is carefully shucked and nestled in its shell with a carefully composed mixture of fresh spinach, shallots, and herbs. The spinach is blanched and finely chopped, then combined with butter, breadcrumbs, and a splash of Pernod, which adds a subtle anise flavor that complements the oyster's brininess. A generous amount of freshly grated parmesan creates a golden, crispy topping when baked. The oysters are cooked just until the edges curl and the topping turns golden, ensuring the oyster remains tender and juicy. Each bite offers a perfect contrast between the crispy, savory crust and the succulent oyster beneath. This dish bridges the gap between raw and cooked oyster preparations, offering something special for both oyster enthusiasts and those new to these ocean gems.",
        tags: ["Seafood", "Classic"],
        image:
          "https://images.unsplash.com/photo-1626197031507-c17099753214?w=800&q=80",
      },
      {
        name: "Beef Carpaccio",
        price: 25,
        excerpt:
          "Thinly sliced wagyu beef with arugula, parmesan shavings, and truffle oil. A refined Italian preparation that celebrates the quality of premium beef in its purest form.",
        description:
          "Our beef carpaccio is a testament to the quality of ingredients and the skill of our kitchen team. We use only certified wagyu beef tenderloin, renowned for its marbling and buttery texture. The beef is trimmed, wrapped tightly, and frozen just enough to allow for paper-thin slicing using our deli slicer. Each slice is carefully arranged on a chilled plate, creating an elegant presentation. The beef is topped with fresh arugula, providing a peppery bite that cuts through the richness. Aged Parmigiano-Reggiano is shaved tableside, adding nutty, salty notes. A drizzle of white truffle oil adds earthy aromatics without overwhelming the delicate beef. We finish with a squeeze of fresh lemon, extra virgin olive oil, and a pinch of flaky sea salt. The acid from the lemon and the richness of the oil create a natural dressing that enhances rather than masks the beef's flavor. This dish must be eaten immediately to appreciate the beef at its optimal temperature and texture. It's an elegant choice for those who appreciate raw preparations and premium ingredients.",
        tags: ["Raw", "Premium"],
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      },
      {
        name: "Lobster Bisque",
        price: 20,
        excerpt:
          "Rich lobster bisque with cognac cream and fresh tarragon. A velvety French soup that captures the essence of the sea in every luxurious spoonful.",
        description:
          "This is not just soup; it's liquid luxury. Our lobster bisque begins with whole Maine lobsters, which we cook and then carefully extract every bit of meat and flavor. The shells are roasted until fragrant, then simmered for hours with aromatic vegetables, tomato paste, white wine, and fish stock to create an intensely flavored base. This stock is strained multiple times to achieve perfect clarity and smoothness. We then enrich the bisque with heavy cream and finish it with a splash of cognac, which adds depth and warmth. Fresh tarragon provides an anise-like note that complements the sweet lobster meat. The bisque is blended until silky smooth and seasoned carefully to balance richness with brightness. Each serving is garnished with chunks of tender lobster meat and a swirl of cream. The texture is velvety, the flavor is deeply marine yet refined, and the color is a beautiful coral pink. This soup represents hours of work and pounds of lobster, all concentrated into a bowl of pure indulgence. It's comfort food elevated to fine dining standards.",
        tags: ["Seafood", "Soup"],
        image:
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
      },
      {
        name: "Grilled Octopus",
        price: 29,
        excerpt:
          "Tender octopus with chorizo, fingerling potatoes, and smoked paprika aioli. A Mediterranean-inspired dish where smoke, spice, and seafood create perfect harmony.",
        description:
          "Our grilled octopus is a labor of love that begins with proper preparation. We source whole Spanish octopus, which we tenderize through a slow-cooking process that can take up to two hours. The octopus is poached gently in court-bouillon with wine, bay leaves, and peppercorns until fork-tender. Once cooled, we marinate the tentacles in olive oil, garlic, and lemon before grilling over high heat to achieve beautiful char marks and crispy edges while maintaining a tender interior. The octopus is served with thin slices of Spanish chorizo, which we crisp up to release their paprika-infused oils. Fingerling potatoes are roasted until golden and crispy, providing an earthy counterpoint to the seafood. Our smoked paprika aioli ties everything together with its creamy texture and smoky-garlicky flavor profile. Fresh parsley and lemon wedges brighten the dish, while a drizzle of quality olive oil adds richness. This dish showcases Mediterranean cooking at its best, where simple techniques and quality ingredients create something extraordinary. The textural contrast between crispy, charred exterior and tender interior makes every bite exciting.",
        tags: ["Seafood", "Smoky"],
        image:
          "https://images.unsplash.com/photo-1605351868548-f0db8d34e5c5?w=800&q=80",
      },
      {
        name: "Duck Confit Spring Rolls",
        price: 23,
        excerpt:
          "Crispy spring rolls filled with duck confit, served with hoisin reduction. An East-meets-West fusion that transforms French technique into an Asian-inspired appetizer.",
        description:
          "This dish represents culinary fusion at its most successful, marrying French technique with Asian presentation. We begin with whole duck legs, which are salted and left to cure overnight. The legs are then cooked slowly in their own fat until the meat is fall-off-the-bone tender—a process that takes several hours. Once cooled, the meat is shredded and mixed with finely diced shiitake mushrooms, scallions, ginger, and five-spice powder. This filling is wrapped in delicate rice paper along with vermicelli noodles and julienned vegetables, creating a perfect cylinder. The spring rolls are then fried until golden and crispy, with a shell that shatters pleasingly when bitten. They're served with a house-made hoisin reduction that we infuse with star anise and orange, creating a sweet-savory sauce with complex aromatics. Fresh cilantro, mint, and Thai basil are served alongside, allowing guests to customize each bite. The contrast between the crispy exterior and the rich, tender duck filling creates an irresistible textural experience. This dish proves that respecting both culinary traditions while creating something new can result in something truly special.",
        tags: ["Fusion", "Crispy"],
        image:
          "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80",
      },
      {
        name: "Wild Mushroom Risotto",
        price: 21,
        excerpt:
          "Creamy arborio rice with porcini, shiitake, and white truffle oil. An earthy, luxurious vegetarian dish that showcases the depth and complexity of forest mushrooms.",
        description:
          "Our wild mushroom risotto is a vegetarian dish that rivals any meat-based preparation in complexity and satisfaction. We use Carnaroli rice from Piedmont, which has an even higher starch content than arborio, creating an exceptionally creamy texture. The rice is toasted in butter until each grain is coated, then we add white wine to deglaze before beginning the slow addition of mushroom stock. This stock is made by simmering dried porcini mushrooms for hours, extracting their intense, earthy flavor. As the rice cooks, we continuously stir and add stock ladle by ladle, allowing each addition to be absorbed before adding more. This process takes about 20 minutes and requires constant attention. Meanwhile, we sauté a mix of fresh wild mushrooms—shiitake, oyster, and cremini—in butter and garlic. These are folded into the risotto along with grated Parmigiano-Reggiano and a final knob of butter for extra richness. The dish is finished with a drizzle of white truffle oil and fresh thyme. The result is a risotto that's creamy but not heavy, with distinct rice grains suspended in a velvety sauce, studded with meaty mushrooms throughout.",
        tags: ["Vegetarian", "Creamy"],
        image:
          "https://images.unsplash.com/photo-1476124369491-540673dcbc99?w=800&q=80",
      },
    ],
  },
  {
    id: "mains",
    title: "Main Courses",
    description: "Hearty dishes featuring premium ingredients",
    items: [
      {
        name: "Chilean Sea Bass",
        price: 48,
        excerpt:
          "Pan-seared sea bass with lemon butter, asparagus, and saffron risotto. A refined seafood entrée where delicate fish meets luxurious golden risotto in perfect harmony.",
        description:
          "Chilean sea bass, also known as Patagonian toothfish, is prized for its buttery texture and mild, sweet flavor. We source our fish from sustainable fisheries, ensuring both quality and environmental responsibility. Each portion is carefully portioned from the thick center of the fillet, ensuring even cooking. The fish is seasoned simply with salt and white pepper, then seared skin-side down in a hot pan until the skin becomes crispy and golden. We flip it briefly to finish cooking, keeping the interior moist and flaky. The fish is served atop a bed of saffron risotto, made with Spanish saffron threads that infuse the rice with their distinctive golden color and delicate floral notes. Fresh asparagus spears are blanched until tender-crisp and finished with butter. The dish is completed with a classic lemon-butter sauce, which we mount with cold butter and fresh lemon juice to create a glossy, emulsified sauce that adds richness without overwhelming the delicate fish. This is sophisticated seafood cookery that lets quality ingredients shine while demonstrating classical technique. Every element on the plate has a purpose and contributes to the overall harmony of the dish.",
        tags: ["Seafood", "Signature"],
        image:
          "https://images.unsplash.com/photo-1523218689796-d4c2ef4f3d72?q=80&w=1170&auto=format&fit=crop",
      },
      {
        name: "Herb-Crusted Lamb Rack",
        price: 52,
        excerpt:
          "New Zealand lamb rack with rosemary crust, mint demi-glace, and roasted vegetables. Premium lamb showcasing the perfect balance of herbaceous crust and tender, pink meat.",
        description:
          "Our lamb racks are sourced from New Zealand, where sheep graze on pristine pastures, resulting in meat that's tender, flavorful, and free from gaminess. Each rack is French-trimmed, with the bones meticulously cleaned for an elegant presentation. We begin by searing the lamb on all sides to develop a rich, caramelized crust. The rack is then coated with Dijon mustard, which helps the herb crust adhere while adding a subtle tang. Our herb crust is a mixture of fresh breadcrumbs, minced rosemary, thyme, garlic, and parsley, combined with melted butter to bind everything together. The crusted lamb is roasted at high temperature until medium-rare, with an internal temperature of 135°F, ensuring the meat remains pink and juicy while the crust becomes golden and aromatic. The lamb is served with a mint demi-glace, a classic pairing that we execute by reducing lamb stock and red wine until syrupy, then finishing with fresh mint. Seasonal roasted vegetables—carrots, parsnips, and brussels sprouts—accompany the dish, each roasted until caramelized. This is a show-stopping main course that combines French technique with British tradition.",
        tags: ["Premium", "Roasted"],
        image:
          "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
      },
      {
        name: "Duck Breast à l'Orange",
        price: 45,
        excerpt:
          "Pan-roasted duck breast with orange glaze, wild rice, and braised endive. A classic French preparation that elevates duck with sweet citrus and bitter greens.",
        description:
          "This dish is our interpretation of canard à l'orange, one of France's most celebrated classics. We use Moulard duck breasts, prized for their size and flavor. The preparation begins by scoring the skin in a crosshatch pattern, which allows the fat to render properly during cooking. The breast is placed skin-side down in a cold pan, then heated gradually to render the fat and crisp the skin—a process that takes patience and attention. Once the skin is golden and crispy, we flip the breast briefly to sear the meat side, then finish it in the oven to medium-rare. Meanwhile, we prepare our orange sauce by reducing fresh orange juice with sugar until caramelized, then adding duck stock and a splash of Grand Marnier. The sauce is finished with butter and orange zest for bright citrus notes. The duck is served sliced, revealing the perfectly pink interior, alongside wild rice pilaf cooked with shallots and thyme. Belgian endive is braised in butter and chicken stock until tender and slightly caramelized, its natural bitterness providing a perfect counterpoint to the sweet sauce and rich duck. This dish demonstrates how traditional French cuisine achieves perfect balance through contrasting flavors.",
        tags: ["French", "Classic"],
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
      },
      {
        name: "Lobster Thermidor",
        price: 68,
        excerpt:
          "Whole Maine lobster with brandy cream sauce, gruyère, and pommes purée. An opulent French classic that transforms fresh lobster into the ultimate indulgence.",
        description:
          "Lobster Thermidor is the pinnacle of French luxury dining, and our version honors this storied dish's tradition while showcasing contemporary technique. We begin with live Maine lobsters, each weighing approximately two pounds. The lobsters are humanely dispatched, then split and grilled to achieve light char marks. The meat is removed and cubed, then combined with a rich sauce made from shallots, white wine, mustard, and heavy cream, finished with a splash of cognac for depth. This mixture is returned to the lobster shells along with sautéed mushrooms. The filled shells are topped with a mixture of gruyère cheese and breadcrumbs, then gratinéed under our broiler until golden and bubbling. The result is a dish where the sweet lobster meat is enrobed in a creamy, savory sauce with a crispy, cheesy top. We serve this with classic pommes purée—French mashed potatoes enriched with butter and cream until impossibly smooth and rich. Haricots verts are blanched and tossed with butter to provide a fresh, green element. This is celebration food, perfect for anniversaries and special occasions when only the most extravagant will do.",
        tags: ["Seafood", "Luxury"],
        image:
          "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&q=80",
      },
      {
        name: "Beef Wellington",
        price: 62,
        excerpt:
          "Filet mignon wrapped in mushroom duxelles and puff pastry with red wine reduction. A legendary British dish that requires precision and rewards with layers of flavor.",
        description:
          "Beef Wellington is one of the most technically challenging dishes in classical cuisine, and we prepare it with meticulous attention to detail. We start with center-cut beef tenderloin, the most tender cut of beef. The meat is seasoned and seared quickly on all sides to develop color, then brushed with Dijon mustard. Next comes the duxelles—a mixture of finely minced mushrooms cooked down with shallots, thyme, and brandy until all moisture has evaporated, creating an intensely flavored paste. This is spread over the beef. The beef is then wrapped in thin slices of prosciutto, which adds saltiness and helps keep the puff pastry crisp. Finally, everything is encased in French puff pastry, which we brush with egg wash for a golden finish. The Wellington is baked at high temperature until the pastry is crispy and golden while the beef remains medium-rare. We serve this with a red wine reduction made from cabernet, beef stock, and shallots, reduced until syrupy. Each slice reveals the beautiful layers: golden pastry, prosciutto, earthy duxelles, and perfectly pink beef. This is special-occasion dining at its finest.",
        tags: ["Premium", "Classic"],
        image:
          "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&q=80",
      },
      {
        name: "Pan-Seared Halibut",
        price: 44,
        excerpt:
          "Fresh halibut with brown butter, capers, haricots verts, and fingerling potatoes. Clean, classic flavors that honor the delicate nature of this premium white fish.",
        description:
          "Halibut is one of the most prized white fish, known for its firm, meaty texture and mild, sweet flavor. We source Pacific halibut from Alaskan waters, where sustainable fishing practices ensure both quality and environmental responsibility. Each portion is cut from thick fillet sections, ensuring even cooking. The fish is seasoned simply with salt and white pepper, then seared in a very hot pan with clarified butter until a golden crust forms. We flip it carefully to finish cooking, timing it precisely to keep the interior moist and flaky. The star of this dish is the brown butter sauce, which we prepare by cooking butter until the milk solids caramelize, creating a nutty, complex flavor. We add capers for briny pops of flavor and fresh lemon juice for brightness. The halibut is served with haricots verts that are blanched until tender-crisp, maintaining their vibrant green color and subtle snap. Fingerling potatoes are roasted with olive oil and herbs until crispy on the outside and creamy inside. This dish exemplifies restraint in cooking—allowing quality ingredients to speak for themselves while applying just enough technique to elevate them. It's perfect for those who appreciate subtle, refined flavors over bold statements.",
        tags: ["Seafood", "Light"],
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
      },
      {
        name: "Osso Buco",
        price: 46,
        excerpt:
          "Braised veal shank with gremolata, saffron risotto, and roasted root vegetables. A Northern Italian classic where slow-braising transforms tough cuts into fall-apart tenderness.",
        description:
          "Osso Buco, literally meaning 'bone with a hole,' is a Milanese specialty that showcases the magic of slow-braising. We use veal shanks cut crosswise, each piece featuring the marrow-filled bone at the center. The shanks are generously seasoned and dredged in flour before being browned in a hot pan to develop deep color and flavor. They're then braised in a mixture of white wine, veal stock, tomatoes, and aromatic vegetables—carrot, celery, and onion—for three to four hours until the meat is so tender it practically falls off the bone. The braising liquid is reduced into a rich, glossy sauce. We serve the osso buco atop saffron risotto, its creamy texture the perfect vehicle for the luxurious sauce. The dish is finished with gremolata, a traditional Italian condiment of finely chopped parsley, lemon zest, and garlic that adds brightness and cuts through the richness. Seasonal roasted root vegetables—parsnips, carrots, and turnips—provide earthy sweetness. The prized marrow in the center of the bone is meant to be scooped out and enjoyed, adding an extra dimension of richness. This is comfort food elevated to fine dining, perfect for cold evenings.",
        tags: ["Italian", "Braised"],
        image:
          "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80",
      },
      {
        name: "Wild Salmon Provençal",
        price: 42,
        excerpt:
          "Atlantic salmon with tomatoes, olives, capers, and herbed couscous. A Mediterranean preparation that celebrates summer flavors with fresh, vibrant ingredients.",
        description:
          "This dish transports you to the sun-drenched south of France, where simple ingredients combine to create something magical. We use wild-caught Atlantic salmon, prized for its deep color and rich flavor. The fillet is pan-seared skin-side down until crispy, then finished in the oven to keep the interior moist and slightly translucent. The Provençal preparation features a sauce of fresh tomatoes that we quickly sauté with garlic and olive oil, along with Kalamata olives for briny depth and capers for tang. Fresh basil and thyme add aromatic notes. The sauce is light and fresh, allowing the salmon's natural flavor to remain the star. We serve this with pearl couscous, which we cook like pasta then toss with lemon zest, herbs, and olive oil. Steamed haricots verts add a green vegetable component. The dish is finished with a drizzle of high-quality extra virgin olive oil and a scatter of fresh herbs. This is Mediterranean cooking at its best—simple preparations that highlight quality ingredients, with bright, clean flavors that feel healthy yet satisfying. It's perfect for those seeking lighter fare without sacrificing flavor or sophistication.",
        tags: ["Seafood", "Mediterranean"],
        image:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
      },
      {
        name: "Chicken Supreme",
        price: 38,
        excerpt:
          "Sous-vide chicken breast with morel cream sauce, asparagus, and potato gratin. Classic French technique meets modern cooking methods for perfectly tender chicken.",
        description:
          "The term 'supreme' in French cuisine refers to a boneless, skin-on chicken breast, and our preparation elevates this humble cut to fine dining standards. We use free-range chicken, which offers superior flavor and texture. The chicken breast is carefully separated with the wing bone attached for dramatic presentation. Using sous-vide technique, we cook the chicken in a precisely controlled water bath at 145°F for one hour, ensuring it remains incredibly juicy throughout. After the sous-vide bath, we quickly sear the skin in a hot pan to achieve golden crispiness. The morel cream sauce is a seasonal luxury, made with fresh morel mushrooms that are sautéed in butter, then simmered in chicken stock and cream. The earthy, nutty flavor of morels is incomparable and transforms this dish into something special. Fresh asparagus spears are blanched and finished with butter, maintaining their vibrant color and subtle crunch. The potato gratin features thin-sliced potatoes layered with cream, garlic, and gruyère cheese, baked until golden and bubbling. This dish demonstrates how modern technology and classical technique can work together, creating a main course that's both comforting and elegant.",
        tags: ["Classic", "Creamy"],
        image:
          "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
      },
      {
        name: "Venison Medallions",
        price: 55,
        excerpt:
          "Pan-seared venison with blackberry reduction, brussels sprouts, and sweet potato purée. Wild game elegantly prepared, showcasing autumn's finest flavors and ingredients.",
        description:
          "Venison offers a unique dining experience, with its deep, rich flavor and lean, tender texture when properly prepared. We source our venison from sustainable farms where deer are raised naturally, resulting in meat that's flavorful without being gamey. The loin is carefully trimmed and portioned into medallions, which are seasoned and seared in a very hot pan to develop a caramelized crust while keeping the interior rosy pink. Venison should be served medium-rare to preserve its tenderness and flavor. Our blackberry reduction begins with fresh or frozen blackberries, which we cook down with red wine, shallots, and a touch of sugar until syrupy and intense. This fruity sauce complements the venison's richness while adding a beautiful color and slight tartness. Brussels sprouts are halved and roasted until their outer leaves are crispy and caramelized, their natural sweetness enhanced by the browning. Sweet potato purée, enriched with butter and a hint of cinnamon, provides a smooth, sweet element that balances the bold flavors. This is an autumn dish that celebrates seasonal ingredients and the pleasures of game meat, perfect for adventurous diners seeking something different from typical steakhouse fare.",
        tags: ["Game", "Seasonal"],
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      },
    ],
  },
  {
    id: "grill",
    title: "From the Grill",
    description: "Prime cuts cooked to perfection over charcoal",
    items: [
      {
        name: "Wagyu Ribeye",
        price: 95,
        excerpt:
          "16oz Japanese A5 wagyu ribeye with garlic butter, served with truffle fries. The ultimate steak experience featuring the world's most marbled, luxurious beef.",
        description:
          "This is the pinnacle of beef—authentic Japanese A5 wagyu from Miyazaki prefecture. The marbling score of 10+ creates a steak that's more fat than muscle, resulting in unprecedented tenderness and flavor. Each ribeye is hand-selected and aged for 21 days to intensify the flavor. We cook the steak over our charcoal grill, which imparts a subtle smokiness while the high heat creates a caramelized crust. The interior fat melts as it cooks, essentially basting the meat from within. We finish the steak with compound butter infused with roasted garlic and fresh herbs. The wagyu is served with truffle fries—hand-cut potatoes twice-fried until crispy, then tossed with white truffle oil, parmesan, and fresh parsley. A simple watercress salad dressed with lemon provides a light, peppery contrast to the rich beef. This is beef at its most luxurious, with a buttery texture and umami-rich flavor that's truly unforgettable. The experience is almost overwhelming in its richness—this is celebration food for true beef connoisseurs who want to experience the absolute best.",
        tags: ["Premium", "Signature"],
        image:
          "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
      },
      {
        name: "Tomahawk Steak",
        price: 110,
        excerpt:
          "32oz dry-aged bone-in ribeye for two, with chimichurri and roasted vegetables. A dramatic presentation of prime beef, perfect for sharing and celebrating.",
        description:
          "The Tomahawk is named for its resemblance to a Native American axe, with the long rib bone forming the handle. This is a 32-ounce dry-aged, bone-in ribeye that's been aged for 45 days in our temperature and humidity-controlled aging room. The aging process concentrates the beef's flavor while enzymes break down muscle fibers, creating incomparable tenderness. The extended bone adds visual drama and contributes subtle flavor during cooking. We season the steak generously with coarse salt and cracked black pepper, then grill it over hardwood charcoal, which imparts a distinctive smoky flavor. The bone acts as an insulator, allowing the meat near it to cook more slowly. After grilling, we rest the steak for 10 minutes to allow juices to redistribute. We serve it with bright, herbaceous chimichurri—a sauce of parsley, cilantro, garlic, olive oil, and vinegar that cuts through the beef's richness. The plate is completed with a selection of charred seasonal vegetables. This is a showstopper meant for sharing, combining exceptional beef with dramatic presentation and bold flavors.",
        tags: ["Premium", "Shareable"],
        image:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
      },
      {
        name: "Filet Mignon",
        price: 58,
        excerpt:
          "8oz center-cut tenderloin with peppercorn crust and béarnaise sauce. The most tender cut of beef, prepared classically and served with luxurious French accompaniments.",
        description:
          "The filet mignon is cut from the beef tenderloin, the most tender muscle in the animal because it does minimal work. We source prime grade beef and cut thick 8-ounce portions from the center of the tenderloin, where the diameter is most consistent. The steaks are coated with crushed black, pink, and green peppercorns, creating a flavorful crust that provides textural contrast and a gentle heat. We sear the filet at high temperature to develop a crust, then finish it in the oven to your preferred doneness. The meat is incredibly tender, requiring almost no chewing, with a mild, clean beef flavor. We serve it with classic béarnaise sauce—an emulsion of egg yolks, butter, white wine vinegar, and fresh tarragon. This rich, tangy sauce is the perfect complement to the lean filet. The plate is completed with roasted asparagus and potato galette—thin slices of potato layered and pan-fried until crispy. This is refined steakhouse dining that showcases quality beef with minimal fuss and maximum elegance. Perfect for those who prioritize tenderness above all else.",
        tags: ["Classic", "Tender"],
        image:
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
      },
      {
        name: "New York Strip",
        price: 52,
        excerpt:
          "14oz prime strip steak with herb butter and crispy onion strings. A bold, beefy cut that delivers intense flavor with every bite.",
        description:
          "The New York strip, cut from the short loin, offers a perfect balance of tenderness and flavor. Unlike the ultra-tender filet, the strip has enough marbling and texture to deliver robust beef flavor with satisfying chew. We source prime grade strip steaks, selecting cuts with generous marbling throughout. Each 14-ounce steak is seasoned simply with coarse salt and freshly cracked black pepper, allowing the beef's natural flavor to shine. We grill the steak over high heat to develop a dark, caramelized crust while maintaining the desired internal temperature. The result is a steak with a crusty exterior and juicy, pink interior. We top it with compound herb butter that melts into the hot steak, creating a luxurious sauce. The butter is infused with fresh rosemary, thyme, and garlic. Crispy onion strings—thin-sliced onions dredged in seasoned flour and fried until golden—add a satisfying crunch and sweet onion flavor. We serve this with steak fries and grilled broccolini. This is a classic American steakhouse preparation that celebrates beef in its purest, most satisfying form.",
        tags: ["Classic", "Bold"],
        image:
          "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=800&q=80",
      },
      {
        name: "Porterhouse",
        price: 85,
        excerpt:
          "24oz dry-aged porterhouse with bone marrow butter and grilled asparagus. Two steaks in one, combining tender filet and flavorful strip in one magnificent cut.",
        description:
          "The Porterhouse is the king of steaks, essentially a T-bone with a larger filet portion. This massive 24-ounce cut features both the tender filet mignon and the flavorful New York strip, separated by a T-shaped bone. We dry-age our porterhouse for 30 days, concentrating flavors and improving texture. The aging process creates a distinctive nutty, funky flavor that beef enthusiasts crave. We season the steak heavily with salt and pepper, then grill it over hardwood charcoal at high temperature. The bone conducts heat, helping cook the meat evenly while adding its own subtle flavor. After grilling, we rest the steak, then slice the filet and strip off the bone and fan them out for dramatic presentation. The steak is topped with a pat of bone marrow butter—roasted bone marrow whipped with butter, parsley, and lemon zest. This adds incredible richness and a silky mouthfeel. We serve it with simply grilled asparagus and roasted fingerling potatoes. This is a serious steak for serious beef lovers, offering variety and abundance in equal measure.",
        tags: ["Premium", "Aged"],
        image:
          "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80",
      },
      {
        name: "Lamb Chops",
        price: 48,
        excerpt:
          "Four grilled lamb chops with rosemary, garlic, and mint chimichurri. Tender, flavorful chops that showcase the natural sweetness of premium lamb.",
        description:
          "Our lamb chops are cut from a rack of New Zealand lamb, known for its mild flavor and tender texture. Each order includes four thick-cut chops, French-trimmed for an elegant presentation. We marinate the chops briefly in olive oil with fresh rosemary, garlic, and lemon zest—aromatics that complement lamb beautifully. The chops are grilled over high heat to achieve a caramelized crust while keeping the interior medium-rare and rosy pink. The fat along the edges crisps up and becomes almost candy-like in its sweetness. We serve the chops with a vibrant mint chimichurri, a twist on the traditional Argentinian sauce. Our version includes fresh mint, parsley, cilantro, garlic, olive oil, and red wine vinegar—the mint providing a classic pairing with lamb while the other herbs add complexity. The plate is completed with roasted baby potatoes and grilled zucchini. Each chop is perfectly sized for picking up and eating with your hands, making this dish both elegant and fun. This preparation lets the quality of the lamb shine through while adding layers of complementary flavors.",
        tags: ["Classic", "Aromatic"],
        image:
          "https://images.unsplash.com/photo-1562158147-f8c3e7d0e18e?w=800&q=80",
      },
      {
        name: "Pork Tomahawk",
        price: 44,
        excerpt:
          "16oz bone-in pork chop with apple chutney and sage butter. A succulent chop that pairs pork's natural sweetness with autumn-inspired accompaniments.",
        description:
          "The pork tomahawk is cut from the pork rib chop with the bone left extra-long for dramatic presentation, similar to a beef tomahawk. We source heritage breed pork, which has more marbling and flavor than conventional pork. This 16-ounce chop is brined overnight in a solution of salt, sugar, and aromatics, which seasons the meat throughout and helps it retain moisture during cooking. We grill the chop over charcoal until it reaches 145°F internally—modern food safety guidelines allow pork to be served slightly pink, resulting in much juicier meat than the dried-out pork chops of the past. The bone adds flavor during cooking and makes for impressive presentation. We top the chop with sage brown butter—butter cooked until nutty, then infused with crispy fried sage leaves. The dish is served with apple chutney, a sweet-tart condiment made with diced apples, onions, vinegar, and warming spices. This classic pairing of pork and apples is elevated by the quality of ingredients and precise cooking. We include roasted brussels sprouts and sweet potato mash as accompaniments.",
        tags: ["Hearty", "Sweet"],
        image:
          "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=800&q=80",
      },
      {
        name: "Grilled Branzino",
        price: 46,
        excerpt:
          "Whole Mediterranean sea bass with lemon, herbs, and olive oil. Simply prepared fish that showcases the essence of coastal Mediterranean cooking.",
        description:
          "Branzino, also called European sea bass, is prized in Mediterranean cuisine for its delicate, sweet flesh and thin, crispy skin. We source whole fish weighing about one pound each, the perfect size for a single serving. The fish is scaled, gutted, and left whole with head and tail intact. We stuff the cavity with fresh lemon slices, garlic cloves, and a bouquet of herbs—thyme, rosemary, and parsley. The outside is rubbed with olive oil and seasoned with salt and pepper. We grill the fish over medium-high heat, creating beautiful char marks on the skin while keeping the interior moist. The fish is cooked until the flesh is opaque and flakes easily. When presented whole, diners can appreciate the fish's freshness and the care taken in its preparation. We finish with a drizzle of our finest extra virgin olive oil, a squeeze of lemon, and a sprinkle of flaky sea salt. The presentation is simple but the flavors are complex—the smoky char, the aromatic herbs, the clean taste of fresh fish. This is how they prepare fish along the Mediterranean coast.",
        tags: ["Seafood", "Light"],
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
      },
      {
        name: "Surf & Turf",
        price: 72,
        excerpt:
          "6oz filet mignon with grilled lobster tail and drawn butter. The classic combination of premium beef and succulent lobster for the ultimate indulgence.",
        description:
          "Surf and turf is the ultimate indulgence, combining the finest offerings from land and sea. We start with a 6-ounce center-cut filet mignon, the most tender beef cut available. The filet is seasoned simply and grilled to your preference, developing a caramelized crust while remaining tender and juicy inside. Alongside the beef, we serve a split Maine lobster tail, butterflied to expose the meat. The lobster is brushed with garlic butter and grilled until the meat is opaque and slightly charred at the edges. The gentle char adds complexity without overwhelming the sweet lobster meat. We serve this with drawn butter—clarified butter kept warm for dipping—enhanced with lemon and fresh herbs. The combination of tender beef and sweet lobster, each enhancing the other, creates a luxurious dining experience. We include garlic mashed potatoes and grilled asparagus as accompaniments. This is classic American steakhouse fare, perfect for those who can't choose between land and sea. It's celebration food that delivers on multiple levels, satisfying both meat and seafood cravings in one impressive plate.",
        tags: ["Luxury", "Combo"],
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      },
      {
        name: "BBQ Beef Ribs",
        price: 42,
        excerpt:
          "Slow-smoked beef short ribs with house BBQ sauce and coleslaw. Fall-off-the-bone tender ribs with bold, smoky-sweet flavors that define American barbecue.",
        description:
          "Our beef short ribs are a labor of love, requiring 12 hours of slow smoking to achieve fall-off-the-bone tenderness. We start with meaty beef plate short ribs, also called dino ribs for their impressive size. The ribs are seasoned with our house dry rub—a blend of paprika, brown sugar, garlic powder, onion powder, and secret spices. They're then smoked low and slow at 225°F over hickory and oak wood, which imparts a deep, smoky flavor while the long cooking time breaks down tough connective tissue into tender, juicy meat. During the final hour, we brush the ribs with our house BBQ sauce—a tomato-based sauce balanced between sweet, tangy, and spicy. The sauce caramelizes on the ribs, creating a sticky, flavorful glaze. We serve three massive ribs per order, accompanied by classic coleslaw made with cabbage, carrots, and a tangy mayo dressing. The dish also includes cornbread and baked beans. This is American barbecue at its finest—messy, satisfying, and full of bold flavors. Perfect for those who aren't afraid to get their hands dirty.",
        tags: ["Smoky", "Tender"],
        image:
          "https://images.unsplash.com/photo-1529694490557-7f6c560d819e?w=800&q=80",
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    description: "The perfect sweet ending",
    items: [
      {
        name: "Crème Brûlée",
        price: 14,
        excerpt:
          "Classic vanilla custard with caramelized sugar and fresh berries. Silky smooth custard beneath a crackling caramelized sugar shell—the quintessential French dessert.",
        description:
          "Crème brûlée is the epitome of French dessert elegance. Our version begins with the finest ingredients: fresh cream, vanilla beans from Madagascar, egg yolks, and sugar. We split the vanilla beans lengthwise and steep them in cream to extract maximum flavor. The cream is heated gently with the vanilla, then whisked into egg yolks and sugar. This mixture is strained for silky smoothness and poured into shallow ramekins. The custards are baked in a water bath at low temperature until just set—they should still jiggle slightly in the center. After chilling for several hours, we sprinkle each custard with a thin layer of superfine sugar and caramelize it using a blowtorch. The sugar transforms into a crispy, amber-colored shell that shatters satisfyingly when tapped with a spoon. We serve the crème brûlée with fresh seasonal berries—strawberries, blueberries, and raspberries—which provide tartness and freshness to balance the rich custard. This dessert offers a perfect contrast of textures: the crispy caramel top and the silky, vanilla-scented custard beneath. It's simple yet sophisticated, classic yet never boring.",
        tags: ["Classic", "Creamy"],
        image:
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
      },
      {
        name: "Chocolate Lava Cake",
        price: 16,
        excerpt:
          "Warm chocolate cake with molten center, vanilla ice cream, and raspberry coulis. Rich, decadent chocolate that flows like lava when you break through the tender cake.",
        description:
          "The chocolate lava cake, also known as molten chocolate cake, is a modern classic that never fails to impress. We make ours with premium Belgian chocolate, which we melt with butter to create an intensely rich base. This is combined with eggs, sugar, and just a touch of flour—barely enough to give structure. The magic happens in the baking: we cook the cakes at high temperature for exactly eight minutes. This sets the outer edges while leaving the center gloriously molten. When you cut into the cake, warm chocolate flows out like lava, creating a luxurious sauce. We serve the cake immediately while still hot, topped with a scoop of house-made Madagascar vanilla ice cream. As the cold ice cream meets the warm chocolate, it begins to melt, creating a hot-and-cold contrast that's utterly delicious. We add a drizzle of raspberry coulis—a sauce made from fresh raspberries and sugar—which provides tartness to balance the chocolate's richness. A dusting of powdered sugar and fresh mint completes the presentation. This is chocolate indulgence at its finest.",
        tags: ["Chocolate", "Warm"],
        image:
          "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
      },
      {
        name: "Tiramisu",
        price: 15,
        excerpt:
          "Traditional Italian dessert with espresso-soaked ladyfingers and mascarpone. Layers of coffee-soaked cake and velvety cream create the perfect pick-me-up dessert.",
        description:
          "Tiramisu means 'pick me up' in Italian, named for its energizing combination of coffee and cocoa. Our version follows traditional Venetian recipes closely. We begin with savoiardi (Italian ladyfinger cookies), which we quickly dip in strong espresso spiked with a touch of coffee liqueur. These coffee-soaked cookies form the base layers. The cream component is made from mascarpone cheese—a rich, creamy Italian cheese—whipped with egg yolks, sugar, and a splash of Marsala wine until light and fluffy. We fold in whipped cream to lighten the texture further. The dessert is assembled in layers: coffee-soaked cookies, mascarpone cream, more cookies, more cream. After chilling for several hours to allow flavors to meld, we dust the top generously with cocoa powder. The result is a dessert that's rich yet light, sweet yet balanced by the bitter coffee and cocoa. Each spoonful offers creamy, coffee-soaked deliciousness. We serve it in a traditional square portion, showcasing the beautiful layers. This is Italian comfort food at its finest, perfect for coffee lovers and anyone seeking a sophisticated yet approachable dessert.",
        tags: ["Italian", "Coffee"],
        image:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
      },
      {
        name: "Lemon Tart",
        price: 13,
        excerpt:
          "Tangy lemon curd in buttery pastry with torched meringue. Bright, citrusy filling balanced by sweet meringue and crisp pastry—a perfect harmony of flavors.",
        description:
          "Our lemon tart is a study in contrasts: the buttery, crisp pastry shell; the intensely tart lemon curd filling; and the sweet, fluffy meringue topping. We start with pâte sucrée, a sweet pastry dough enriched with butter and eggs. This is pressed into tart pans and blind-baked until golden and crisp. The filling is classic lemon curd made from fresh lemon juice, zest, sugar, eggs, and butter. We cook this mixture gently until it thickens into a smooth, glossy curd with concentrated lemon flavor. The curd is poured into the baked tart shells and allowed to set. Just before serving, we top each slice with Italian meringue—a stable meringue made by whipping hot sugar syrup into egg whites. This is piped decoratively on top and torched to create beautiful golden peaks. The result is a dessert that delivers intense lemon flavor balanced by sweetness from the meringue and richness from the buttery crust. It's refreshing yet indulgent, perfect for those who prefer fruit-based desserts over chocolate. We serve it with fresh berries and a small tuile cookie for added texture.",
        tags: ["Citrus", "Light"],
        image:
          "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&q=80",
      },
      {
        name: "Cheesecake",
        price: 14,
        excerpt:
          "New York-style cheesecake with seasonal berry compote. Dense, creamy, and intensely flavored—the ultimate expression of this American classic dessert.",
        description:
          "Our New York-style cheesecake is the gold standard: dense, rich, and intensely creamy. We make it with full-fat cream cheese, sour cream, heavy cream, eggs, and sugar—no skimping on the good stuff. The base is a graham cracker crust made from crushed cookies, butter, and sugar, pressed firmly into the pan. The cheesecake batter is mixed carefully to avoid incorporating air, which would cause cracks. We bake the cheesecake in a water bath at low temperature for over an hour, then turn off the oven and let it cool slowly inside to prevent cracking. This results in a perfectly smooth top and incredibly creamy texture. The cheesecake is chilled overnight to fully set and develop flavor. We serve generous slices topped with seasonal berry compote—a mixture of fresh berries cooked briefly with sugar and lemon juice. The tart berries provide a perfect counterpoint to the rich, tangy cheesecake. A dollop of whipped cream and fresh mint garnish complete the presentation. This is cheesecake as it should be: unapologetically rich, perfectly smooth, and utterly satisfying. It's a slice of New York culinary tradition.",
        tags: ["Classic", "Rich"],
        image:
          "https://images.unsplash.com/photo-1533134242820-b54f7e5de0b3?w=800&q=80",
      },
      {
        name: "Panna Cotta",
        price: 12,
        excerpt:
          "Silky vanilla panna cotta with passion fruit coulis. An elegant Italian dessert that's light, creamy, and perfumed with vanilla—simple sophistication on a plate.",
        description:
          "Panna cotta means 'cooked cream' in Italian, and this dessert is all about showcasing cream at its finest. We gently heat heavy cream with sugar and split vanilla beans, allowing the vanilla to infuse its complex, floral notes into the cream. A small amount of gelatin is dissolved in the warm cream—just enough to set it while maintaining a delicate, silky texture that barely holds its shape. The mixture is poured into molds and chilled until set. When unmolded, panna cotta should have a gentle wobble, indicating its tender texture. We serve it with passion fruit coulis, a vibrant tropical sauce made from fresh passion fruit pulp and a touch of sugar. The tartness and exotic flavor of passion fruit provide the perfect contrast to the rich, sweet cream. We garnish with fresh berries and mint leaves. What makes panna cotta special is its simplicity—there are no complex techniques or exotic ingredients, just cream, sugar, and vanilla transformed into something ethereal. It's light enough to enjoy after a heavy meal yet indulgent enough to feel special. This dessert embodies Italian culinary philosophy: quality ingredients treated with respect and restraint.",
        tags: ["Italian", "Light"],
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
      },
      {
        name: "Apple Tarte Tatin",
        price: 15,
        excerpt:
          "Caramelized upside-down apple tart with cinnamon ice cream. Buttery caramel, tender apples, and flaky pastry create a warm, comforting French classic.",
        description:
          "Tarte Tatin is a happy accident that became a French classic. Legend has it that the Tatin sisters accidentally dropped their apple tart, then served it upside down to hide the mistake. Today, it's an intentional preparation that showcases caramelized apples beautifully. We make ours by cooking butter and sugar in a heavy pan until it becomes amber-colored caramel. Peeled and halved apples are arranged tightly in the caramel, cut side up. The pan goes into the oven where the apples cook slowly, becoming tender while absorbing the caramel. After about 45 minutes, we cover the apples with a sheet of puff pastry, tucking the edges down around the fruit. The tart bakes until the pastry is golden and crisp. To serve, we invert the tart onto a plate, revealing the beautifully caramelized apples glistening with buttery caramel. We slice it into wedges and serve it warm with house-made cinnamon ice cream. The combination of warm, caramelized fruit, crispy pastry, and cold spiced ice cream is utterly sublime. This is comfort food elevated to fine dining, perfect for autumn evenings or any time you crave something warm and sweet.",
        tags: ["French", "Warm"],
        image:
          "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=80",
      },
      {
        name: "Chocolate Soufflé",
        price: 18,
        excerpt:
          "Light chocolate soufflé with crème anglaise, requiring 20-minute preparation. A dramatic dessert that rises high and delivers pure chocolate heaven in every spoonful.",
        description:
          "The chocolate soufflé is perhaps the most impressive dessert in French cuisine, requiring precise technique and timing. We make a chocolate base by melting dark chocolate with butter, then enriching it with egg yolks. Separately, we whip egg whites with sugar to stiff peaks. The whipped whites are carefully folded into the chocolate base—this is what gives the soufflé its signature rise and airy texture. The mixture is poured into buttered and sugared ramekins, then baked in a hot oven. As it bakes, the air in the egg whites expands, causing the soufflé to rise dramatically above the rim of the ramekin. The outside sets while the inside remains slightly molten. Because soufflés begin to deflate as soon as they're removed from the oven, we require a 20-minute wait after you order. When it arrives at your table, the soufflé will be puffed high, with a light, airy texture and intense chocolate flavor. We serve it with crème anglaise—a vanilla custard sauce that you pour into the center, allowing it to flow into the molten interior. This is dessert theater, delivering both visual drama and exquisite flavor.",
        tags: ["Chocolate", "Signature"],
        image:
          "https://images.unsplash.com/photo-1542843289-1c2c31f71f15?w=800&q=80",
      },
      {
        name: "Profiteroles",
        price: 14,
        excerpt:
          "Choux pastry filled with vanilla cream, topped with warm chocolate sauce. Light, airy pastries that combine cream and chocolate in perfect bite-sized harmony.",
        description:
          "Profiteroles, also called cream puffs, are a French patisserie classic. We make them with pâte à choux, a unique pastry that puffs dramatically when baked. The dough is made by cooking water, butter, and flour together, then beating in eggs. When piped into small mounds and baked, the high water content creates steam that puffs the pastry, creating a hollow center. These golden, crispy shells are cooled, then filled with vanilla pastry cream—a rich custard made from milk, egg yolks, sugar, and vanilla beans. We use a piping bag to fill each puff through a small hole in the bottom. The profiteroles are arranged in a pyramid on your plate and served with warm chocolate sauce drizzled over the top. As you eat them, the combination of crispy pastry, cold vanilla cream, and warm chocolate is heavenly. Some of the cream squishes out as you bite down, while the chocolate sauce adds richness and depth. We garnish with powdered sugar and a sprig of mint. This is a playful yet elegant dessert that's both nostalgic and refined, perfect for sharing or enjoying on your own.",
        tags: ["French", "Classic"],
        image:
          "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80",
      },
      {
        name: "Mille-Feuille",
        price: 16,
        excerpt:
          "Thousand-layer pastry with vanilla cream and caramelized top. Delicate layers of crispy pastry and silky cream showcase French pastry technique at its finest.",
        description:
          "Mille-feuille, meaning 'thousand leaves,' is also known as Napoleon. This is French pastry at its most refined and technical. We begin with puff pastry, which we roll incredibly thin and bake until golden and crispy. The pastry naturally separates into hundreds of thin, flaky layers. We prepare three layers of pastry for each serving. The filling is crème pâtissière (pastry cream)—a vanilla custard made with milk, egg yolks, sugar, and vanilla beans, thickened with cornstarch for stability. Some of the cream is lightened with whipped cream to create a mousse-like texture. To assemble, we place a pastry layer on the plate, pipe a layer of cream, add another pastry layer, more cream, and finally a top pastry layer. The top is traditionally glazed with fondant and decorated with chocolate lines dragged to create a distinctive pattern. We caramelize the top for extra crunch and visual appeal. The result is a dessert that shatters satisfyingly with each bite, the crispy pastry contrasting beautifully with the smooth cream. It requires a knife and fork to eat properly. This is a dessert for those who appreciate technical excellence and refined sweetness.",
        tags: ["French", "Delicate"],
        image:
          "https://images.unsplash.com/photo-1587241321921-91aadf6e1c30?w=800&q=80",
      },
    ],
  },
  {
    id: "wines",
    title: "Wines",
    description: "Selected wines to pair with your meal",
    items: [
      {
        name: "Château Margaux 2015",
        price: 450,
        excerpt:
          "Bordeaux red blend from Margaux with notes of blackcurrant, cedar, and violets. A first-growth wine that exemplifies the elegance and complexity of great Bordeaux.",
        description:
          "Château Margaux is one of only five first-growth estates in Bordeaux, the highest classification in the 1855 Bordeaux Classification. The 2015 vintage is exceptional, earning perfect scores from multiple critics. This wine is a blend dominated by Cabernet Sauvignon, with Merlot, Cabernet Franc, and Petit Verdot rounding out the composition. In the glass, it shows a deep ruby color with purple highlights. The nose is extraordinarily complex, offering waves of blackcurrant, blackberry, and dark cherry, layered with cedar, tobacco, graphite, and violet. On the palate, the wine is full-bodied yet incredibly elegant, with silky tannins and perfect balance. The fruit is intense but refined, supported by notes of vanilla and toast from oak aging. The finish seems to last forever, evolving and revealing new nuances with each moment. This wine can be enjoyed now but will continue to develop for decades. It pairs beautifully with our lamb rack or beef Wellington, where its structure and complexity match the richness of the meat. This is a wine for special celebrations, a liquid testament to centuries of winemaking tradition and the perfect expression of Margaux terroir.",
        tags: ["Red", "French"],
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
      },
      {
        name: "Dom Pérignon 2012",
        price: 380,
        excerpt:
          "Vintage champagne with elegant bubbles and brioche notes. The most prestigious champagne house delivering complexity, refinement, and celebration in every glass.",
        description:
          "Dom Pérignon is synonymous with luxury champagne. Named after the Benedictine monk who pioneered champagne production, this prestige cuvée is made only in exceptional years—there is no non-vintage Dom Pérignon. The 2012 vintage shows Dom Pérignon's house style perfectly: it's rich and full-bodied yet maintains elegant freshness. In the glass, fine streams of tiny bubbles rise continuously. The color is pale gold with green highlights. The nose opens with notes of white flowers, citrus, and stone fruit, developing into brioche, toasted almond, and honey. On the palate, it's creamy and luxurious, with flavors of lemon curd, white peach, and hazelnut. The mousse is fine and persistent, creating a velvety texture. The acidity is perfectly balanced, providing structure and length. This champagne is made from a blend of Chardonnay and Pinot Noir from the best grand cru vineyards in Champagne. It spends at least eight years aging on the lees before release, developing complexity and that distinctive brioche character. Dom Pérignon is perfect for celebrating special occasions and pairs wonderfully with our oysters or lobster dishes. It's also sublime on its own as an aperitif.",
        tags: ["Champagne", "Luxury"],
        image:
          "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&q=80",
      },
      {
        name: "Sassicaia 2018",
        price: 320,
        excerpt:
          "Super Tuscan with bold tannins and dark fruit flavors. Italy's most famous Bordeaux-style blend, offering power, elegance, and remarkable aging potential.",
        description:
          "Sassicaia is the wine that created the Super Tuscan category. In the 1960s, when Tuscan wines were required to be made from Sangiovese, the Marchese Mario Incisa della Rocchetta planted Cabernet Sauvignon and Cabernet Franc. The resulting wine was so exceptional it changed Italian wine forever. The 2018 vintage shows Sassicaia at its best. The wine is deep ruby with purple edges. The nose offers intense aromas of blackcurrant, blackberry, and plum, layered with notes of cedar, tobacco, dark chocolate, and Mediterranean herbs. On the palate, it's full-bodied and powerful, with firm tannins that provide structure and ageability. The fruit is concentrated and pure, supported by well-integrated oak that adds complexity without overwhelming. The wine has remarkable length, with the finish lasting well over a minute. What makes Sassicaia special is how it combines power with elegance—it's a big wine that never feels heavy. The coastal location of the vineyards, near the Tyrrhenian Sea, provides cooling breezes that maintain acidity and freshness. This wine pairs excellently with our beef Wellington or grilled steaks. It can be enjoyed now but will reward patience with several more decades of cellaring.",
        tags: ["Red", "Italian"],
        image:
          "https://images.unsplash.com/photo-1606605811503-93b16f35e06b?q=80&w=2070&auto=format&fit=crop",
      },
      {
        name: "Cloudy Bay Sauvignon Blanc",
        price: 85,
        excerpt:
          "New Zealand white with tropical fruit and crisp acidity. The wine that put Marlborough on the map, delivering vibrant fruit and refreshing minerality.",
        description:
          "Cloudy Bay is the wine that introduced the world to New Zealand Sauvignon Blanc's distinctive style. From Marlborough on the South Island, this wine showcases what makes the region special: intense fruit flavors combined with vibrant acidity and mineral notes. In the glass, it's pale straw with green highlights. The nose bursts with aromas of passion fruit, grapefruit, lime, and gooseberry, along with notes of fresh-cut grass and bell pepper. On the palate, it's medium-bodied with laser-like acidity that makes your mouth water. The fruit flavors are intense and pure, ranging from tropical to citrus. There's an underlying minerality that adds complexity and a slightly herbaceous note that's characteristic of Marlborough. The wine is made primarily in stainless steel to preserve its fresh fruit character, though a small portion sees oak to add texture. The finish is long and refreshing, leaving you wanting another sip. This is a food-friendly wine that pairs beautifully with our seafood dishes, particularly the sea bass or grilled octopus. It's also excellent with goat cheese or as an aperitif. Serve it well-chilled on a warm evening for maximum refreshment.",
        tags: ["White", "Fresh"],
        image:
          "https://images.unsplash.com/photo-1597182368611-e9e9ddda84ed?w=800&q=80",
      },
      {
        name: "Opus One 2017",
        price: 420,
        excerpt:
          "Napa Valley red blend with cassis, vanilla, and smooth tannins. A Franco-American collaboration producing Bordeaux-style wine with California power and elegance.",
        description:
          "Opus One was created in 1979 as a joint venture between Baron Philippe de Rothschild of Château Mouton Rothschild and Robert Mondavi. The goal was to create a Bordeaux-style blend using Napa Valley fruit, combining French elegance with California power. The 2017 vintage exemplifies this vision perfectly. The wine is a blend dominated by Cabernet Sauvignon, with Cabernet Franc, Merlot, Petit Verdot, and Malbec completing the composition. In the glass, it shows deep purple color with ruby edges. The nose offers intense aromas of cassis, blackberry, and dark cherry, layered with vanilla, mocha, and cedar from oak aging. Notes of violet and graphite add complexity. On the palate, the wine is full-bodied and rich, with velvety tannins that coat the mouth. The fruit is ripe and concentrated but never jammy, maintaining elegance and balance. The oak is well-integrated, providing structure and flavor without overwhelming the fruit. The finish is long and satisfying, with lingering notes of dark fruit and spice. This wine pairs excellently with our Wagyu ribeye or lamb rack. While approachable now, it will continue to develop for 15-20 years, making it both a pleasure to drink and an excellent investment.",
        tags: ["Red", "American"],
        image:
          "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=800&q=80",
      },
      {
        name: "Penfolds Grange 2016",
        price: 650,
        excerpt:
          "Australian Shiraz with intense fruit, spice, and oak complexity. Australia's most iconic wine, offering power, complexity, and remarkable longevity in every bottle.",
        description:
          "Penfolds Grange is Australia's most celebrated wine, often called the country's first growth. Created in the 1950s by winemaker Max Schubert, Grange pioneered the use of American oak for Australian wine and established Shiraz as a noble variety. The 2016 vintage is exceptional, showing Grange's signature style of power and complexity. The wine is deep purple-black, almost opaque. The nose is incredibly intense, offering waves of blackberry, plum, and black cherry, layered with notes of licorice, dark chocolate, espresso, and exotic spices. The oak influence is prominent but integrated, adding vanilla, coconut, and sweet spice. On the palate, it's full-bodied and powerful, with firm tannins that provide structure for decades of aging. The fruit is extraordinarily concentrated, almost liqueur-like in intensity. Despite its power, the wine maintains balance and elegance. The finish seems endless, evolving and revealing new nuances with each moment. What makes Grange special is its ability to age—wines from the 1950s are still drinking beautifully today. This wine pairs excellently with our grilled meats, particularly the Tomahawk steak. While impressive now, patience will be rewarded as this wine develops for 30+ years.",
        tags: ["Red", "Bold"],
        image:
          "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80",
      },
      {
        name: "Chablis Grand Cru",
        price: 145,
        excerpt:
          "Premier French Chardonnay with minerality and citrus notes. Unoaked Chardonnay that showcases pure fruit, steely minerality, and the unique terroir of Chablis.",
        description:
          "Chablis is often considered the purest expression of Chardonnay, made without the oak aging that characterizes many New World versions. From the northernmost region of Burgundy, Chablis Grand Cru represents the pinnacle of this style. The wines come from seven climats (vineyard sites) with ideal exposure and the region's distinctive Kimmeridgian limestone soil—ancient seabeds rich in fossilized oyster shells. This unique terroir imparts the wine's signature minerality. In the glass, it's pale gold with green highlights. The nose offers aromas of green apple, lemon, and white flowers, along with that distinctive flinty, mineral character often described as 'wet stones' or 'oyster shell.' On the palate, it's medium-bodied with racy acidity that provides structure and aging potential. The fruit flavors are precise and pure—citrus, green apple, and white peach. The minerality is pronounced, adding complexity and length. The wine has remarkable tension between fruit and acidity, creating a wine that's both refreshing and complex. This Chablis pairs beautifully with our oysters or sea bass, the minerality echoing the briny, ocean flavors. It's also excellent with goat cheese or as an aperitif.",
        tags: ["White", "French"],
        image:
          "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=800&q=80",
      },
      {
        name: "Barolo Riserva 2015",
        price: 180,
        excerpt:
          "Piedmont Nebbiolo with cherry, tar, and rose petal aromas. The 'king of wines' from Italy, offering complex aromatics, firm tannins, and exceptional aging potential.",
        description:
          "Barolo, made from Nebbiolo grapes in Piedmont, is called the 'king of wines and wine of kings.' The Riserva designation means the wine has been aged for at least five years before release, including three years in oak. The 2015 vintage is outstanding throughout Piedmont. In the glass, Barolo shows a distinctive garnet color with orange edges—this is normal for Nebbiolo as it ages. The nose is incredibly complex and aromatic, offering notes of red cherry, raspberry, and dried rose petals, along with tar, leather, tobacco, truffle, and spices. These evolved aromatics are what make Barolo so captivating. On the palate, the wine is full-bodied with firm, gripping tannins that are characteristic of Nebbiolo. The acidity is high, providing structure and freshness. Flavors of sour cherry, dried herbs, and earth dominate, with a long, persistent finish. What makes Barolo special is its combination of power and elegance—it's a big wine that never feels heavy. The tannins can be austere when young, but with age they integrate beautifully. This wine pairs excellently with our Osso Buco or any rich, braised meat dishes. It can be enjoyed now but will continue to evolve for 20+ years.",
        tags: ["Red", "Italian"],
        image:
          "https://images.unsplash.com/photo-1566754436990-d9e423c0d6a2?w=800&q=80",
      },
      {
        name: "Moët & Chandon Rosé",
        price: 120,
        excerpt:
          "Pink champagne with red berry flavors and fine bubbles. Elegant rosé champagne that combines fruit, freshness, and the prestige of the world's most famous champagne house.",
        description:
          "Moët & Chandon is the world's most recognized champagne house, and their rosé champagne represents the pinnacle of pink sparklers. This wine is made using the traditional method, with a second fermentation in the bottle creating those fine, persistent bubbles. The rosé color comes from adding a small amount of red Pinot Noir wine to the blend, along with white Chardonnay and Pinot Noir wines. In the glass, it's a beautiful salmon-pink color with fine, continuous bubbles. The nose offers aromas of wild strawberry, raspberry, and red cherry, along with notes of rose petals, brioche, and subtle spice. On the palate, it's medium-bodied with creamy mousse and vibrant acidity. The red fruit flavors are fresh and pure, complemented by notes of citrus and subtle toast. The wine has excellent length and a refreshing finish. What makes this rosé special is its balance—it's fruity without being sweet, elegant without being austere. It's incredibly versatile with food, pairing beautifully with our tuna tartare, duck breast, or desserts. It's also wonderful on its own as an aperitif or for celebrating special occasions. Serve it well-chilled in flutes to showcase those beautiful bubbles.",
        tags: ["Champagne", "Rosé"],
        image:
          "https://images.unsplash.com/photo-1558366725-f5d947ba59cc?w=800&q=80",
      },
      {
        name: "Screaming Eagle Cabernet",
        price: 2800,
        excerpt:
          "Cult Napa Cabernet with rich blackberry, espresso, and velvet texture. One of California's most sought-after wines, representing the ultimate expression of Napa Valley Cabernet Sauvignon.",
        description:
          "Screaming Eagle is the most iconic and sought-after wine from Napa Valley, with a cult following that has made it one of the world's most expensive and hardest-to-find wines. Produced in tiny quantities from a small vineyard in Oakville, this wine represents the pinnacle of California Cabernet Sauvignon. The wine is almost pure Cabernet Sauvignon with minimal additions of Merlot and Cabernet Franc. In the glass, it shows deep, almost black purple color. The nose is extraordinarily intense and complex, offering aromas of ripe blackberry, cassis, and dark cherry, layered with notes of espresso, dark chocolate, vanilla, and cedar. There are also hints of violets, graphite, and exotic spices. On the palate, the wine is full-bodied and incredibly rich, with a texture so smooth and velvety it's almost surreal. The tannins are perfectly integrated, providing structure without any harshness. The fruit is intensely concentrated but maintains elegance and balance. The oak is present but never overwhelming, adding complexity and dimension. The finish lasts for minutes, evolving continuously. This wine can be enjoyed now but will age gracefully for decades. It pairs with our finest dishes—the Wagyu ribeye or Beef Wellington—though many collectors prefer to drink it on its own to fully appreciate its complexity.",
        tags: ["Red", "Collector"],
        image:
          "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
      },
    ],
  },
];
