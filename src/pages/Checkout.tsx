import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Update the form data state to include email
const [formData, setFormData] = useState({
  name: '',
  phone: '',
  email: '', // Add email field
  roomNumber: '',
  hostel: 'Qwetu Ruaraka',
});

// Update the order creation to include customer email
const orderRef = await addDoc(collection(db, 'orders'), {
  userId: user?.uid,
  customerEmail: formData.email, // Add customer email
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
    email: formData.email, // Add email to customer info
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

export default orderRef