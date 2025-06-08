import tomatoes from '../assets/products/tomato.jpeg';
import onions from '../assets/products/onions.jpg';
import bellPepper from '../assets/products/hoho.jpeg';
import dania from '../assets/products/dania.jpg';
import ginger from '../assets/products/ginger.jpg';
import garlic from '../assets/products/garlic.jpg';
import samosa from '../assets/products/samosa.jpg';
import smokie from '../assets/products/smokie.jpg';
import egg from '../assets/products/egg.jpg';
import smocha from '../assets/products/smocha.png';
import fries from '../assets/products/fries.jpg';
import crisps from '../assets/products/crisps.jpg';
import iceCream from '../assets/products/icecream.avif';
import noodles from '../assets/products/noodles.jpeg';
import water from '../assets/products/water.jpeg';
import minuteMaid from '../assets/products/minutemaid.jpg';
import freshJuice from '../assets/products/juice.png';
import tissues from '../assets/products/tissue.avif';
import serviettes from '../assets/products/serviettes.jpg';
import barSoap from '../assets/products/barsoap.jpg';
import toothpaste from '../assets/products/toothpaste.jpg';
import toothbrush from '../assets/products/toothbrush.jpg';
import cottonBuds from '../assets/products/cottonbuds.avif';
import vaseline from '../assets/products/vaseline.jpeg';
import ballpoint from '../assets/products/ballpoint.png';

import washingPowder from '../assets/products/washingpowder.avif';
import mop from '../assets/products/mop.jpeg';
import antiseptic from '../assets/products/antiseptic.jpeg';
import bleach from '../assets/products/bleach.jpeg';
import fabricSoftener from '../assets/products/cuddles.jpg';
import scrubSponge from '../assets/products/sponge.jpg';
import dishSoap from '../assets/products/dishsoap.jpeg';

import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: 'groceries', name: 'Groceries', icon: 'shopping-basket' },
  { id: 'fruits', name: 'Fruits', icon: 'apple' },
  { id: 'snacks', name: 'Snacks', icon: 'cookie' },
  { id: 'beverages', name: 'Beverages', icon: 'coffee' },
  { id: 'toiletries', name: 'Toiletries', icon: 'spray-can' },
  { id: 'stationery', name: 'Stationery', icon: 'pencil' },
  { id: 'cleaning', name: 'Cleaning', icon: 'spray-can' },
  { id: 'spices', name: 'Spices & Condiments', icon: 'chef-hat' },
];

