import tomatoes from '../assets/products/tomatoes.jpeg';
import onions from '../assets/products/onions.jpeg';
import bellPepper from '../assets/products/bell-pepper.jpeg';
import dania from '../assets/products/dania.jpeg';
import ginger from '../assets/products/ginger.jpeg';
import garlic from '../assets/products/garlic.jpeg';
import samosa from '../assets/products/samosa.jpeg';
import smokie from '../assets/products/smokie.jpeg';
import egg from '../assets/products/egg.jpeg';
import smocha from '../assets/products/smocha.jpeg';
import fries from '../assets/products/fries.jpeg';
import crisps from '../assets/products/crisps.jpeg';
import iceCream from '../assets/products/ice-cream.jpeg';
import chocolate from '../assets/products/chocolate.jpeg';
import noodles from '../assets/products/noodles.jpeg';
import water from '../assets/products/water.jpeg';
import minuteMaid from '../assets/products/minute-maid.jpeg';
import soda from '../assets/products/soda.jpeg';
import freshJuice from '../assets/products/fresh-juice.jpeg';
import tissues from '../assets/products/tissues.jpeg';
import serviettes from '../assets/products/serviettes.jpeg';
import barSoap from '../assets/products/bar-soap.jpeg';
import bathingSoap from '../assets/products/bathing-soap.jpeg';
import toothpaste from '../assets/products/toothpaste.jpeg';
import toothbrush from '../assets/products/toothbrush.jpeg';
import cottonBuds from '../assets/products/cotton-buds.jpeg';
import vaseline from '../assets/products/vaseline.jpeg';
import deodorant from '../assets/products/deodorant.jpeg';
import lotion from '../assets/products/lotion.jpeg';
import ballpoint from '../assets/products/ballpoint.jpeg';
import pencil from '../assets/products/pencil.jpeg';
import highlighter from '../assets/products/highlighter.jpeg';
import notebook from '../assets/products/notebook.jpeg';
import stickyNotes from '../assets/products/sticky-notes.jpeg';
import washingPowder from '../assets/products/washing-powder.jpeg';
import mop from '../assets/products/mop.jpeg';
import antiseptic from '../assets/products/antiseptic.jpeg';
import bleach from '../assets/products/bleach.jpeg';
import fabricSoftener from '../assets/products/fabric-softener.jpeg';
import scrubSponge from '../assets/products/scrub-sponge.jpeg';
import dishSoap from '../assets/products/dish-soap.jpeg';

import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: 'groceries', name: 'Groceries', icon: 'shopping-basket' },
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

  // Snacks
  {
    id: 'samosa',
    name: 'Hot Samosa',
    price: 50,
    image: samosa,
    category: 'snacks',
    description: 'Crispy, spicy samosas freshly made.',
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
    id: 'chocolate',
    name: 'Chocolate Bar',
    price: 150,
    image: chocolate,
    category: 'snacks',
    description: 'Rich chocolate bar.',
    stock: 50,
  },
  {
    id: 'noodles',
    name: 'Instant Noodles',
    price: 50,
    image: noodles,
    category: 'snacks',
    description: 'Quick and easy instant noodles.',
    stock: 100,
    featured: true,
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
    id: 'soda',
    name: 'Soda',
    price: 80,
    image: soda,
    category: 'beverages',
    description: 'Cold, refreshing soda.',
    stock: 100,
  },
  {
    id: 'fresh-juice',
    name: 'Fresh Juice',
    price: 100,
    image: freshJuice,
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
    image: tissues,
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
    image: barSoap,
    category: 'toiletries',
    description: 'Laundry bar soap.',
    stock: 50,
  },
  {
    id: 'bathing-soap',
    name: 'Bathing Soap',
    price: 200,
    image: bathingSoap,
    category: 'toiletries',
    description: 'Gentle bathing soap.',
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
    image: vaseline,
    category: 'toiletries',
    description: 'Moisturizing Vaseline.',
    stock: 50,
  },
  {
    id: 'deodorant',
    name: 'Deodorant',
    price: 200,
    image: deodorant,
    category: 'toiletries',
    description: 'Long-lasting deodorant.',
    stock: 30,
  },
  {
    id: 'lotion',
    name: 'Body Lotion',
    price: 200,
    image: lotion,
    category: 'toiletries',
    description: 'Moisturizing body lotion.',
    stock: 30,
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
  {
    id: 'pencil',
    name: 'Pencil',
    price: 20,
    image: pencil,
    category: 'stationery',
    description: 'Standard HB pencil.',
    stock: 100,
  },
  {
    id: 'highlighter',
    name: 'Highlighter',
    price: 100,
    image: highlighter,
    category: 'stationery',
    description: 'Bright highlighter pen.',
    stock: 50,
  },
  {
    id: 'notebook',
    name: 'Notebook',
    price: 150,
    image: notebook,
    category: 'stationery',
    description: 'Quality notebook for notes.',
    stock: 50,
  },
  {
    id: 'sticky-notes',
    name: 'Sticky Notes',
    price: 150,
    image: stickyNotes,
    category: 'stationery',
    description: 'Colorful sticky notes.',
    stock: 50,
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
    image: mop,
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