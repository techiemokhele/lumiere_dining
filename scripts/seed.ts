import mongoose from "mongoose";
import { ShopCategory } from "@/models/ecommerce/ShopCategory";
import { NewsletterPostModel } from "@/models/NewsletterPost";
import { newsletterPosts } from "@/data/newsletterData";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const MenuItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  excerpt: String,
  description: String,
  tags: [String],
  image: String,
  images: [String],
  rating: Number,
  reviewCount: Number,
  ingredients: [String],
  preparationNotes: String,
  allergies: [String],
  pairings: [String],
});

const MenuSectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    items: [MenuItemSchema],
  },
  { timestamps: true },
);

const MenuSection =
  mongoose.models.MenuSection ||
  mongoose.model("MenuSection", MenuSectionSchema);

const landingMenuData = [
  {
    id: "starters",
    title: "Starters",
    description: "Light bites to awaken your taste buds",
    items: [
      {
        id: "seared-scallops",
        name: "Seared Scallops",
        price: 28,
        excerpt:
          "Pan-seared diver scallops with cauliflower purée, crispy pancetta, and microgreens drizzled with brown butter sauce. A delicate balance of ocean sweetness and earthy richness that melts on your palate.",
        description:
          "Our signature seared scallops showcase the finest day-boat catch from the Atlantic coast. Each U10 scallop is hand-selected for its size and sweetness, then perfectly seared to achieve a golden caramelized crust while maintaining a tender, buttery interior. The dish is elevated with a silky cauliflower purée that provides a subtle, creamy foundation, complemented by crispy pancetta that adds a satisfying textural contrast and smoky depth. Fresh microgreens add a peppery brightness, while our house-made brown butter sauce, infused with thyme and lemon, ties everything together.",
        tags: ["Seafood", "Gluten-Free"],
        image:
          "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
          "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&q=80",
          "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
        ],
        rating: 4.8,
        reviewCount: 124,
        ingredients: [
          "U10 diver scallops",
          "Cauliflower",
          "Pancetta",
          "Brown butter",
          "Thyme",
          "Lemon",
          "Microgreens",
          "Sea salt",
          "White pepper",
        ],
        preparationNotes:
          "Scallops are seared to order and served immediately. Please allow 12–15 minutes for preparation. Best enjoyed medium-rare for optimal tenderness. The cauliflower purée is made fresh daily.",
        allergies: ["Shellfish", "Dairy"],
        pairings: [
          "cloudy-bay-sauvignon-blanc",
          "chablis-grand-cru",
          "lobster-bisque",
        ],
      },
      {
        id: "truffle-burrata",
        name: "Truffle Burrata",
        price: 24,
        excerpt:
          "Creamy burrata cheese with black truffle shavings, heirloom tomatoes, and aged balsamic on grilled sourdough. An indulgent celebration of Italian craftsmanship with luxurious truffle aromatics.",
        description:
          "Experience the pinnacle of Italian cheesemaking with our handcrafted burrata, flown in twice weekly from Puglia. This delicate cheese, with its cream-filled center, is adorned with generous shavings of black Périgord truffle, creating an intoxicating aroma that announces the dish before it reaches your table. We pair this with peak-season heirloom tomatoes from local farms, each variety selected for its unique flavor profile and vibrant color. A drizzle of 25-year aged balsamic vinegar from Modena adds complexity with its syrupy texture and notes of fig and cherry.",
        tags: ["Vegetarian", "Premium"],
        image:
          "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80",
          "https://images.unsplash.com/photo-1505575967455-40e256f73376?w=800&q=80",
          "https://images.unsplash.com/photo-1577969181928-69c4e557c99a?q=80&w=764",
        ],
        rating: 4.7,
        reviewCount: 98,
        ingredients: [
          "Puglia burrata",
          "Black Périgord truffle",
          "Heirloom tomatoes",
          "25-year aged balsamic",
          "Extra virgin olive oil",
          "Fresh basil",
          "Sourdough bread",
          "Sea salt",
        ],
        preparationNotes:
          "Burrata is served at room temperature for optimal creaminess. The sourdough is grilled to order. Truffle shavings are added tableside. Best enjoyed immediately.",
        allergies: ["Dairy", "Gluten"],
        pairings: [
          "barolo-riserva-2015",
          "wild-mushroom-risotto",
          "beef-carpaccio",
        ],
      },
      {
        id: "tuna-tartare",
        name: "Tuna Tartare",
        price: 26,
        excerpt:
          "Yellowfin tuna with avocado, crispy wonton, sesame oil, and wasabi aioli. Fresh, vibrant, and beautifully balanced with Asian-inspired flavors that dance across your taste buds.",
        description:
          "Our tuna tartare is a masterclass in precision and freshness. We source sushi-grade yellowfin tuna, selecting only the deep red loin meat for its superior flavor and texture. The tuna is hand-diced into perfect cubes and gently tossed with toasted sesame oil, creating a nutty undertone that enhances the fish's natural richness. Creamy Hass avocado adds a luxurious texture, while finely diced shallots and fresh cilantro provide aromatic complexity.",
        tags: ["Raw", "Spicy"],
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
          "https://images.unsplash.com/photo-1534256958597-7fe685cbd745?w=800&q=80",
          "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
        ],
        rating: 4.9,
        reviewCount: 156,
        ingredients: [
          "Sushi-grade yellowfin tuna",
          "Hass avocado",
          "Toasted sesame oil",
          "Wonton wrappers",
          "Wasabi",
          "Japanese mayo",
          "Shallots",
          "Cilantro",
          "Black sesame seeds",
          "Microgreens",
        ],
        preparationNotes:
          "Prepared fresh to order using sushi-grade fish. The wasabi aioli carries a gentle heat—please inform your server if you prefer it milder or spicier. Wonton chips are fried to order for maximum crispness.",
        allergies: ["Fish", "Soy", "Egg", "Gluten"],
        pairings: [
          "moet-chandon-rose",
          "cloudy-bay-sauvignon-blanc",
          "grilled-octopus",
        ],
      },
      {
        id: "foie-gras-torchon",
        name: "Foie Gras Torchon",
        price: 32,
        excerpt:
          "Silky foie gras with fig compote, toasted brioche, and sea salt. An opulent French classic that exemplifies luxury dining with every rich, buttery bite.",
        description:
          "This is French gastronomy at its finest. We prepare our foie gras torchon using traditional techniques passed down through generations of French chefs. Grade A duck foie gras is carefully deveined, seasoned with Sauternes, cognac, and a touch of quatre épices, then wrapped in cheesecloth and gently poached to achieve a silky, spreadable texture. After aging for several days to develop its complex flavors, the foie gras is sliced and served at the perfect temperature to showcase its buttery richness.",
        tags: ["Luxury", "French"],
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
          "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
        ],
        rating: 4.6,
        reviewCount: 72,
        ingredients: [
          "Grade A duck foie gras",
          "Sauternes wine",
          "Cognac",
          "Quatre épices",
          "Fig compote",
          "Brioche",
          "Fleur de sel",
          "Aged balsamic reduction",
        ],
        preparationNotes:
          "The foie gras is prepared 3 days in advance for optimal flavor development. Served slightly chilled. Brioche is toasted to order. This is a rich dish—we recommend sharing or enjoying as a light starter.",
        allergies: ["Dairy", "Gluten", "Alcohol"],
        pairings: [
          "dom-perignon-2012",
          "chateau-margaux-2015",
          "duck-breast-a-lorange",
        ],
      },
      {
        id: "oysters-rockefeller",
        name: "Oysters Rockefeller",
        price: 22,
        excerpt:
          "Six fresh oysters baked with spinach, Pernod, and parmesan crust. A New Orleans classic that transforms briny oysters into a warm, herbaceous delicacy.",
        description:
          "Named after John D. Rockefeller and created at Antoine's Restaurant in 1899, this iconic dish represents American culinary history. We source our oysters daily from pristine waters, selecting only the plumpest specimens. Each oyster is carefully shucked and nestled in its shell with a carefully composed mixture of fresh spinach, shallots, and herbs, topped with a golden parmesan crust.",
        tags: ["Seafood", "Classic"],
        image:
          "https://images.unsplash.com/photo-1626197031507-c17099753214?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1626197031507-c17099753214?w=800&q=80",
          "https://images.unsplash.com/photo-1761314036797-8b6ef2c159c7?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80",
        ],
        rating: 4.5,
        reviewCount: 89,
        ingredients: [
          "Fresh oysters (6)",
          "Spinach",
          "Shallots",
          "Pernod",
          "Parmesan",
          "Breadcrumbs",
          "Butter",
          "Fresh herbs",
        ],
        preparationNotes:
          "Oysters are shucked and baked to order. Allow 10–12 minutes. Served on a bed of rock salt to keep shells steady. The Pernod adds a subtle anise note—ask your server for a Pernod-free preparation if preferred.",
        allergies: ["Shellfish", "Dairy", "Gluten"],
        pairings: [
          "chablis-grand-cru",
          "dom-perignon-2012",
          "chilean-sea-bass",
        ],
      },
      {
        id: "beef-carpaccio",
        name: "Beef Carpaccio",
        price: 25,
        excerpt:
          "Thinly sliced wagyu beef with arugula, parmesan shavings, and truffle oil. A refined Italian preparation that celebrates the quality of premium beef in its purest form.",
        description:
          "Our beef carpaccio is a testament to the quality of ingredients and the skill of our kitchen team. We use only certified wagyu beef tenderloin, renowned for its marbling and buttery texture. The beef is trimmed, wrapped tightly, and frozen just enough to allow for paper-thin slicing. Each slice is carefully arranged on a chilled plate with fresh arugula, aged Parmigiano-Reggiano shaved tableside, and a drizzle of white truffle oil.",
        tags: ["Raw", "Premium"],
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
          "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
        ],
        rating: 4.7,
        reviewCount: 103,
        ingredients: [
          "Wagyu beef tenderloin",
          "Fresh arugula",
          "Parmigiano-Reggiano",
          "White truffle oil",
          "Fresh lemon",
          "Extra virgin olive oil",
          "Flaky sea salt",
          "Cracked black pepper",
        ],
        preparationNotes:
          "Served raw—the wagyu is sliced paper-thin and plated on a chilled dish. Must be eaten immediately for optimal temperature and texture. Parmesan is shaved tableside.",
        allergies: ["Dairy"],
        pairings: ["sassicaia-2018", "barolo-riserva-2015", "truffle-burrata"],
      },
      {
        id: "lobster-bisque",
        name: "Lobster Bisque",
        price: 20,
        excerpt:
          "Rich lobster bisque with cognac cream and fresh tarragon. A velvety French soup that captures the essence of the sea in every luxurious spoonful.",
        description:
          "This is not just soup; it's liquid luxury. Our lobster bisque begins with whole Maine lobsters, which we cook and then carefully extract every bit of meat and flavor. The shells are roasted until fragrant, then simmered for hours with aromatic vegetables, tomato paste, white wine, and fish stock. Enriched with heavy cream and finished with a splash of cognac, each serving is garnished with chunks of tender lobster meat and a swirl of cream.",
        tags: ["Seafood", "Soup"],
        image:
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
          "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&q=80",
          "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=800&q=80",
        ],
        rating: 4.8,
        reviewCount: 142,
        ingredients: [
          "Whole Maine lobster",
          "Heavy cream",
          "Cognac",
          "Fresh tarragon",
          "Tomato paste",
          "White wine",
          "Fish stock",
          "Carrots",
          "Celery",
          "Onion",
          "Butter",
        ],
        preparationNotes:
          "Simmered for over 6 hours and strained multiple times for silky smoothness. Contains alcohol (cognac). Garnished with fresh lobster chunks. Available in cup or bowl size.",
        allergies: ["Shellfish", "Dairy", "Alcohol"],
        pairings: ["seared-scallops", "chablis-grand-cru", "chilean-sea-bass"],
      },
      {
        id: "grilled-octopus",
        name: "Grilled Octopus",
        price: 29,
        excerpt:
          "Tender octopus with chorizo, fingerling potatoes, and smoked paprika aioli. A Mediterranean-inspired dish where smoke, spice, and seafood create perfect harmony.",
        description:
          "Our grilled octopus is a labor of love that begins with proper preparation. We source whole Spanish octopus, which we tenderize through a slow-cooking process that can take up to two hours. The octopus is poached gently, then marinated in olive oil, garlic, and lemon before grilling over high heat to achieve beautiful char marks and crispy edges while maintaining a tender interior.",
        tags: ["Seafood", "Smoky"],
        image:
          "https://images.unsplash.com/photo-1764397514789-079231e88f31?q=80",
        images: [
          "https://images.unsplash.com/photo-1764397514789-079231e88f31?q=80",
          "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
          "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
        ],
        rating: 4.6,
        reviewCount: 87,
        ingredients: [
          "Spanish octopus",
          "Spanish chorizo",
          "Fingerling potatoes",
          "Smoked paprika",
          "Garlic aioli",
          "Olive oil",
          "Garlic",
          "Lemon",
          "Fresh parsley",
          "Bay leaves",
          "Peppercorns",
        ],
        preparationNotes:
          "The octopus is slow-poached for 2 hours before grilling. Allow 15–18 minutes for final preparation. The chorizo is crisped to release its paprika oils. Served with lemon wedges.",
        allergies: ["Shellfish", "Egg"],
        pairings: [
          "cloudy-bay-sauvignon-blanc",
          "wild-salmon-provencal",
          "tuna-tartare",
        ],
      },
      {
        id: "duck-confit-spring-rolls",
        name: "Duck Confit Spring Rolls",
        price: 23,
        excerpt:
          "Crispy spring rolls filled with duck confit, served with hoisin reduction. An East-meets-West fusion that transforms French technique into an Asian-inspired appetizer.",
        description:
          "This dish represents culinary fusion at its most successful, marrying French technique with Asian presentation. We begin with whole duck legs, which are salted and left to cure overnight. The legs are then cooked slowly in their own fat until the meat is fall-off-the-bone tender. The shredded meat is mixed with shiitake mushrooms, scallions, ginger, and five-spice powder, then wrapped in rice paper and fried until golden.",
        tags: ["Fusion", "Crispy"],
        image:
          "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80",
          "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
        ],
        rating: 4.5,
        reviewCount: 76,
        ingredients: [
          "Duck legs",
          "Duck fat",
          "Rice paper",
          "Shiitake mushrooms",
          "Scallions",
          "Ginger",
          "Five-spice powder",
          "Vermicelli noodles",
          "Hoisin sauce",
          "Star anise",
          "Orange zest",
          "Cilantro",
          "Mint",
          "Thai basil",
        ],
        preparationNotes:
          "Duck is confited for several hours before assembly. Spring rolls are fried to order for maximum crispness. The hoisin reduction is infused with star anise and orange. Fresh herbs served alongside for customization.",
        allergies: ["Gluten", "Soy", "Sesame"],
        pairings: [
          "moet-chandon-rose",
          "duck-breast-a-lorange",
          "tuna-tartare",
        ],
      },
      {
        id: "wild-mushroom-risotto",
        name: "Wild Mushroom Risotto",
        price: 21,
        excerpt:
          "Creamy arborio rice with porcini, shiitake, and white truffle oil. An earthy, luxurious vegetarian dish that showcases the depth and complexity of forest mushrooms.",
        description:
          "Our wild mushroom risotto is a vegetarian dish that rivals any meat-based preparation in complexity and satisfaction. We use Carnaroli rice from Piedmont, cooked with mushroom stock made by simmering dried porcini for hours. Fresh wild mushrooms are sautéed and folded in along with Parmigiano-Reggiano, butter, and a drizzle of white truffle oil.",
        tags: ["Vegetarian", "Creamy"],
        image:
          "https://images.unsplash.com/photo-1723476654474-77baaeb27012?q=80",
        images: [
          "https://images.unsplash.com/photo-1723476654474-77baaeb27012?q=80",
          "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        ],
        rating: 4.7,
        reviewCount: 115,
        ingredients: [
          "Carnaroli rice",
          "Dried porcini mushrooms",
          "Fresh shiitake mushrooms",
          "Oyster mushrooms",
          "Cremini mushrooms",
          "Parmigiano-Reggiano",
          "White truffle oil",
          "White wine",
          "Butter",
          "Shallots",
          "Garlic",
          "Fresh thyme",
          "Vegetable stock",
        ],
        preparationNotes:
          "Risotto is cooked to order—allow 20 minutes. The rice is stirred continuously for optimal creaminess. Made with vegetable stock for a fully vegetarian preparation. The truffle oil is added as a finishing touch.",
        allergies: ["Dairy", "Alcohol"],
        pairings: ["barolo-riserva-2015", "truffle-burrata", "chicken-supreme"],
      },
    ],
  },
  {
    id: "mains",
    title: "Main Courses",
    description: "Hearty dishes featuring premium ingredients",
    items: [
      {
        id: "chilean-sea-bass",
        name: "Chilean Sea Bass",
        price: 48,
        excerpt:
          "Pan-seared sea bass with lemon butter, asparagus, and saffron risotto. A refined seafood entrée where delicate fish meets luxurious golden risotto in perfect harmony.",
        description:
          "Chilean sea bass, also known as Patagonian toothfish, is prized for its buttery texture and mild, sweet flavor. We source our fish from sustainable fisheries. Each portion is seared skin-side down until crispy and golden, then served atop saffron risotto with blanched asparagus and a classic lemon-butter sauce.",
        tags: ["Seafood", "Signature"],
        image:
          "https://images.unsplash.com/photo-1523218689796-d4c2ef4f3d72?q=80&w=1170&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1523218689796-d4c2ef4f3d72?q=80&w=1170&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
        ],
        rating: 4.9,
        reviewCount: 178,
        ingredients: [
          "Chilean sea bass fillet",
          "Spanish saffron",
          "Arborio rice",
          "Fresh asparagus",
          "Lemon",
          "Butter",
          "White wine",
          "Shallots",
          "Fish stock",
          "Salt",
          "White pepper",
        ],
        preparationNotes:
          "Fish is seared to order. The saffron risotto takes 20 minutes to prepare. We recommend medium doneness for optimal flakiness. The lemon-butter sauce is mounted tableside.",
        allergies: ["Fish", "Dairy"],
        pairings: ["chablis-grand-cru", "seared-scallops", "lobster-bisque"],
      },
      {
        id: "herb-crusted-lamb-rack",
        name: "Herb-Crusted Lamb Rack",
        price: 52,
        excerpt:
          "New Zealand lamb rack with rosemary crust, mint demi-glace, and roasted vegetables. Premium lamb showcasing the perfect balance of herbaceous crust and tender, pink meat.",
        description:
          "Our lamb racks are sourced from New Zealand, where sheep graze on pristine pastures. Each rack is French-trimmed, seared, coated with Dijon mustard and a herb breadcrumb crust, then roasted to medium-rare. Served with mint demi-glace and seasonal roasted vegetables.",
        tags: ["Premium", "Roasted"],
        image:
          "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
          "https://images.unsplash.com/photo-1550367363-ea12860cc124?q=80",
        ],
        rating: 4.8,
        reviewCount: 134,
        ingredients: [
          "New Zealand lamb rack",
          "Dijon mustard",
          "Fresh rosemary",
          "Thyme",
          "Garlic",
          "Parsley",
          "Breadcrumbs",
          "Butter",
          "Lamb stock",
          "Red wine",
          "Fresh mint",
          "Carrots",
          "Parsnips",
          "Brussels sprouts",
        ],
        preparationNotes:
          "Lamb is roasted to medium-rare (135°F) by default. Please specify your preferred doneness when ordering. Allow 25 minutes for preparation. The rack is rested before carving for optimal juiciness.",
        allergies: ["Dairy", "Gluten"],
        pairings: [
          "chateau-margaux-2015",
          "sassicaia-2018",
          "wild-mushroom-risotto",
        ],
      },
      {
        id: "duck-breast-a-lorange",
        name: "Duck Breast à l'Orange",
        price: 45,
        excerpt:
          "Pan-roasted duck breast with orange glaze, wild rice, and braised endive. A classic French preparation that elevates duck with sweet citrus and bitter greens.",
        description:
          "Our interpretation of canard à l'orange uses Moulard duck breasts, scored and rendered slowly to achieve crispy skin. The orange sauce is made by reducing fresh juice with sugar, duck stock, and Grand Marnier. Served with wild rice pilaf and braised Belgian endive.",
        tags: ["French", "Classic"],
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
          "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
        ],
        rating: 4.7,
        reviewCount: 109,
        ingredients: [
          "Moulard duck breast",
          "Fresh oranges",
          "Grand Marnier",
          "Duck stock",
          "Sugar",
          "Wild rice",
          "Shallots",
          "Thyme",
          "Belgian endive",
          "Butter",
          "Chicken stock",
        ],
        preparationNotes:
          "Duck breast is rendered slowly for 12–15 minutes to achieve crispy skin. Served medium-rare by default. The orange sauce contains alcohol (Grand Marnier). Endive is braised until tender and slightly caramelized.",
        allergies: ["Alcohol"],
        pairings: [
          "chateau-margaux-2015",
          "foie-gras-torchon",
          "duck-confit-spring-rolls",
        ],
      },
      {
        id: "lobster-thermidor",
        name: "Lobster Thermidor",
        price: 68,
        excerpt:
          "Whole Maine lobster with brandy cream sauce, gruyère, and pommes purée. An opulent French classic that transforms fresh lobster into the ultimate indulgence.",
        description:
          "Lobster Thermidor is the pinnacle of French luxury dining. Live Maine lobsters are split, grilled, and the meat is combined with a rich brandy cream sauce and mushrooms, returned to the shell, topped with gruyère, and gratinéed until golden and bubbling. Served with classic pommes purée.",
        tags: ["Seafood", "Luxury"],
        image:
          "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&q=80",
          "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
          "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
        ],
        rating: 4.9,
        reviewCount: 91,
        ingredients: [
          "Live Maine lobster (2 lb)",
          "Cognac",
          "Heavy cream",
          "Gruyère cheese",
          "Dijon mustard",
          "Mushrooms",
          "Shallots",
          "White wine",
          "Butter",
          "Potatoes",
          "Haricots verts",
        ],
        preparationNotes:
          "Prepared with live lobster for maximum freshness. Allow 30 minutes for preparation. The brandy cream sauce contains alcohol. This is our most indulgent seafood dish—perfect for celebrations.",
        allergies: ["Shellfish", "Dairy", "Alcohol"],
        pairings: ["dom-perignon-2012", "seared-scallops", "creme-brulee"],
      },
      {
        id: "beef-wellington",
        name: "Beef Wellington",
        price: 62,
        excerpt:
          "Filet mignon wrapped in mushroom duxelles and puff pastry with red wine reduction. A legendary British dish that requires precision and rewards with layers of flavor.",
        description:
          "One of the most technically challenging dishes in classical cuisine. Center-cut beef tenderloin is seared, coated in mushroom duxelles and prosciutto, then encased in French puff pastry. Baked until golden while the beef remains medium-rare inside. Served with a red wine reduction.",
        tags: ["Premium", "Classic"],
        image:
          "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&q=80",
          "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        ],
        rating: 4.8,
        reviewCount: 146,
        ingredients: [
          "Beef tenderloin",
          "Mushroom duxelles",
          "Prosciutto",
          "Puff pastry",
          "Dijon mustard",
          "Egg wash",
          "Cabernet Sauvignon",
          "Beef stock",
          "Shallots",
          "Thyme",
          "Brandy",
        ],
        preparationNotes:
          "Allow 35–40 minutes for preparation. Served medium-rare by default—due to the pastry casing, only medium-rare to medium is achievable. The duxelles is prepared daily. Each Wellington is individually wrapped.",
        allergies: ["Gluten", "Dairy", "Egg"],
        pairings: ["sassicaia-2018", "opus-one-2017", "foie-gras-torchon"],
      },
      {
        id: "pan-seared-halibut",
        name: "Pan-Seared Halibut",
        price: 44,
        excerpt:
          "Fresh halibut with brown butter, capers, haricots verts, and fingerling potatoes. Clean, classic flavors that honor the delicate nature of this premium white fish.",
        description:
          "Pacific halibut from Alaskan waters, seared in clarified butter until a golden crust forms. Served with brown butter sauce, capers, haricots verts, and roasted fingerling potatoes.",
        tags: ["Seafood", "Light"],
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
          "https://images.unsplash.com/photo-1523218689796-d4c2ef4f3d72?q=80",
        ],
        rating: 4.6,
        reviewCount: 95,
        ingredients: [
          "Pacific halibut fillet",
          "Clarified butter",
          "Capers",
          "Fresh lemon",
          "Haricots verts",
          "Fingerling potatoes",
          "Olive oil",
          "Fresh herbs",
          "Salt",
          "White pepper",
        ],
        preparationNotes:
          "Halibut is seared to order—allow 12–15 minutes. The brown butter is prepared fresh for each dish. We recommend not ordering well-done to preserve the fish's delicate texture.",
        allergies: ["Fish", "Dairy"],
        pairings: [
          "cloudy-bay-sauvignon-blanc",
          "chablis-grand-cru",
          "oysters-rockefeller",
        ],
      },
      {
        id: "osso-buco",
        name: "Osso Buco",
        price: 46,
        excerpt:
          "Braised veal shank with gremolata, saffron risotto, and roasted root vegetables. A Northern Italian classic where slow-braising transforms tough cuts into fall-apart tenderness.",
        description:
          "A Milanese specialty showcasing the magic of slow-braising. Veal shanks are browned, then braised for 3–4 hours in white wine, veal stock, and tomatoes until fall-off-the-bone tender. Served atop saffron risotto with gremolata and roasted root vegetables.",
        tags: ["Italian", "Braised"],
        image:
          "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        ],
        rating: 4.8,
        reviewCount: 108,
        ingredients: [
          "Veal shank",
          "White wine",
          "Veal stock",
          "San Marzano tomatoes",
          "Carrots",
          "Celery",
          "Onion",
          "Saffron",
          "Arborio rice",
          "Fresh parsley",
          "Lemon zest",
          "Garlic",
          "Parsnips",
          "Turnips",
        ],
        preparationNotes:
          "Braised for 3–4 hours before service. The bone marrow in the center is meant to be scooped out and enjoyed. The gremolata is prepared fresh to order.",
        allergies: ["Alcohol", "Dairy"],
        pairings: [
          "barolo-riserva-2015",
          "sassicaia-2018",
          "wild-mushroom-risotto",
        ],
      },
      {
        id: "wild-salmon-provencal",
        name: "Wild Salmon Provençal",
        price: 42,
        excerpt:
          "Atlantic salmon with tomatoes, olives, capers, and herbed couscous. A Mediterranean preparation that celebrates summer flavors with fresh, vibrant ingredients.",
        description:
          "Wild-caught Atlantic salmon, pan-seared until crispy, with a light Provençal sauce of fresh tomatoes, Kalamata olives, capers, and fresh herbs. Served with pearl couscous tossed with lemon zest and olive oil.",
        tags: ["Seafood", "Mediterranean"],
        image:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        ],
        rating: 4.6,
        reviewCount: 92,
        ingredients: [
          "Wild Atlantic salmon",
          "Fresh tomatoes",
          "Kalamata olives",
          "Capers",
          "Pearl couscous",
          "Lemon zest",
          "Extra virgin olive oil",
          "Fresh basil",
          "Thyme",
          "Garlic",
          "Haricots verts",
        ],
        preparationNotes:
          "Salmon is seared skin-side down for a crispy finish. The Provençal sauce is light and fresh, prepared à la minute. Pearl couscous is cooked like pasta for optimal texture.",
        allergies: ["Fish", "Gluten"],
        pairings: [
          "cloudy-bay-sauvignon-blanc",
          "grilled-octopus",
          "lemon-tart",
        ],
      },
      {
        id: "chicken-supreme",
        name: "Chicken Supreme",
        price: 38,
        excerpt:
          "Sous-vide chicken breast with morel cream sauce, asparagus, and potato gratin. Classic French technique meets modern cooking methods for perfectly tender chicken.",
        description:
          "A boneless, skin-on chicken breast cooked sous-vide at 145°F for one hour, then seared for crispy skin. Served with a seasonal morel cream sauce, blanched asparagus, and a gruyère potato gratin baked until golden.",
        tags: ["Classic", "Creamy"],
        image:
          "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
          "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
        ],
        rating: 4.5,
        reviewCount: 88,
        ingredients: [
          "Free-range chicken breast",
          "Fresh morel mushrooms",
          "Heavy cream",
          "Chicken stock",
          "Fresh asparagus",
          "Potatoes",
          "Gruyère cheese",
          "Garlic",
          "Butter",
          "Fresh thyme",
        ],
        preparationNotes:
          "Chicken is sous-vide cooked for 1 hour then seared. Allow 15 minutes for final preparation. The morel sauce is seasonal—when morels are unavailable, we substitute with chanterelles. The gratin is baked fresh each service.",
        allergies: ["Dairy"],
        pairings: [
          "chablis-grand-cru",
          "wild-mushroom-risotto",
          "creme-brulee",
        ],
      },
      {
        id: "venison-medallions",
        name: "Venison Medallions",
        price: 55,
        excerpt:
          "Pan-seared venison with blackberry reduction, brussels sprouts, and sweet potato purée. Wild game elegantly prepared, showcasing autumn's finest flavors and ingredients.",
        description:
          "Sustainably farmed venison loin, portioned into medallions and seared to medium-rare. Served with a blackberry and red wine reduction, roasted brussels sprouts, and sweet potato purée enriched with butter and cinnamon.",
        tags: ["Game", "Seasonal"],
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
          "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        ],
        rating: 4.7,
        reviewCount: 67,
        ingredients: [
          "Venison loin",
          "Fresh blackberries",
          "Red wine",
          "Shallots",
          "Sugar",
          "Brussels sprouts",
          "Sweet potatoes",
          "Butter",
          "Cinnamon",
          "Salt",
          "Black pepper",
        ],
        preparationNotes:
          "Venison is best served medium-rare to preserve tenderness. Allow 15 minutes. The blackberry reduction is made fresh daily. This is a seasonal dish—availability may vary.",
        allergies: ["Alcohol", "Dairy"],
        pairings: [
          "penfolds-grange-2016",
          "chateau-margaux-2015",
          "chocolate-souffle",
        ],
      },
    ],
  },
  {
    id: "grill",
    title: "From the Grill",
    description: "Prime cuts cooked to perfection over charcoal",
    items: [
      {
        id: "wagyu-ribeye",
        name: "Wagyu Ribeye",
        price: 95,
        excerpt:
          "16oz Japanese A5 wagyu ribeye with garlic butter, served with truffle fries. The ultimate steak experience featuring the world's most marbled, luxurious beef.",
        description:
          "Authentic Japanese A5 wagyu from Miyazaki prefecture with a marbling score of 10+. Aged 21 days, grilled over charcoal, and finished with roasted garlic compound butter. Served with truffle fries and a watercress salad.",
        tags: ["Premium", "Signature"],
        image:
          "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
        ],
        rating: 5.0,
        reviewCount: 203,
        ingredients: [
          "Japanese A5 wagyu ribeye (16oz)",
          "Roasted garlic",
          "Compound butter",
          "Hand-cut potatoes",
          "White truffle oil",
          "Parmesan",
          "Fresh parsley",
          "Watercress",
          "Lemon",
          "Sea salt",
          "Black pepper",
        ],
        preparationNotes:
          "We recommend medium-rare for A5 wagyu to allow the marbling to render properly. Due to the extreme richness, portions can be shared. Allow 20 minutes. Truffle fries are double-fried to order.",
        allergies: ["Dairy"],
        pairings: [
          "screaming-eagle-cabernet",
          "opus-one-2017",
          "beef-carpaccio",
        ],
      },
      {
        id: "tomahawk-steak",
        name: "Tomahawk Steak",
        price: 110,
        excerpt:
          "32oz dry-aged bone-in ribeye for two, with chimichurri and roasted vegetables. A dramatic presentation of prime beef, perfect for sharing and celebrating.",
        description:
          "A 32-ounce dry-aged bone-in ribeye aged for 45 days. Seasoned with coarse salt and pepper, grilled over hardwood charcoal, and rested for 10 minutes. Served with chimichurri and charred seasonal vegetables. Designed for two.",
        tags: ["Premium", "Shareable"],
        image:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
          "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
          "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80",
        ],
        rating: 4.9,
        reviewCount: 167,
        ingredients: [
          "Dry-aged bone-in ribeye (32oz)",
          "Coarse salt",
          "Cracked black pepper",
          "Fresh parsley",
          "Cilantro",
          "Garlic",
          "Olive oil",
          "Red wine vinegar",
          "Seasonal vegetables",
        ],
        preparationNotes:
          "This cut is designed to share between two diners. Allow 30 minutes for grilling and resting. Dry-aged for 45 days for concentrated flavor. Specify doneness when ordering.",
        allergies: [],
        pairings: [
          "penfolds-grange-2016",
          "sassicaia-2018",
          "foie-gras-torchon",
        ],
      },
      {
        id: "filet-mignon",
        name: "Filet Mignon",
        price: 58,
        excerpt:
          "8oz center-cut tenderloin with peppercorn crust and béarnaise sauce. The most tender cut of beef, prepared classically and served with luxurious French accompaniments.",
        description:
          "Prime grade center-cut tenderloin coated in crushed black, pink, and green peppercorns. Seared at high temperature, then oven-finished. Served with classic béarnaise sauce, roasted asparagus, and crispy potato galette.",
        tags: ["Classic", "Tender"],
        image:
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
          "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        ],
        rating: 4.8,
        reviewCount: 189,
        ingredients: [
          "Prime beef tenderloin (8oz)",
          "Black peppercorns",
          "Pink peppercorns",
          "Green peppercorns",
          "Egg yolks",
          "Butter",
          "White wine vinegar",
          "Fresh tarragon",
          "Asparagus",
          "Potatoes",
        ],
        preparationNotes:
          "Specify your preferred doneness. The peppercorn crust provides gentle heat. Béarnaise is made fresh—it contains raw egg yolk. Potato galette is pan-fried until crispy.",
        allergies: ["Dairy", "Egg"],
        pairings: ["opus-one-2017", "chateau-margaux-2015", "lobster-bisque"],
      },
      {
        id: "new-york-strip",
        name: "New York Strip",
        price: 52,
        excerpt:
          "14oz prime strip steak with herb butter and crispy onion strings. A bold, beefy cut that delivers intense flavor with every bite.",
        description:
          "Prime grade New York strip with generous marbling throughout. Seasoned with coarse salt and pepper, grilled over high heat. Topped with rosemary-thyme-garlic compound butter and crispy onion strings. Served with steak fries and grilled broccolini.",
        tags: ["Classic", "Bold"],
        image:
          "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=800&q=80",
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
          "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
        ],
        rating: 4.7,
        reviewCount: 145,
        ingredients: [
          "Prime New York strip (14oz)",
          "Coarse salt",
          "Black pepper",
          "Rosemary",
          "Thyme",
          "Garlic",
          "Butter",
          "Onions",
          "Seasoned flour",
          "Steak fries",
          "Broccolini",
        ],
        preparationNotes:
          "Grilled over high heat for a dark, caramelized crust. The herb butter melts into the steak creating a natural sauce. Onion strings are fried to order. Specify your doneness preference.",
        allergies: ["Dairy", "Gluten"],
        pairings: ["sassicaia-2018", "opus-one-2017", "beef-carpaccio"],
      },
      {
        id: "porterhouse",
        name: "Porterhouse",
        price: 85,
        excerpt:
          "24oz dry-aged porterhouse with bone marrow butter and grilled asparagus. Two steaks in one, combining tender filet and flavorful strip in one magnificent cut.",
        description:
          "A 24-ounce cut featuring both filet mignon and New York strip separated by a T-bone. Dry-aged 30 days. Grilled over hardwood charcoal, sliced off the bone, and topped with bone marrow butter. Served with asparagus and fingerling potatoes.",
        tags: ["Premium", "Aged"],
        image:
          "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80",
          "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
        ],
        rating: 4.8,
        reviewCount: 112,
        ingredients: [
          "Dry-aged porterhouse (24oz)",
          "Bone marrow",
          "Butter",
          "Parsley",
          "Lemon zest",
          "Asparagus",
          "Fingerling potatoes",
          "Olive oil",
          "Sea salt",
          "Black pepper",
        ],
        preparationNotes:
          "Dry-aged 30 days for a nutty, concentrated flavor. The bone marrow butter is whipped with parsley and lemon zest. Sliced off the bone tableside for dramatic presentation. Allow 25 minutes.",
        allergies: ["Dairy"],
        pairings: [
          "penfolds-grange-2016",
          "screaming-eagle-cabernet",
          "foie-gras-torchon",
        ],
      },
      {
        id: "lamb-chops",
        name: "Lamb Chops",
        price: 48,
        excerpt:
          "Four grilled lamb chops with rosemary, garlic, and mint chimichurri. Tender, flavorful chops that showcase the natural sweetness of premium lamb.",
        description:
          "Four thick-cut New Zealand lamb chops, French-trimmed and marinated in olive oil, rosemary, garlic, and lemon zest. Grilled to medium-rare with crispy fat edges. Served with mint chimichurri, roasted baby potatoes, and grilled zucchini.",
        tags: ["Classic", "Aromatic"],
        image: "https://images.unsplash.com/photo-1550367363-ea12860cc124?q=80",
        images: [
          "https://images.unsplash.com/photo-1550367363-ea12860cc124?q=80",
          "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        ],
        rating: 4.7,
        reviewCount: 98,
        ingredients: [
          "New Zealand lamb chops (4)",
          "Olive oil",
          "Fresh rosemary",
          "Garlic",
          "Lemon zest",
          "Fresh mint",
          "Parsley",
          "Cilantro",
          "Red wine vinegar",
          "Baby potatoes",
          "Zucchini",
        ],
        preparationNotes:
          "Marinated briefly before grilling. Served medium-rare by default. Each chop is perfect for eating with your hands. The mint chimichurri is our twist on the classic Argentinian sauce.",
        allergies: [],
        pairings: [
          "barolo-riserva-2015",
          "chateau-margaux-2015",
          "herb-crusted-lamb-rack",
        ],
      },
      {
        id: "pork-tomahawk",
        name: "Pork Tomahawk",
        price: 44,
        excerpt:
          "16oz bone-in pork chop with apple chutney and sage butter. A succulent chop that pairs pork's natural sweetness with autumn-inspired accompaniments.",
        description:
          "Heritage breed pork rib chop with extra-long bone, brined overnight. Grilled to 145°F with a slightly pink interior for maximum juiciness. Topped with sage brown butter and served with apple chutney, roasted brussels sprouts, and sweet potato mash.",
        tags: ["Hearty", "Sweet"],
        image:
          "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=800&q=80",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
          "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
        ],
        rating: 4.5,
        reviewCount: 74,
        ingredients: [
          "Heritage breed pork chop (16oz)",
          "Salt brine",
          "Sugar",
          "Aromatics",
          "Fresh sage",
          "Brown butter",
          "Apples",
          "Onions",
          "Apple cider vinegar",
          "Warming spices",
          "Brussels sprouts",
          "Sweet potatoes",
        ],
        preparationNotes:
          "Brined overnight for seasoning and moisture retention. Served slightly pink (145°F) per modern guidelines for juicier pork. The apple chutney is house-made with warming spices. Allow 20 minutes.",
        allergies: ["Dairy"],
        pairings: [
          "opus-one-2017",
          "apple-tarte-tatin",
          "wild-mushroom-risotto",
        ],
      },
      {
        id: "grilled-branzino",
        name: "Grilled Branzino",
        price: 46,
        excerpt:
          "Whole Mediterranean sea bass with lemon, herbs, and olive oil. Simply prepared fish that showcases the essence of coastal Mediterranean cooking.",
        description:
          "Whole branzino stuffed with lemon, garlic, and fresh herbs, then grilled over medium-high heat until the skin is charred and the flesh is opaque. Finished with extra virgin olive oil, lemon, and flaky sea salt. Presented whole at the table.",
        tags: ["Seafood", "Light"],
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
          "https://images.unsplash.com/photo-1523218689796-d4c2ef4f3d72?q=80",
        ],
        rating: 4.6,
        reviewCount: 83,
        ingredients: [
          "Whole branzino (1 lb)",
          "Fresh lemon",
          "Garlic cloves",
          "Fresh thyme",
          "Rosemary",
          "Parsley",
          "Extra virgin olive oil",
          "Flaky sea salt",
          "Black pepper",
        ],
        preparationNotes:
          "Served whole with head and tail intact for freshness presentation. Our staff can debone the fish tableside upon request. Allow 15–18 minutes. The simplicity of this dish lets the fish quality shine.",
        allergies: ["Fish"],
        pairings: [
          "chablis-grand-cru",
          "cloudy-bay-sauvignon-blanc",
          "lemon-tart",
        ],
      },
      {
        id: "surf-and-turf",
        name: "Surf & Turf",
        price: 72,
        excerpt:
          "6oz filet mignon with grilled lobster tail and drawn butter. The classic combination of premium beef and succulent lobster for the ultimate indulgence.",
        description:
          "A 6-ounce center-cut filet mignon grilled to your preference alongside a butterflied Maine lobster tail brushed with garlic butter and grilled. Served with drawn butter, garlic mashed potatoes, and grilled asparagus.",
        tags: ["Luxury", "Combo"],
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
          "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&q=80",
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
        ],
        rating: 4.9,
        reviewCount: 131,
        ingredients: [
          "Beef tenderloin (6oz)",
          "Maine lobster tail",
          "Garlic butter",
          "Clarified butter",
          "Lemon",
          "Fresh herbs",
          "Potatoes",
          "Heavy cream",
          "Garlic",
          "Asparagus",
        ],
        preparationNotes:
          "Specify your preferred doneness for the filet. The lobster tail is grilled until just opaque. Drawn butter is served warm for dipping. Allow 20 minutes for preparation.",
        allergies: ["Shellfish", "Dairy"],
        pairings: [
          "screaming-eagle-cabernet",
          "dom-perignon-2012",
          "seared-scallops",
        ],
      },
      {
        id: "bbq-beef-ribs",
        name: "BBQ Beef Ribs",
        price: 42,
        excerpt:
          "Slow-smoked beef short ribs with house BBQ sauce and coleslaw. Fall-off-the-bone tender ribs with bold, smoky-sweet flavors that define American barbecue.",
        description:
          "Beef plate short ribs smoked for 12 hours at 225°F over hickory and oak. Seasoned with our house dry rub and glazed with house BBQ sauce during the final hour. Served three per order with coleslaw, cornbread, and baked beans.",
        tags: ["Smoky", "Tender"],
        image:
          "https://images.unsplash.com/photo-1611354574034-9655b5b72d59?q=80",
        images: [
          "https://images.unsplash.com/photo-1611354574034-9655b5b72d59?q=80",
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
          "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
        ],
        rating: 4.7,
        reviewCount: 119,
        ingredients: [
          "Beef plate short ribs (3)",
          "Paprika",
          "Brown sugar",
          "Garlic powder",
          "Onion powder",
          "House spice blend",
          "Hickory wood",
          "Oak wood",
          "House BBQ sauce",
          "Cabbage",
          "Carrots",
          "Mayo",
          "Cornbread",
          "Baked beans",
        ],
        preparationNotes:
          "Smoked for 12 hours—these are prepared well in advance. Limited availability each day. This is a messy, hands-on dish—we provide extra napkins. Three massive ribs per order.",
        allergies: ["Egg", "Gluten", "Dairy"],
        pairings: ["penfolds-grange-2016", "new-york-strip", "cheesecake"],
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    description: "The perfect sweet ending",
    items: [
      {
        id: "creme-brulee",
        name: "Crème Brûlée",
        price: 14,
        excerpt:
          "Classic vanilla custard with caramelized sugar and fresh berries. Silky smooth custard beneath a crackling caramelized sugar shell—the quintessential French dessert.",
        description:
          "The epitome of French dessert elegance. Madagascar vanilla bean custard baked in a water bath until just set, then topped with caramelized sugar that shatters when tapped. Served with fresh seasonal berries.",
        tags: ["Classic", "Creamy"],
        image:
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
          "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&q=80",
        ],
        rating: 4.8,
        reviewCount: 198,
        ingredients: [
          "Heavy cream",
          "Madagascar vanilla beans",
          "Egg yolks",
          "Sugar",
          "Fresh strawberries",
          "Blueberries",
          "Raspberries",
        ],
        preparationNotes:
          "Custard is prepared fresh daily and chilled for several hours. The sugar is caramelized tableside with a blowtorch just before serving. Best enjoyed immediately while the caramel is still crispy.",
        allergies: ["Dairy", "Egg"],
        pairings: [
          "dom-perignon-2012",
          "moet-chandon-rose",
          "lobster-thermidor",
        ],
      },
      {
        id: "chocolate-lava-cake",
        name: "Chocolate Lava Cake",
        price: 16,
        excerpt:
          "Warm chocolate cake with molten center, vanilla ice cream, and raspberry coulis. Rich, decadent chocolate that flows like lava when you break through the tender cake.",
        description:
          "Premium Belgian chocolate melted with butter, combined with eggs and just a touch of flour. Baked at high temperature for exactly 8 minutes—the outside sets while the center remains gloriously molten. Served with house-made vanilla ice cream and raspberry coulis.",
        tags: ["Chocolate", "Warm"],
        image:
          "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
        ],
        rating: 4.9,
        reviewCount: 221,
        ingredients: [
          "Belgian dark chocolate",
          "Butter",
          "Eggs",
          "Sugar",
          "Flour",
          "Madagascar vanilla ice cream",
          "Fresh raspberries",
          "Powdered sugar",
          "Fresh mint",
        ],
        preparationNotes:
          "Baked to order—allow 12 minutes. The cake must be served immediately while the center is still molten. The hot-cold contrast with ice cream is essential to the experience.",
        allergies: ["Dairy", "Egg", "Gluten"],
        pairings: [
          "moet-chandon-rose",
          "dom-perignon-2012",
          "foie-gras-torchon",
        ],
      },
      {
        id: "tiramisu",
        name: "Tiramisu",
        price: 15,
        excerpt:
          "Traditional Italian dessert with espresso-soaked ladyfingers and mascarpone. Layers of coffee-soaked cake and velvety cream create the perfect pick-me-up dessert.",
        description:
          "Traditional Venetian preparation with savoiardi dipped in espresso and coffee liqueur, layered with mascarpone cream whipped with egg yolks, Marsala wine, and folded with whipped cream. Dusted generously with cocoa powder.",
        tags: ["Italian", "Coffee"],
        image:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
          "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
        ],
        rating: 4.7,
        reviewCount: 163,
        ingredients: [
          "Mascarpone cheese",
          "Savoiardi ladyfingers",
          "Espresso",
          "Coffee liqueur",
          "Egg yolks",
          "Sugar",
          "Marsala wine",
          "Heavy cream",
          "Cocoa powder",
        ],
        preparationNotes:
          "Assembled fresh and chilled for several hours to allow flavors to meld. Contains raw egg yolks and alcohol (coffee liqueur and Marsala). Contains caffeine from espresso.",
        allergies: ["Dairy", "Egg", "Gluten", "Alcohol"],
        pairings: [
          "dom-perignon-2012",
          "chocolate-lava-cake",
          "foie-gras-torchon",
        ],
      },
      {
        id: "lemon-tart",
        name: "Lemon Tart",
        price: 13,
        excerpt:
          "Tangy lemon curd in buttery pastry with torched meringue. Bright, citrusy filling balanced by sweet meringue and crisp pastry—a perfect harmony of flavors.",
        description:
          "Pâte sucrée shell blind-baked until golden, filled with intensely tart lemon curd, and topped with Italian meringue torched to golden peaks. Served with fresh berries and a tuile cookie.",
        tags: ["Citrus", "Light"],
        image:
          "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&q=80",
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
        ],
        rating: 4.6,
        reviewCount: 107,
        ingredients: [
          "Fresh lemons",
          "Lemon zest",
          "Sugar",
          "Eggs",
          "Butter",
          "Flour",
          "Egg whites",
          "Fresh berries",
          "Tuile cookie",
        ],
        preparationNotes:
          "The meringue is torched just before serving. The lemon curd is made fresh daily. Best for those who prefer fruit-based desserts over chocolate. Perfectly refreshing after a rich meal.",
        allergies: ["Dairy", "Egg", "Gluten"],
        pairings: [
          "cloudy-bay-sauvignon-blanc",
          "grilled-branzino",
          "wild-salmon-provencal",
        ],
      },
      {
        id: "cheesecake",
        name: "Cheesecake",
        price: 14,
        excerpt:
          "New York-style cheesecake with seasonal berry compote. Dense, creamy, and intensely flavored—the ultimate expression of this American classic dessert.",
        description:
          "Dense, rich New York-style cheesecake made with full-fat cream cheese, sour cream, and heavy cream on a graham cracker crust. Baked in a water bath, chilled overnight, and topped with seasonal berry compote.",
        tags: ["Classic", "Rich"],
        image:
          "https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80",
        images: [
          "https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80",
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
        ],
        rating: 4.7,
        reviewCount: 154,
        ingredients: [
          "Cream cheese",
          "Sour cream",
          "Heavy cream",
          "Eggs",
          "Sugar",
          "Graham crackers",
          "Butter",
          "Fresh seasonal berries",
          "Lemon juice",
          "Whipped cream",
          "Fresh mint",
        ],
        preparationNotes:
          "Baked in a water bath and chilled overnight for the creamiest texture. The berry compote changes with the seasons. Generous slices—great for sharing or indulging.",
        allergies: ["Dairy", "Egg", "Gluten"],
        pairings: ["moet-chandon-rose", "bbq-beef-ribs", "chicken-supreme"],
      },
      {
        id: "panna-cotta",
        name: "Panna Cotta",
        price: 12,
        excerpt:
          "Silky vanilla panna cotta with passion fruit coulis. An elegant Italian dessert that's light, creamy, and perfumed with vanilla—simple sophistication on a plate.",
        description:
          "Heavy cream gently heated with sugar and vanilla beans, set with just enough gelatin for a delicate wobble. Unmolded and served with vibrant passion fruit coulis, fresh berries, and mint.",
        tags: ["Italian", "Light"],
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
          "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&q=80",
        ],
        rating: 4.5,
        reviewCount: 89,
        ingredients: [
          "Heavy cream",
          "Sugar",
          "Madagascar vanilla beans",
          "Gelatin",
          "Fresh passion fruit",
          "Fresh berries",
          "Mint leaves",
        ],
        preparationNotes:
          "Set for several hours before service. The panna cotta should have a gentle wobble indicating its tender texture. Light enough to enjoy after a heavy meal.",
        allergies: ["Dairy"],
        pairings: [
          "cloudy-bay-sauvignon-blanc",
          "grilled-branzino",
          "tuna-tartare",
        ],
      },
      {
        id: "apple-tarte-tatin",
        name: "Apple Tarte Tatin",
        price: 15,
        excerpt:
          "Caramelized upside-down apple tart with cinnamon ice cream. Buttery caramel, tender apples, and flaky pastry create a warm, comforting French classic.",
        description:
          "Butter and sugar cooked to amber caramel, topped with apple halves and baked slowly until tender. Covered with puff pastry and baked until golden, then inverted to reveal glistening caramelized apples. Served warm with cinnamon ice cream.",
        tags: ["French", "Warm"],
        image:
          "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=80",
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
          "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
        ],
        rating: 4.6,
        reviewCount: 96,
        ingredients: [
          "Apples",
          "Butter",
          "Sugar",
          "Puff pastry",
          "Cinnamon ice cream",
          "Cinnamon",
          "Vanilla",
        ],
        preparationNotes:
          "Baked fresh—allow 20 minutes. Best enjoyed warm with the cold cinnamon ice cream for temperature contrast.",
        allergies: ["Dairy", "Gluten", "Egg"],
        pairings: ["pork-tomahawk", "dom-perignon-2012", "foie-gras-torchon"],
      },
      {
        id: "chocolate-souffle",
        name: "Chocolate Soufflé",
        price: 18,
        excerpt:
          "Light chocolate soufflé with crème anglaise, requiring 20-minute preparation. A dramatic dessert that rises high and delivers pure chocolate heaven in every spoonful.",
        description:
          "Dark chocolate base enriched with egg yolks, with whipped egg whites folded in for dramatic rise. Baked in buttered, sugared ramekins until puffed high. Served immediately with crème anglaise poured into the center.",
        tags: ["Chocolate", "Signature"],
        image:
          "https://images.unsplash.com/photo-1593963372393-dd4e4c7861d4?q=80",
        images: [
          "https://images.unsplash.com/photo-1593963372393-dd4e4c7861d4?q=80",
          "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
        ],
        rating: 4.9,
        reviewCount: 137,
        ingredients: [
          "Dark chocolate",
          "Butter",
          "Egg yolks",
          "Egg whites",
          "Sugar",
          "Vanilla custard sauce (crème anglaise)",
          "Milk",
          "Vanilla beans",
        ],
        preparationNotes:
          "Must be ordered in advance—requires exactly 20 minutes to bake. Begins to deflate immediately upon leaving the oven, so must be served and eaten right away.",
        allergies: ["Dairy", "Egg"],
        pairings: [
          "venison-medallions",
          "screaming-eagle-cabernet",
          "foie-gras-torchon",
        ],
      },
      {
        id: "profiteroles",
        name: "Profiteroles",
        price: 14,
        excerpt:
          "Choux pastry filled with vanilla cream, topped with warm chocolate sauce. Light, airy pastries that combine cream and chocolate in perfect bite-sized harmony.",
        description:
          "Pâte à choux baked until golden and hollow, filled with vanilla pastry cream, arranged in a pyramid, and drizzled with warm chocolate sauce. Garnished with powdered sugar and mint.",
        tags: ["French", "Classic"],
        image:
          "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80",
          "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
        ],
        rating: 4.6,
        reviewCount: 104,
        ingredients: [
          "Water",
          "Butter",
          "Flour",
          "Eggs",
          "Milk",
          "Egg yolks",
          "Sugar",
          "Vanilla beans",
          "Dark chocolate",
          "Heavy cream",
          "Powdered sugar",
          "Fresh mint",
        ],
        preparationNotes:
          "Choux shells are baked fresh each service. The warm chocolate sauce contrasts with the cold pastry cream for an indulgent combination.",
        allergies: ["Dairy", "Egg", "Gluten"],
        pairings: ["moet-chandon-rose", "chocolate-lava-cake", "tiramisu"],
      },
      {
        id: "mille-feuille",
        name: "Mille-Feuille",
        price: 16,
        excerpt:
          "Thousand-layer pastry with vanilla cream and caramelized top. Delicate layers of crispy pastry and silky cream showcase French pastry technique at its finest.",
        description:
          "Three layers of ultra-thin, golden puff pastry filled with vanilla crème pâtissière lightened with whipped cream. The top is caramelized for extra crunch. Requires a knife and fork—shatters beautifully with each bite.",
        tags: ["French", "Delicate"],
        image:
          "https://images.unsplash.com/photo-1593424718424-cf4d83f3def1?q=80",
        images: [
          "https://images.unsplash.com/photo-1593424718424-cf4d83f3def1?q=80",
          "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80",
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
        ],
        rating: 4.7,
        reviewCount: 82,
        ingredients: [
          "Puff pastry",
          "Milk",
          "Egg yolks",
          "Sugar",
          "Cornstarch",
          "Vanilla beans",
          "Heavy cream",
          "Fondant",
          "Dark chocolate",
        ],
        preparationNotes:
          "Assembled to order to maintain pastry crispness. The caramelized top is done with a blowtorch. Eat immediately—the pastry softens over time.",
        allergies: ["Dairy", "Egg", "Gluten"],
        pairings: ["dom-perignon-2012", "creme-brulee", "chicken-supreme"],
      },
    ],
  },
  {
    id: "wines",
    title: "Wines",
    description: "Selected wines to pair with your meal",
    items: [
      {
        id: "chateau-margaux-2015",
        name: "Château Margaux 2015",
        price: 450,
        excerpt:
          "Bordeaux red blend from Margaux with notes of blackcurrant, cedar, and violets. A first-growth wine that exemplifies the elegance and complexity of great Bordeaux.",
        description:
          "One of only five first-growth estates in Bordeaux. The 2015 vintage earned perfect scores from multiple critics. A Cabernet Sauvignon-dominant blend showing deep ruby color, extraordinary complexity with waves of blackcurrant, cedar, tobacco, and violet. Full-bodied yet incredibly elegant with silky tannins and a seemingly endless finish.",
        tags: ["Red", "French"],
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
          "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80",
          "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
        ],
        rating: 5.0,
        reviewCount: 47,
        ingredients: [
          "Cabernet Sauvignon",
          "Merlot",
          "Cabernet Franc",
          "Petit Verdot",
        ],
        preparationNotes:
          "Decant 1–2 hours before serving. Serve at 16–18°C. Can be enjoyed now but will continue to develop for decades. Best paired with red meats and rich dishes.",
        allergies: ["Sulphites"],
        pairings: [
          "herb-crusted-lamb-rack",
          "beef-wellington",
          "duck-breast-a-lorange",
        ],
      },
      {
        id: "dom-perignon-2012",
        name: "Dom Pérignon 2012",
        price: 380,
        excerpt:
          "Vintage champagne with elegant bubbles and brioche notes. The most prestigious champagne house delivering complexity, refinement, and celebration in every glass.",
        description:
          "Prestige cuvée made only in exceptional years. The 2012 vintage is rich and full-bodied yet maintains elegant freshness. Pale gold with fine bubbles, aromas of white flowers, citrus, brioche, and honey. Creamy and luxurious on the palate with perfect acidity.",
        tags: ["Champagne", "Luxury"],
        image:
          "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&q=80",
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
          "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80",
        ],
        rating: 4.9,
        reviewCount: 38,
        ingredients: ["Chardonnay", "Pinot Noir"],
        preparationNotes:
          "Serve well-chilled at 8–10°C. At least 8 years aging on lees. Perfect as an aperitif or paired with oysters, lobster, or foie gras.",
        allergies: ["Sulphites"],
        pairings: [
          "oysters-rockefeller",
          "lobster-thermidor",
          "foie-gras-torchon",
        ],
      },
      {
        id: "sassicaia-2018",
        name: "Sassicaia 2018",
        price: 320,
        excerpt:
          "Super Tuscan with bold tannins and dark fruit flavors. Italy's most famous Bordeaux-style blend, offering power, elegance, and remarkable aging potential.",
        description:
          "The wine that created the Super Tuscan category. Deep ruby with purple edges, intense aromas of blackcurrant, plum, cedar, and dark chocolate. Full-bodied and powerful with firm tannins, concentrated fruit, and remarkable length.",
        tags: ["Red", "Italian"],
        image:
          "https://images.unsplash.com/photo-1606605811503-93b16f35e06b?q=80&w=2070&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1606605811503-93b16f35e06b?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
          "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80",
        ],
        rating: 4.8,
        reviewCount: 42,
        ingredients: ["Cabernet Sauvignon", "Cabernet Franc"],
        preparationNotes:
          "Decant 1 hour before serving. Serve at 16–18°C. Pairs excellently with grilled steaks and beef Wellington.",
        allergies: ["Sulphites"],
        pairings: ["beef-wellington", "tomahawk-steak", "osso-buco"],
      },
      {
        id: "cloudy-bay-sauvignon-blanc",
        name: "Cloudy Bay Sauvignon Blanc",
        price: 85,
        excerpt:
          "New Zealand white with tropical fruit and crisp acidity. The wine that put Marlborough on the map, delivering vibrant fruit and refreshing minerality.",
        description:
          "The wine that introduced the world to Marlborough Sauvignon Blanc. Pale straw with green highlights, bursting with passion fruit, grapefruit, lime, and gooseberry aromas.",
        tags: ["White", "Fresh"],
        image:
          "https://images.unsplash.com/photo-1641835626111-4932061672ea?q=80",
        images: [
          "https://images.unsplash.com/photo-1641835626111-4932061672ea?q=80",
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
          "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80",
        ],
        rating: 4.5,
        reviewCount: 67,
        ingredients: ["Sauvignon Blanc"],
        preparationNotes:
          "Serve well-chilled at 6–8°C. Best enjoyed within 2–3 years of vintage.",
        allergies: ["Sulphites"],
        pairings: ["seared-scallops", "pan-seared-halibut", "grilled-octopus"],
      },
      {
        id: "opus-one-2017",
        name: "Opus One 2017",
        price: 420,
        excerpt:
          "Napa Valley red blend with cassis, vanilla, and smooth tannins. A Franco-American collaboration producing Bordeaux-style wine with California power and elegance.",
        description:
          "Created in 1979 as a joint venture between Baron Philippe de Rothschild and Robert Mondavi. Deep purple with aromas of cassis, blackberry, vanilla, and mocha. Full-bodied and rich with velvety tannins and a long, satisfying finish.",
        tags: ["Red", "American"],
        image: "https://images.unsplash.com/photo-1558670426-931963635470?q=80",
        images: [
          "https://images.unsplash.com/photo-1558670426-931963635470?q=80",
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
          "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80",
        ],
        rating: 4.8,
        reviewCount: 55,
        ingredients: [
          "Cabernet Sauvignon",
          "Cabernet Franc",
          "Merlot",
          "Petit Verdot",
          "Malbec",
        ],
        preparationNotes:
          "Decant 30–60 minutes before serving. Serve at 16–18°C. Approachable now but will develop for 15–20 years.",
        allergies: ["Sulphites"],
        pairings: ["wagyu-ribeye", "filet-mignon", "beef-wellington"],
      },
      {
        id: "penfolds-grange-2016",
        name: "Penfolds Grange 2016",
        price: 650,
        excerpt:
          "Australian Shiraz with intense fruit, spice, and oak complexity. Australia's most iconic wine, offering power, complexity, and remarkable longevity.",
        description:
          "Australia's most celebrated wine. Deep purple-black, extraordinarily intense with waves of blackberry, plum, licorice, dark chocolate, and espresso. Full-bodied and powerful with firm tannins.",
        tags: ["Red", "Bold"],
        image:
          "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80",
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
          "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
        ],
        rating: 5.0,
        reviewCount: 31,
        ingredients: ["Shiraz", "Cabernet Sauvignon (small amount)"],
        preparationNotes:
          "Decant 2–3 hours before serving for this young vintage. Serve at 16–18°C. Will develop for 30+ years.",
        allergies: ["Sulphites"],
        pairings: ["tomahawk-steak", "porterhouse", "venison-medallions"],
      },
      {
        id: "chablis-grand-cru",
        name: "Chablis Grand Cru",
        price: 145,
        excerpt:
          "Premier French Chardonnay with minerality and citrus notes. Unoaked Chardonnay that showcases pure fruit, steely minerality, and the unique terroir of Chablis.",
        description:
          "The purest expression of Chardonnay from Burgundy's northernmost region. Pale gold with aromas of green apple, lemon, and flinty mineral character.",
        tags: ["White", "French"],
        image:
          "https://images.unsplash.com/photo-1599113656124-b96bf21e30d3?q=80",
        images: [
          "https://images.unsplash.com/photo-1599113656124-b96bf21e30d3?q=80",
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
          "https://images.unsplash.com/photo-1641835626111-4932061672ea?q=80",
        ],
        rating: 4.7,
        reviewCount: 53,
        ingredients: ["Chardonnay"],
        preparationNotes:
          "Serve chilled at 10–12°C. No oak aging—pure fruit and mineral expression.",
        allergies: ["Sulphites"],
        pairings: [
          "oysters-rockefeller",
          "chilean-sea-bass",
          "seared-scallops",
        ],
      },
      {
        id: "barolo-riserva-2015",
        name: "Barolo Riserva 2015",
        price: 180,
        excerpt:
          "Piedmont Nebbiolo with cherry, tar, and rose petal aromas. The 'king of wines' from Italy, offering complex aromatics, firm tannins, and exceptional aging potential.",
        description:
          "Made from Nebbiolo grapes. Riserva designation means 5+ years aging including 3 in oak. Garnet color with complex aromas of red cherry, dried rose petals, tar, leather, and truffle.",
        tags: ["Red", "Italian"],
        image:
          "https://images.unsplash.com/photo-1619810490925-e27ba7623459?q=80",
        images: [
          "https://images.unsplash.com/photo-1619810490925-e27ba7623459?q=80",
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
          "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80",
        ],
        rating: 4.8,
        reviewCount: 44,
        ingredients: ["Nebbiolo"],
        preparationNotes:
          "Decant 2 hours before serving. Serve at 16–18°C. Will evolve for 20+ years.",
        allergies: ["Sulphites"],
        pairings: [
          "osso-buco",
          "herb-crusted-lamb-rack",
          "wild-mushroom-risotto",
        ],
      },
      {
        id: "moet-chandon-rose",
        name: "Moët & Chandon Rosé",
        price: 120,
        excerpt:
          "Pink champagne with red berry flavors and fine bubbles. Elegant rosé champagne that combines fruit, freshness, and the prestige of the world's most famous champagne house.",
        description:
          "Beautiful salmon-pink with aromas of wild strawberry, raspberry, and rose petals. Medium-bodied with creamy mousse, vibrant acidity, and fresh red fruit flavors.",
        tags: ["Champagne", "Rosé"],
        image:
          "https://images.unsplash.com/photo-1551339367-c86c2ef202d7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: [
          "https://images.unsplash.com/photo-1551339367-c86c2ef202d7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&q=80",
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
        ],
        rating: 4.6,
        reviewCount: 61,
        ingredients: ["Pinot Noir", "Chardonnay", "Pinot Meunier"],
        preparationNotes:
          "Serve well-chilled at 6–8°C in flutes to showcase the bubbles.",
        allergies: ["Sulphites"],
        pairings: [
          "tuna-tartare",
          "duck-breast-a-lorange",
          "chocolate-lava-cake",
        ],
      },
      {
        id: "screaming-eagle-cabernet",
        name: "Screaming Eagle Cabernet",
        price: 2800,
        excerpt:
          "Cult Napa Cabernet with rich blackberry, espresso, and velvet texture. One of California's most sought-after wines, representing the ultimate expression of Napa Valley Cabernet Sauvignon.",
        description:
          "The most iconic and sought-after wine from Napa Valley. Deep black-purple, extraordinarily intense with ripe blackberry, cassis, espresso, and dark chocolate. Full-bodied with impossibly smooth, velvety tannins.",
        tags: ["Red", "Collector"],
        image:
          "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
          "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80",
        ],
        rating: 5.0,
        reviewCount: 19,
        ingredients: [
          "Cabernet Sauvignon",
          "Merlot (trace)",
          "Cabernet Franc (trace)",
        ],
        preparationNotes:
          "Decant 1–2 hours before serving. Serve at 16–18°C. Extremely limited availability.",
        allergies: ["Sulphites"],
        pairings: ["wagyu-ribeye", "beef-wellington", "porterhouse"],
      },
    ],
  },
];

const shopData = [
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

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully to MongoDB");

  await MenuSection.deleteMany({});
  await MenuSection.insertMany(landingMenuData);
  console.log(`Seeded ${landingMenuData.length} menu sections`);

  await ShopCategory.deleteMany({});
  await ShopCategory.insertMany(shopData);
  console.log(`🌱 Seeded ${shopData.length} shop categories`);

  await NewsletterPostModel.deleteMany({});
  await NewsletterPostModel.insertMany(
    newsletterPosts.map((p) => ({ ...p, likes: [], comments: [] })),
  );
  console.log(`Seeded ${newsletterPosts.length} newsletter posts`);

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
