export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  image: string;
  category: string;
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  allergens?: string[];
}

export const menuItems: Product[] = [
  {
    id: 1,
    name: "Classic Chocolate Chip Cookies",
    description: "Our signature cookies made with premium chocolate chips",
    longDescription: "Indulge in our signature chocolate chip cookies, crafted with premium Belgian chocolate chips and pure vanilla extract. Each cookie is carefully baked to achieve the perfect balance of crispy edges and a soft, chewy center.",
    price: 12.99,
    image: "/images/1KG CHOLATE CHIPS.jpg",
    category: "cookies",
    ingredients: ["Premium flour", "Belgian chocolate chips", "Brown sugar", "Farm-fresh eggs", "Pure vanilla extract"],
    nutritionalInfo: {
      calories: 150,
      protein: 2,
      carbs: 19,
      fat: 8
    },
    allergens: ["Wheat", "Eggs", "Milk"]
  },
  {
    id: 2,
    name: "Fudgy Brownies",
    description: "Rich, fudgy brownies with a perfect crackly top",
    longDescription: "Experience pure chocolate bliss with our fudgy brownies. Made with high-quality cocoa and real chocolate, these brownies feature our signature crackly top and dense, rich center.",
    price: 15.99,
    image: "/images/brownies.jpg",
    category: "brownies",
    ingredients: ["Dark chocolate", "Premium cocoa", "Fresh butter", "Farm-fresh eggs", "Pure vanilla extract"],
    nutritionalInfo: {
      calories: 180,
      protein: 3,
      carbs: 21,
      fat: 10
    },
    allergens: ["Wheat", "Eggs", "Milk"]
  },
  {
    id: 3,
    name: "Butter Cookie Collection",
    description: "Assorted butter cookies in various shapes",
    longDescription: "A delightful assortment of our classic butter cookies, featuring different shapes and textures. Each cookie is made with premium European butter for that perfect melt-in-your-mouth experience.",
    price: 14.99,
    image: "/images/butter.jpg",
    category: "cookies",
    ingredients: ["European butter", "Premium flour", "Pure vanilla", "Cane sugar"],
    nutritionalInfo: {
      calories: 140,
      protein: 1,
      carbs: 16,
      fat: 9
    },
    allergens: ["Wheat", "Milk"]
  },
  {
    id: 4,
    name: "Cinnamon Roll Cookies",
    description: "Swirled cookies with cinnamon sugar filling",
    longDescription: "Our unique take on classic cinnamon rolls in cookie form. These swirled treats feature a buttery cookie base with a generous cinnamon-sugar filling throughout.",
    price: 13.99,
    image: "/images/cinnamon.jpg",
    category: "cookies",
    ingredients: ["Premium flour", "Ceylon cinnamon", "Brown sugar", "European butter", "Pure vanilla extract"],
    nutritionalInfo: {
      calories: 160,
      protein: 2,
      carbs: 20,
      fat: 8
    },
    allergens: ["Wheat", "Milk"]
  },
  {
    id: 5,
    name: "Special Pack - 1kg Assortment",
    description: "A curated selection of our most popular treats",
    longDescription: "The perfect way to experience our best-selling treats. This 1kg assortment includes our classic chocolate chip cookies, butter cookies, and cinnamon roll cookies.",
    price: 24.99,
    image: "/images/1kg ch.jpg",
    category: "special-packs",
    ingredients: ["Various premium ingredients from our best-selling items"],
    nutritionalInfo: {
      calories: 150,
      protein: 2,
      carbs: 18,
      fat: 8
    },
    allergens: ["Wheat", "Eggs", "Milk"]
  }
]; 