import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, User, Home, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import emailjs from '@emailjs/browser';
import { calculateDeliveryFee } from '../utils/deliveryFee';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const deliveryFee = calculateDeliveryFee(totalPrice);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    roomNumber: '',
    hostel: 'Qwetu Ruaraka',
    additionalNotes: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  if (items.length === 0 || totalPrice < 100) {
    navigate('/cart');
    return null;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      if (formData.phone.length < 10) {
        throw new Error('Please enter a valid phone number');
      }

      const totalAmount = totalPrice + deliveryFee;

      // Create order in Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: user?.uid,
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
          email: user?.email || null,
          roomNumber: formData.roomNumber,
          hostel: formData.hostel,
          additionalNotes: formData.additionalNotes
        },
        status: 'pending_payment',
        trackingStatus: 'awaiting_payment',
        trackingUpdates: [{
          status: 'awaiting_payment',
          timestamp: new Date().toISOString(),
          message: 'Order placed, waiting for payment confirmation'
        }],
        totalAmount,
        deliveryFee,
        subtotal: totalPrice,
        createdAt: new Date().toISOString()
      });

      await clearCart();
      navigate(`/confirmation/${orderRef.id}`);
    } catch (error) {
      console.error('Error processing order:', error);
      setError(error instanceof Error ? error.message : 'Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const isFormValid = formData.name && formData.phone && formData.roomNumber;
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-6">Delivery Information</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="input pl-10"
                    required
                    disabled={isProcessing}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="07XX XXX XXX"
                    className="input pl-10"
                    required
                    disabled={isProcessing}
                    pattern="[0-9]*"
                    minLength={10}
                    maxLength={12}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hostel" className="block text-gray-700 font-medium mb-2">
                    Hostel Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="hostel"
                      name="hostel"
                      value={formData.hostel}
                      readOnly
                      className="input pl-10 bg-gray-50"
                      disabled={true}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="roomNumber" className="block text-gray-700 font-medium mb-2">
                    Room Number
                  </label>
                  <input
                    type="text"
                    id="roomNumber"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    placeholder="e.g. A123"
                    className="input"
                    required
                    disabled={isProcessing}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="additionalNotes" className="block text-gray-700 font-medium mb-2">
                  Additional Notes (Optional)
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <MessageSquare size={18} className="text-gray-400" />
                  </div>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    placeholder="Any special instructions or requests?"
                    className="input pl-10 min-h-[100px]"
                    disabled={isProcessing}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>KES {totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>KES {deliveryFee}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between font-bold">
                      <span>Total to Pay</span>
                      <span>KES {totalPrice + deliveryFee}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isProcessing}
                className={`btn w-full ${
                  isFormValid && !isProcessing 
                    ? 'btn-primary' 
                    : 'bg-gray-300 cursor-not-allowed text-gray-700'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Order...
                  </div>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;