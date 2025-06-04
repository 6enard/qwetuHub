import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: 'groceries', name: 'Groceries', icon: 'shopping-basket' },
  { id: 'snacks', name: 'Snacks', icon: 'cookie' },
  { id: 'beverages', name: 'Beverages', icon: 'coffee' },
  { id: 'toiletries', name: 'Toiletries', icon: 'spray-can' },
  { id: 'stationery', name: 'Stationery', icon: 'pencil' },
];

export const products: Product[] = [
  // Groceries
  {
    id: 'tomatoes',
    name: 'Fresh Tomatoes',
    price: 10,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
    category: 'groceries',
    description: 'Fresh, ripe tomatoes perfect for cooking or salads.',
    stock: 100,
  },
  {
    id: 'onions',
    name: 'Onions',
    price: 20,
    image: 'https://images.pexels.com/photos/4197447/pexels-photo-4197447.jpeg',
    category: 'groceries',
    description: 'Fresh onions to add flavor to your dishes.',
    stock: 100,
  },
  {
    id: 'bell-pepper',
    name: 'Bell Pepper',
    price: 20,
    image: 'https://images.pexels.com/photos/6316643/pexels-photo-6316643.jpeg',
    category: 'groceries',
    description: 'Colorful bell peppers, perfect for stir-fries and salads.',
    stock: 50,
  },
  {
    id: 'dania',
    name: 'Fresh Dania (Coriander)',
    price: 20,
    image: 'https://images.pexels.com/photos/2893635/pexels-photo-2893635.jpeg',
    category: 'groceries',
    description: 'Fresh coriander leaves to garnish your dishes.',
    stock: 50,
  },
  {
    id: 'ginger',
    name: 'Fresh Ginger',
    price: 20,
    image: 'https://images.pexels.com/photos/2615459/pexels-photo-2615459.jpeg',
    category: 'groceries',
    description: 'Fresh ginger root for cooking and tea.',
    stock: 50,
  },
  {
    id: 'garlic',
    name: 'Garlic',
    price: 30,
    image: 'https://images.pexels.com/photos/4198177/pexels-photo-4198177.jpeg',
    category: 'groceries',
    description: 'Fresh garlic bulbs for cooking.',
    stock: 50,
  },

  // Snacks
  {
    id: 'samosa',
    name: 'Hot Samosa',
    price: 50,
    image: 'https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg',
    category: 'snacks',
    description: 'Crispy, spicy samosas freshly made.',
    stock: 50,
    featured: true,
  },
  {
    id: 'smokie',
    name: 'Smokie',
    price: 40,
    image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg',
    category: 'snacks',
    description: 'Delicious smokie sausage.',
    stock: 50,
  },
  {
    id: 'egg',
    name: 'Boiled Egg',
    price: 30,
    image: 'https://images.pexels.com/photos/4110226/pexels-photo-4110226.jpeg',
    category: 'snacks',
    description: 'Fresh boiled eggs.',
    stock: 50,
  },
  {
    id: 'smocha',
    name: 'Smocha',
    price: 60,
    image: 'https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg',
    category: 'snacks',
    description: 'Smokie and chapati combo.',
    stock: 50,
  },
  {
    id: 'fries',
    name: 'Fresh Chips/Fries',
    price: 150,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg',
    category: 'snacks',
    description: 'Hot, crispy french fries.',
    stock: 50,
    featured: true,
  },
  {
    id: 'crisps',
    name: 'Potato Crisps',
    price: 70,
    image: 'https://images.pexels.com/photos/5718041/pexels-photo-5718041.jpeg',
    category: 'snacks',
    description: 'Crunchy potato crisps.',
    stock: 100,
  },
  {
    id: 'ice-cream',
    name: 'Ice Cream',
    price: 100,
    image: 'https://images.pexels.com/photos/1352281/pexels-photo-1352281.jpeg',
    category: 'snacks',
    description: 'Creamy, delicious ice cream.',
    stock: 30,
  },
  {
    id: 'chocolate',
    name: 'Chocolate Bar',
    price: 150,
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg',
    category: 'snacks',
    description: 'Rich chocolate bar.',
    stock: 50,
  },
  {
    id: 'noodles',
    name: 'Instant Noodles',
    price: 50,
    image: 'https://images.pexels.com/photos/12256804/pexels-photo-12256804.jpeg',
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
    image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg',
    category: 'beverages',
    description: 'Clean, refillable drinking water.',
    stock: 100,
    featured: true,
  },
  {
    id: 'minute-maid',
    name: 'Minute Maid',
    price: 100,
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
    category: 'beverages',
    description: 'Refreshing Minute Maid juice.',
    stock: 50,
  },
  {
    id: 'soda',
    name: 'Soda',
    price: 80,
    image: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg',
    category: 'beverages',
    description: 'Cold, refreshing soda.',
    stock: 100,
  },
  {
    id: 'fresh-juice',
    name: 'Fresh Juice',
    price: 100,
    image: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg',
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
    image: 'https://images.pexels.com/photos/4239012/pexels-photo-4239012.jpeg',
    category: 'toiletries',
    description: 'Soft facial tissues.',
    stock: 100,
  },
  {
    id: 'serviettes',
    name: 'Serviettes',
    price: 150,
    image: 'https://images.pexels.com/photos/4239028/pexels-photo-4239028.jpeg',
    category: 'toiletries',
    description: 'Quality paper serviettes.',
    stock: 100,
  },
  {
    id: 'bar-soap',
    name: 'Bar Soap',
    price: 200,
    image: 'https://images.pexels.com/photos/6621339/pexels-photo-6621339.jpeg',
    category: 'toiletries',
    description: 'Laundry bar soap.',
    stock: 50,
  },
  {
    id: 'bathing-soap',
    name: 'Bathing Soap',
    price: 200,
    image: 'https://images.pexels.com/photos/6621424/pexels-photo-6621424.jpeg',
    category: 'toiletries',
    description: 'Gentle bathing soap.',
    stock: 50,
  },
  {
    id: 'toothpaste',
    name: 'Toothpaste',
    price: 100,
    image: 'https://images.pexels.com/photos/6724354/pexels-photo-6724354.jpeg',
    category: 'toiletries',
    description: 'Fresh mint toothpaste.',
    stock: 50,
  },
  {
    id: 'toothbrush',
    name: 'Toothbrush',
    price: 150,
    image: 'https://images.pexels.com/photos/3101547/pexels-photo-3101547.jpeg',
    category: 'toiletries',
    description: 'Quality toothbrush.',
    stock: 50,
  },
  {
    id: 'cotton-buds',
    name: 'Ear Cotton Buds',
    price: 150,
    image: 'https://images.pexels.com/photos/4465829/pexels-photo-4465829.jpeg',
    category: 'toiletries',
    description: 'Soft cotton ear buds.',
    stock: 100,
  },
  {
    id: 'vaseline',
    name: 'Vaseline',
    price: 50,
    image: 'https://images.pexels.com/photos/6621264/pexels-photo-6621264.jpeg',
    category: 'toiletries',
    description: 'Moisturizing Vaseline.',
    stock: 50,
  },
  {
    id: 'deodorant',
    name: 'Deodorant',
    price: 200,
    image: 'https://images.pexels.com/photos/6621441/pexels-photo-6621441.jpeg',
    category: 'toiletries',
    description: 'Long-lasting deodorant.',
    stock: 30,
  },
  {
    id: 'lotion',
    name: 'Body Lotion',
    price: 200,
    image: 'https://images.pexels.com/photos/6621429/pexels-photo-6621429.jpeg',
    category: 'toiletries',
    description: 'Moisturizing body lotion.',
    stock: 30,
  },

  // Stationery
  {
    id: 'ballpoint',
    name: 'Ballpoint Pen',
    price: 20,
    image: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg',
    category: 'stationery',
    description: 'Smooth writing ballpoint pen.',
    stock: 100,
  },
  {
    id: 'pencil',
    name: 'Pencil',
    price: 20,
    image: 'https://images.pexels.com/photos/159752/pencil-office-design-creative-159752.jpeg',
    category: 'stationery',
    description: 'Standard HB pencil.',
    stock: 100,
  },
  {
    id: 'highlighter',
    name: 'Highlighter',
    price: 100,
    image: 'https://images.pexels.com/photos/1764436/pexels-photo-1764436.jpeg',
    category: 'stationery',
    description: 'Bright highlighter pen.',
    stock: 50,
  },
  {
    id: 'notebook',
    name: 'Notebook',
    price: 150,
    image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg',
    category: 'stationery',
    description: 'Quality notebook for notes.',
    stock: 50,
  },
  {
    id: 'sticky-notes',
    name: 'Sticky Notes',
    price: 150,
    image: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg',
    category: 'stationery',
    description: 'Colorful sticky notes.',
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