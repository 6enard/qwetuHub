import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { user } = useAuth();
  const { items, totalAmount } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    roomNumber: '',
    hostel: 'Qwetu Ruaraka',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: user?.uid,
        customerEmail: formData.email,
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          subtotal: item.product.price * item.quantity
        })),
        customerInfo: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          roomNumber: formData.roomNumber,
          hostel: formData.hostel
        },
        status: 'pending_payment',
        trackingStatus: 'awaiting_payment',
        trackingUpdates: [{
          status: 'awaiting_payment',
          timestamp: new Date().toISOString(),
          message: 'Order placed, waiting for payment confirmation'
        }],
        totalAmount,
        createdAt: new Date().toISOString(),
        notificationEmail: '6enard@gmail.com'
      });
      
      return orderRef;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Room Number</label>
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="hostel" className="block text-sm font-medium text-gray-700">Hostel</label>
            <select
              id="hostel"
              name="hostel"
              value={formData.hostel}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="Qwetu Ruaraka">Qwetu Ruaraka</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;