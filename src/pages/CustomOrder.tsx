import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Send, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { doc, addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

const CustomOrder: React.FC = () => {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: '/custom-order' } });
      return;
    }

    if (!description.trim() || !quantity.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        type: 'custom',
        items: [{
          description,
          quantity: parseInt(quantity),
          status: 'pending_quote'
        }],
        customerInfo: {
          email: user.email
        },
        status: 'pending_quote',
        trackingStatus: 'awaiting_quote',
        trackingUpdates: [{
          status: 'awaiting_quote',
          timestamp: new Date().toISOString(),
          message: 'Custom order submitted, waiting for price quote'
        }],
        createdAt: new Date().toISOString()
      });

      // Share order details via WhatsApp
      const message = `
*New Custom Order Request*
Order #${orderRef.id}

*Item Details:*
Description: ${description}
Quantity: ${quantity}

*Customer:*
Email: ${user.email}

Please review and provide a quote.`;

      const whatsappUrl = `https://wa.me/254740087715?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      navigate(`/confirmation/${orderRef.id}`);
    } catch (error) {
      console.error('Error submitting custom order:', error);
      setError('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold">Custom Order Request</h1>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <h2 className="font-medium text-blue-800 mb-2">How it works:</h2>
            <ol className="list-decimal list-inside space-y-2 text-blue-700">
              <li>Describe the item(s) you need in detail</li>
              <li>Submit your request</li>
              <li>We'll review and respond with pricing via WhatsApp</li>
              <li>Once you approve, complete the payment</li>
              <li>Track your order through our system</li>
            </ol>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Item Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you need in detail (brand, size, specifications, etc.)"
                className="input min-h-[120px]"
                required
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity Needed
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="input"
                min="1"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Request
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomOrder;