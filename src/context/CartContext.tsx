import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, CartItem } from '../types';
import { useAuth } from './AuthContext';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartContextType extends CartState {
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  syncCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'hostelhub_cart';

const calculateTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  return items.reduce(
    (acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      totalPrice: acc.totalPrice + item.product.price * item.quantity,
    }),
    { totalItems: 0, totalPrice: 0 }
  );
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CartState>(() => {
    // Initialize from localStorage
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      const items = JSON.parse(savedCart);
      const { totalItems, totalPrice } = calculateTotals(items);
      return { items, totalItems, totalPrice };
    }
    return { items: [], totalItems: 0, totalPrice: 0 };
  });
  
  const { user } = useAuth();

  // Sync with Firestore when user logs in
  useEffect(() => {
    if (user) {
      syncCart();
    }
  }, [user]);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const syncCart = async () => {
    if (!user) return;

    try {
      const cartRef = doc(db, 'carts', user.uid);
      const cartDoc = await getDoc(cartRef);
      
      if (cartDoc.exists()) {
        // Merge Firestore cart with local cart
        const firestoreItems = cartDoc.data().items;
        const mergedItems = [...state.items];
        
        firestoreItems.forEach((firestoreItem: CartItem) => {
          const existingItemIndex = mergedItems.findIndex(
            item => item.product.id === firestoreItem.product.id
          );
          
          if (existingItemIndex >= 0) {
            mergedItems[existingItemIndex].quantity += firestoreItem.quantity;
          } else {
            mergedItems.push(firestoreItem);
          }
        });
        
        const { totalItems, totalPrice } = calculateTotals(mergedItems);
        setState({ items: mergedItems, totalItems, totalPrice });
        
        // Update Firestore with merged cart
        await setDoc(cartRef, { items: mergedItems });
      } else if (state.items.length > 0) {
        // If no Firestore cart exists but we have local items, save them
        await setDoc(cartRef, { items: state.items });
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  };

  const addItem = async (product: Product, quantity: number) => {
    const existingItemIndex = state.items.findIndex(
      (item) => item.product.id === product.id
    );

    let updatedItems: CartItem[];

    if (existingItemIndex >= 0) {
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity,
      };
    } else {
      updatedItems = [...state.items, { product, quantity }];
    }

    const { totalItems, totalPrice } = calculateTotals(updatedItems);
    setState({ items: updatedItems, totalItems, totalPrice });

    // If user is logged in, sync with Firestore
    if (user) {
      try {
        const cartRef = doc(db, 'carts', user.uid);
        await setDoc(cartRef, { items: updatedItems }, { merge: true });
      } catch (error) {
        console.error('Error saving cart to Firestore:', error);
      }
    }
  };

  const removeItem = async (productId: string) => {
    const updatedItems = state.items.filter(
      (item) => item.product.id !== productId
    );
    
    const { totalItems, totalPrice } = calculateTotals(updatedItems);
    setState({ items: updatedItems, totalItems, totalPrice });

    if (user) {
      try {
        const cartRef = doc(db, 'carts', user.uid);
        await setDoc(cartRef, { items: updatedItems }, { merge: true });
      } catch (error) {
        console.error('Error updating cart in Firestore:', error);
      }
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(productId);
      return;
    }

    const updatedItems = state.items.map((item) =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );
    
    const { totalItems, totalPrice } = calculateTotals(updatedItems);
    setState({ items: updatedItems, totalItems, totalPrice });

    if (user) {
      try {
        const cartRef = doc(db, 'carts', user.uid);
        await setDoc(cartRef, { items: updatedItems }, { merge: true });
      } catch (error) {
        console.error('Error updating cart in Firestore:', error);
      }
    }
  };

  const clearCart = async () => {
    setState({ items: [], totalItems: 0, totalPrice: 0 });
    localStorage.removeItem(CART_STORAGE_KEY);

    if (user) {
      try {
        await deleteDoc(doc(db, 'carts', user.uid));
      } catch (error) {
        console.error('Error clearing cart in Firestore:', error);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        syncCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};