export const products: Product[] = [
  // Groceries
  {
    id: 'tomatoes',
    name: 'Fresh Tomatoes',
    price: 10,
    image: tomatoes,
    category: 'groceries',
    description: 'Fresh, ripe tomatoes perfect for cooking or salads.',
    stock: 100,
  },
  {
    id: 'onions',
    name: 'Onions',
    price: 20,
    image: onions,
    category: 'groceries',
    description: 'Fresh onions to add flavor to your dishes.',
    stock: 100,
  },
  {
    id: 'bell-pepper',
    name: 'Bell Pepper',
    price: 20,
    image: bellPepper,
    category: 'groceries',
    description: 'Colorful bell peppers, perfect for stir-fries and salads.',
    stock: 50,
  },
  {
    id: 'dania',
    name: 'Fresh Dania (Coriander)',
    price: 20,
    image: dania,
    category: 'groceries',
    description: 'Fresh coriander leaves to garnish your dishes.',
    stock: 50,
  },
  {
    id: 'ginger',
    name: 'Fresh Ginger',
    price: 20,
    image: ginger,
    category: 'groceries',
    description: 'Fresh ginger root for cooking and tea.',
    stock: 50,
  },
  {
    id: 'garlic',
    name: 'Garlic',
    price: 30,
    image: garlic,
    category: 'groceries',
    description: 'Fresh garlic bulbs for cooking.',
    stock: 50,
  },
  {
    id: 'spinach',
    name: 'Fresh Spinach',
    price: 30,
    image: 'https://e-mart.co.ke/image/cache/catalog/Meat%20Depot/spinach-removebg-preview-800x800.png',
    category: 'groceries',
    description: 'Fresh spinach leaves, rich in iron and vitamins.',
    stock: 40,
  },
  {
    id: 'cabbage',
    name: 'Cabbage',
    price: 30,
    image: 'https://www.garden-products.co.uk/wp-content/uploads/2024/09/Cabbage-new.jpg',
    category: 'groceries',
    description: 'Fresh cabbage slices, perfect for salads and cooking.',
    stock: 30,
  },
  {
    id: 'sukuma-wiki',
    name: 'Sukuma Wiki',
    price: 20,
    image: 'https://zucchini.co.ke/cdn/shop/products/0000000004614-removebg-preview-removebg-preview_1.jpg?v=1669704118',
    category: 'groceries',
    description: 'Fresh sukuma wiki (collard greens), a Kenyan staple vegetable.',
    stock: 50,
  },
  {
    id: 'cooking-oil',
    name: 'Fresh Fry Cooking Oil 1L',
    price: 325,
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=500',
    category: 'groceries',
    description: 'Premium cooking oil for all your frying and cooking needs.',
    stock: 30,
    featured: true,
  },
  {
    id: 'sugar',
    name: 'Mumias Sugar 2kg',
    price: 360,
    image: 'https://images.pexels.com/photos/65882/spoon-white-sugar-sweetener-sugar-65882.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'groceries',
    description: 'Premium white sugar for cooking and beverages.',
    stock: 25,
  },
  {
    id: 'cling-film',
    name: 'Velvex Cling Film 30cm x 15m',
    price: 120,
    image: 'https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'groceries',
    description: 'Food-grade cling film for wrapping and preserving food.',
    stock: 40,
  },
  {
    id: 'aluminium-foil',
    name: 'Fay Aluminium Foil 30cm x 5m',
    price: 130,
    image: 'https://images.pexels.com/photos/4226139/pexels-photo-4226139.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'groceries',
    description: 'Heavy-duty aluminium foil for cooking and food storage.',
    stock: 35,
  },

  // Fruits
  {
    id: 'bananas',
    name: 'Bananas',
    price: 10,
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fruits',
    description: 'Fresh, ripe bananas perfect for snacking or smoothies.',
    stock: 100,
    featured: true,
  },
  {
    id: 'watermelon',
    name: 'Watermelon Slices',
    price: 20,
    image: 'https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fruits',
    description: 'Juicy watermelon slice, perfect for hot days.',
    stock: 50,
  },
  {
    id: 'avocado',
    name: 'Avocados',
    price: 50,
    image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fruits',
    description: 'Fresh, creamy avocados rich in healthy fats.',
    stock: 30,
    featured: true,
  },
  {
    id: 'pineapple',
    name: 'Pineapple Slices',
    price: 20,
    image: 'https://images.pexels.com/photos/947879/pexels-photo-947879.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fruits',
    description: 'Sweet and tangy pineapple slice.',
    stock: 40,
  },
  {
    id: 'lemon',
    name: 'Lemon',
    price: 20,
    image: 'https://images.pexels.com/photos/1414110/pexels-photo-1414110.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fruits',
    description: 'Fresh lemons for cooking, drinks, and garnishing.',
    stock: 60,
  },

  // Snacks
  {
    id: 'samosa',
    name: 'Samosa',
    price: 50,
    image: samosa,
    category: 'snacks',
    description: 'Crispy, beef samosas freshly made.',
    stock: 50,
    featured: true,
  },
  {
    id: 'smokie',
    name: 'Smokie',
    price: 40,
    image: smokie,
    category: 'snacks',
    description: 'Delicious smokie sausage.',
    stock: 50,
  },
  {
    id: 'egg',
    name: 'Boiled Egg',
    price: 30,
    image: egg,
    category: 'snacks',
    description: 'Fresh boiled eggs.',
    stock: 50,
  },
  {
    id: 'smocha',
    name: 'Smocha',
    price: 60,
    image: smocha,
    category: 'snacks',
    description: 'Smokie and chapati combo.',
    stock: 50,
  },
  {
    id: 'fries',
    name: 'Fresh Chips/Fries',
    price: 150,
    image: fries,
    category: 'snacks',
    description: 'Hot, crispy french fries.',
    stock: 50,
    featured: true,
  },
  {
    id: 'crisps',
    name: 'Potato Crisps',
    price: 70,
    image: crisps,
    category: 'snacks',
    description: 'Crunchy potato crisps.',
    stock: 100,
  },
  {
    id: 'ice-cream',
    name: 'Ice Cream',
    price: 100,
    image: iceCream,
    category: 'snacks',
    description: 'Creamy, delicious ice cream.',
    stock: 30,
  },
  {
    id: 'noodles',
    name: 'Indomie Instant Noodles',
    price: 50,
    image: noodles,
    category: 'snacks',
    description: 'Quick and easy instant noodles.',
    stock: 100,
    featured: true,
  },
  {
    id: 'pilau-beef',
    name: 'Pilau Beef',
    price: 320,
    image: 'https://discountskenya.com/wp-content/uploads/2023/08/beef-pilau.png',
    category: 'snacks',
    description: 'Delicious pilau rice with tender beef pieces.',
    stock: 20,
    featured: true,
  },
  {
    id: 'bhajia',
    name: 'Bhajia',
    price: 150,
    image: 'https://www.malindikenya.net/images/uploads/articoli/1988_m.jpg',
    category: 'snacks',
    description: 'Crispy, spiced potato fritters.',
    stock: 30,
  },
  {
    id: 'spaghetti',
    name: 'Santa Maria Spaghetti 400g',
    price: 165,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'snacks',
    description: 'Premium spaghetti pasta for delicious meals.',
    stock: 40,
  },

  // Beverages
  {
    id: 'water',
    name: 'Refillable Water (1L)',
    price: 100,
    image: water,
    category: 'beverages',
    description: 'Clean, refillable drinking water.',
    stock: 100,
    featured: true,
  },
  {
    id: 'minute-maid',
    name: 'Minute Maid',
    price: 100,
    image: minuteMaid,
    category: 'beverages',
    description: 'Refreshing Minute Maid juice.',
    stock: 50,
  },
  {
    id: 'fresh-juice',
    name: 'Fresh Juice',
    price: 100,
    image: freshJuice,
    category: 'beverages',
    description: 'Freshly squeezed fruit juice. (mango,passion,beetroot,pineapple,watermelon)',
    stock: 30,
    featured: true,
  },

  // Toiletries
  {
    id: 'tissues',
    name: 'Hanan 2 Pack Premium Tissues',
    price: 135,
    image: "https://onestopwholesalers.co.ke/wp-content/uploads/2024/06/hnn3.png",
    category: 'toiletries',
    description: 'Premium soft facial tissues, 2-pack.',
    stock: 100,
  },
  {
    id: 'serviettes',
    name: 'Velvex Serviettes 100pc',
    price: 150,
    image: serviettes,
    category: 'toiletries',
    description: 'Quality paper serviettes, 100 pieces.',
    stock: 100,
  },
  {
    id: 'bar-soap',
    name: 'Menengai Bar Soap',
    price: 230,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ54qZTY2hTZ9E05Dg7cghXOiBD3RHEGLLSCA&s",
    category: 'toiletries',
    description: 'Premium laundry bar soap.',
    stock: 50,
  },
  {
    id: 'toothpaste',
    name: 'Toothpaste',
    price: 100,
    image: toothpaste,
    category: 'toiletries',
    description: 'Fresh mint toothpaste.',
    stock: 50,
  },
  {
    id: 'toothbrush',
    name: 'Toothbrush',
    price: 150,
    image: toothbrush,
    category: 'toiletries',
    description: 'Quality toothbrush.',
    stock: 50,
  },
  {
    id: 'cotton-buds',
    name: 'Ear Cotton Buds',
    price: 150,
    image: cottonBuds,
    category: 'toiletries',
    description: 'Soft cotton ear buds.',
    stock: 100,
  },
  {
    id: 'vaseline',
    name: 'Vaseline',
    price: 50,
    image: "https://i.ebayimg.com/images/g/LNMAAOSwGvVmqzhd/s-l1600.webp",
    category: 'toiletries',
    description: 'Moisturizing Vaseline.',
    stock: 50,
  },
  {
    id: 'trash-bags',
    name: 'Drawstrings Trash Bags',
    price: 50,
    image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'toiletries',
    description: 'Convenient drawstring trash bags.',
    stock: 80,
  },

  // Stationery
  {
    id: 'ballpoint',
    name: 'Ballpoint Pen',
    price: 20,
    image: ballpoint,
    category: 'stationery',
    description: 'Smooth writing ballpoint pen.',
    stock: 100,
  },

  // Cleaning
  {
    id: 'washing-powder',
    name: 'Sunlight Washing Powder 2 in 1 500g',
    price: 200,
    image: washingPowder,
    category: 'cleaning',
    description: 'Effective 2-in-1 laundry detergent powder.',
    stock: 50,
  },
  {
    id: 'mop',
    name: 'Mop',
    price: 500,
    image: "https://cdn11.bigcommerce.com/s-lm3kf40fnq/images/stencil/1280x1280/products/1467/11584/la029081grneu7_3n__46354.1690985215.jpg?c=1",
    category: 'cleaning',
    description: 'Durable floor mop.',
    stock: 20,
  },
  {
    id: 'antiseptic',
    name: 'Antiseptic',
    price: 200,
    image: antiseptic,
    category: 'cleaning',
    description: 'Powerful antiseptic cleaner.',
    stock: 30,
  },
  {
    id: 'bleach',
    name: 'Safisha Bleach 500ml',
    price: 130,
    image: bleach,
    category: 'cleaning',
    description: 'Strong bleach for deep cleaning.',
    stock: 30,
  },
  {
    id: 'fabric-softener',
    name: 'Sta Soft Spring Fresh Fabric Softener 750ml',
    price: 375,
    image: fabricSoftener,
    category: 'cleaning',
    description: 'Spring fresh scented fabric softener.',
    stock: 40,
  },
  {
    id: 'scrub-sponge',
    name: 'Scrub Sponge',
    price: 100,
    image: scrubSponge,
    category: 'cleaning',
    description: 'Durable scrubbing sponge.',
    stock: 100,
  },
  {
    id: 'dish-soap',
    name: 'Dish Soap',
    price: 150,
    image: dishSoap,
    category: 'cleaning',
    description: 'Effective dish washing liquid.',
    stock: 50,
  },
  {
    id: 'omo-handwashing',
    name: 'Omo Handwashing Powder 500g',
    price: 220,
    image: 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'cleaning',
    description: 'Premium handwashing detergent powder.',
    stock: 40,
  },
  {
    id: 'omo-bleach',
    name: 'Omo Bleach 250ml',
    price: 150,
    image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'cleaning',
    description: 'Effective bleach for whitening and cleaning.',
    stock: 35,
  },

  // Spices & Condiments
  {
    id: 'tomato-sauce',
    name: 'Clovers Tomato Sauce 400g',
    price: 100,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'spices',
    description: 'Rich and flavorful tomato sauce for cooking.',
    stock: 60,
    featured: true,
  },
  {
    id: 'tomato-paste',
    name: 'Kenylon Tomato Paste 30g',
    price: 30,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'spices',
    description: 'Concentrated tomato paste for rich flavor.',
    stock: 80,
  },
  {
    id: 'royco-mchuzi',
    name: 'Royco Mchuzi Mix 200g',
    price: 185,
    image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'spices',
    description: 'Traditional Kenyan spice mix for stews.',
    stock: 45,
    featured: true,
  },
  {
    id: 'royco-spice',
    name: 'Royco Spice for Wet and Dry Fry 100g',
    price: 250,
    image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'spices',
    description: 'Versatile spice blend for frying and cooking.',
    stock: 40,
  },
  {
    id: 'black-pepper',
    name: 'Exo Flava Black Pepper 50g',
    price: 140,
    image: 'https://images.pexels.com/photos/161556/spices-paprika-rosemary-chili-161556.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'spices',
    description: 'Premium ground black pepper.',
    stock: 50,
  },
  {
    id: 'cinnamon',
    name: 'Exo Flava Cinnamon 50g',
    price: 120,
    image: 'https://images.pexels.com/photos/161556/spices-paprika-rosemary-chili-161556.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'spices',
    description: 'Aromatic ground cinnamon spice.',
    stock: 45,
  },
  {
    id: 'paprika',
    name: 'Exo Flava Paprika 50g',
    price: 115,
    image: 'https://images.pexels.com/photos/161556/spices-paprika-rosemary-chili-161556.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'spices',
    description: 'Sweet and smoky paprika powder.',
    stock: 50,
  },
  {
    id: 'turmeric',
    name: 'Exo Flava Turmeric 50g',
    price: 100,
    image: 'https://images.pexels.com/photos/161556/spices-paprika-rosemary-chili-161556.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'spices',
    description: 'Golden turmeric powder for cooking and health.',
    stock: 55,
  },
  {
    id: 'baking-soda',
    name: 'Clovers Baking Soda',
    price: 50,
    image: 'https://images.pexels.com/photos/6544373/pexels-photo-6544373.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'spices',
    description: 'Pure baking soda for baking and cleaning.',
    stock: 70,
  },
  {
    id: 'white-vinegar',
    name: 'Clovers White Vinegar 700ml',
    price: 100,
    image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'spices',
    description: 'Pure white vinegar for cooking and cleaning.',
    stock: 40,
  },
  {
    id: 'salt',
    name: 'Kensalt 1kg',
    price: 50,
    image: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'spices',
    description: 'Pure table salt for cooking and seasoning.',
    stock: 60,
    featured: true,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};