import tomatoes from '../assets/products/tomato.jpeg';
import onions from '../assets/products/onions.jpg';
import bellPepper from '../assets/products/hoho.jpeg';
import dania from '../assets/products/dania.jpg';
import ginger from '../assets/products/ginger.jpg';
import garlic from '../assets/products/garlic.jpg';
import samosa from '../assets/products/samosa.jpg';
import smokie from '../assets/products/smokie.jpg';
import egg from '../assets/products/egg.jpg';
import smocha from '../assets/products/smocha.jpeg';
import fries from '../assets/products/fries.jpg';
import crisps from '../assets/products/crisps.jpg';
import iceCream from '../assets/products/icecream.avif';
import noodles from '../assets/products/noodles.jpeg';
import water from '../assets/products/water.jpeg';
import minuteMaid from '../assets/products/minutemaid.jpg';
import freshJuice from '../assets/products/freshjuice.jpg';
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
    image: "https://sdmntpritalynorth.oaiusercontent.com/files/00000000-377c-6246-bbe4-9fcb0a7c3ed1/raw?se=2025-06-07T21%3A35%3A05Z&sp=r&sv=2024-08-04&sr=b&scid=32f2ee6b-abc0-5a84-9174-73744909ccf1&skoid=82a3371f-2f6c-4f81-8a78-2701b362559b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-07T20%3A09%3A07Z&ske=2025-06-08T20%3A09%3A07Z&sks=b&skv=2024-08-04&sig=7wO%2BXesCqVu434XJEID6OD4uVjwfJ6dxf4hfZMGNyII%3D",
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
    image: "https://sdmntpritalynorth.oaiusercontent.com/files/00000000-bb70-6246-8946-fd3b12a78714/raw?se=2025-06-07T21%3A41%3A57Z&sp=r&sv=2024-08-04&sr=b&scid=f8e83abd-965c-5f17-9779-62df0da7595c&skoid=82a3371f-2f6c-4f81-8a78-2701b362559b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-07T06%3A44%3A08Z&ske=2025-06-08T06%3A44%3A08Z&sks=b&skv=2024-08-04&sig=OZCnqYwUoyobg6A13WDR5yxvqLtCPw2HwJYuAkcrI7M%3D",
    category: 'beverages',
    description: 'Freshly squeezed fruit juice.',
    stock: 30,
    featured: true,
  },

  // Toiletries
  {
    id: 'tissues',
    name: 'Tissues',
    price: 150,
    image: "https://onestopwholesalers.co.ke/wp-content/uploads/2024/06/hnn3.png",
    category: 'toiletries',
    description: 'Soft facial tissues.',
    stock: 100,
  },
  {
    id: 'serviettes',
    name: 'Serviettes',
    price: 150,
    image: serviettes,
    category: 'toiletries',
    description: 'Quality paper serviettes.',
    stock: 100,
  },
  {
    id: 'bar-soap',
    name: 'Bar Soap',
    price: 200,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ54qZTY2hTZ9E05Dg7cghXOiBD3RHEGLLSCA&s",
    category: 'toiletries',
    description: 'Laundry bar soap.',
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
    name: 'Washing Powder',
    price: 150,
    image: washingPowder,
    category: 'cleaning',
    description: 'Effective laundry detergent powder.',
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
    name: 'Bleach',
    price: 150,
    image: bleach,
    category: 'cleaning',
    description: 'Strong bleach for deep cleaning.',
    stock: 30,
  },
  {
    id: 'fabric-softener',
    name: 'Fabric Softener',
    price: 250,
    image: fabricSoftener,
    category: 'cleaning',
    description: 'Pleasant-smelling fabric softener.',
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