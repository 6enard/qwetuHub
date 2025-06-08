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
    name: 'Fresh Fri Cooking Oil 1L',
    price: 325,
    image: 'https://cdn.mafrservices.com/pim-content/KEN/media/product/41661/1722423603/41661_main.jpg',
    category: 'groceries',
    description: 'Premium cooking oil for all your frying and cooking needs.',
    stock: 30,
    featured: true,
  },
  {
    id: 'sugar',
    name: 'Mumias Sugar 2kg',
    price: 360,
    image: 'https://www.oaks.delivery/wp-content/uploads/Copy-of-Copy-of-Social-Media-Product-Ad-800-x-800-px-2025-01-30T140758.805.jpg',
    category: 'groceries',
    description: 'Premium white sugar for cooking and beverages.',
    stock: 25,
  },
  {
    id: 'cling-film',
    name: 'Velvex Cling Film 30cm x 15m',
    price: 120,
    image: 'https://cdn.mafrservices.com/sys-master-root/h62/h60/12456712831006/16751_Main.jpg',
    category: 'groceries',
    description: 'Food-grade cling film for wrapping and preserving food.',
    stock: 40,
  },
  {
    id: 'aluminium-foil',
    name: 'Fay Aluminium Foil 30cm x 5m',
    price: 130,
    image: 'https://cdn.mafrservices.com/sys-master-root/hcf/h38/17290142580766/19440_main.jpg?im=Resize=480',
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
    id: 'Bread',
    name: 'Bread',
    price: 70,
    image: "https://cdn.mafrservices.com/pim-content/KEN/media/product/4/1743067803/4_main.jpg",
    category: 'snacks',
    description: 'freshly baked bread.',
    stock: 50,
    featured: true,
  },
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
    image: 'https://greenspoon.co.ke/wp-content/uploads/2023/07/Greenspoon-Kenya-Santa-Maria-Premium-Spaghetti-400g-2.jpg',
    category: 'snacks',
    description: 'Premium spaghetti pasta for delicious meals.',
    stock: 40,
  },

  // Beverages
  {
    id: 'water 10l',
    name: 'Refillable Water (10L)',
    price: 50,
    image: water,
    category: 'beverages',
    description: 'Clean, refillable drinking water.',
    stock: 50,
    featured: true,
  },
   {
    id: 'water 20l',
    name: 'Refillable Water (20L)',
    price: 100,
    image: water,
    category: 'beverages',
    description: 'Clean, refillable drinking water.',
    stock: 50,
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
    image: "https://cdn.mafrservices.com/sys-master-root/ha8/h91/51574553444382/22155_main.jpg",
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
    image: 'https://i.ebayimg.com/images/g/IhAAAOSwqW1iRXON/s-l1200.jpg',
    category: 'toiletries',
    description: 'Convenient drawstring trash bags.',
    stock: 80,
    featured: true
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
    image: 'https://cdn.mafrservices.com/sys-master-root/h55/hf5/48857717014558/14165_main.jpg?im=Resize=1700',
    category: 'cleaning',
    description: 'Premium handwashing detergent powder.',
    stock: 40,
  },
  {
    id: 'omo-bleach',
    name: 'Omo Bleach 250ml',
    price: 150,
    image: 'https://cdn.mafrservices.com/sys-master-root/h1d/hfd/48857717407774/176034_main.jpg?im=Resize=200',
    category: 'cleaning',
    description: 'Effective bleach for whitening and cleaning.',
    stock: 35,
  },

  // Spices & Condiments
  {
    id: 'tomato-sauce',
    name: 'Clovers Tomato Sauce 400g',
    price: 100,
    image: 'https://cdn.mafrservices.com/sys-master-root/h2f/h59/12456642805790/37022_Main.jpg?im=Resize=480',
    category: 'spices',
    description: 'Rich and flavorful tomato sauce for cooking.',
    stock: 60,
    featured: true,
  },
  {
    id: 'tomato-paste',
    name: 'Kenylon Tomato Paste 30g',
    price: 30,
    image: 'https://cdn.mafrservices.com/pim-content/KEN/media/product/235949/1748242804/235949_main.jpg?im=Resize=480',
    category: 'spices',
    description: 'Concentrated tomato paste for rich flavor.',
    stock: 80,
  },
  {
    id: 'royco-mchuzi',
    name: 'Royco Mchuzi Mix 200g',
    price: 185,
    image: 'https://cdn.mafrservices.com/sys-master-root/h32/h49/49589941501982/13911_main.jpg',
    category: 'spices',
    description: 'Traditional Kenyan spice mix for stews.',
    stock: 45,
    featured: true,
  },
  {
    id: 'royco-spice',
    name: 'Royco Spice for Wet and Dry Fry 100g',
    price: 250,
    image: 'https://cdn.mafrservices.com/sys-master-root/h4d/hdb/51203854893086/210959_main.jpg',
    category: 'spices',
    description: 'Versatile spice blend for frying and cooking.',
    stock: 40,
  },
  {
    id: 'black-pepper',
    name: 'Exo Flava Black Pepper 50g',
    price: 140,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv-GANYbs-Iq6IkjFsjGu9jcgp92uqsesRMg&s',
    category: 'spices',
    description: 'Premium ground black pepper.',
    stock: 50,
  },
  {
    id: 'cinnamon',
    name: 'Exo Flava Cinnamon 50g',
    price: 120,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3YF5cGlfaEpmoFq4LLc_0c02H88u3Nxg-l9GKJIVfR9ZOYyvFp3_HfzJ6Kk9LV_0LE6k&usqp=CAU',
    category: 'spices',
    description: 'Aromatic ground cinnamon spice.',
    stock: 45,
  },
  {
    id: 'paprika',
    name: 'Exo Flava Paprika 50g',
    price: 115,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWR4d4GftWBrlBlmhwFadSOf1TMuLZGRxJEESzNmf74YFBJUyD2SQVHE2ftMvF45TLioE&usqp=CAU',
    category: 'spices',
    description: 'Sweet and smoky paprika powder.',
    stock: 50,
  },
  {
    id: 'turmeric',
    name: 'Exo Flava Turmeric 50g',
    price: 100,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFVUshPo8iv1xxeC4Yb97FNTkusks8LrXGdw&s',
    category: 'spices',
    description: 'Golden turmeric powder for cooking and health.',
    stock: 55,
  },
  {
    id: 'baking-soda',
    name: 'Clovers Baking Soda',
    price: 50,
    image: 'https://cdn.mafrservices.com/sys-master-root/h16/h3a/17160264187934/36976_main.jpg',
    category: 'spices',
    description: 'Pure baking soda for baking and cleaning.',
    stock: 70,
  },
  {
    id: 'white-vinegar',
    name: 'Clovers White Vinegar 700ml',
    price: 100,
    image: 'https://cdn.mafrservices.com/sys-master-root/hdb/hb7/17013708685342/37001_main.jpg?im=Resize=480',
    category: 'spices',
    description: 'Pure white vinegar for cooking and cleaning.',
    stock: 40,
  },
  {
    id: 'salt',
    name: 'Kensalt 1kg',
    price: 50,
    image: 'https://cdn.mafrservices.com/sys-master-root/h07/h4e/47511105667102/37492_main.jpg',
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