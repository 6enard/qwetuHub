import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Clock, Home, Download, AlertCircle, Share2 } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

interface OrderData {
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
  totalAmount: number;
  customerInfo: {
    name: string;
    phone: string;
    roomNumber: string;
    hostel: string;
  };
  trackingStatus: string;
  trackingUpdates: Array<{
    status: string;
    timestamp: string;
    message: string;
  }>;
  createdAt: string;
  userId: string;
}

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const shareReceiptOnWhatsApp = () => {
    if (!orderData) return;

    const receipt = `
*QwetuHub Order Receipt*
Order #${orderId}
Date: ${new Date(orderData.createdAt).toLocaleDateString()}
Time: ${new Date(orderData.createdAt).toLocaleTimeString()}

*Customer Details:*
Name: ${orderData.customerInfo.name}
Room: ${orderData.customerInfo.roomNumber}
Hostel: ${orderData.customerInfo.hostel}

*Order Items:*
${orderData.items.map(item => `• ${item.name} x${item.quantity} = KES ${item.subtotal}`).join('\n')}


*Total Amount: KES ${orderData.totalAmount}*

*Payment Instructions:*
1. Send KES ${orderData.totalAmount} to M-Pesa number: 0740087715
2. Send this receipt via whatsapp and track your order

Thank you for shopping with QwetuHub!`;

    const url = `https://wa.me/254740087715?text=${encodeURIComponent(receipt)}`;
    window.open(url, '_blank');
  };

  const generateReceipt = () => {
    if (!orderData) return;

    const receipt = `
QwetuHub Receipt
-----------------
Order #${orderId}
Date: ${new Date(orderData.createdAt).toLocaleDateString()}
Time: ${new Date(orderData.createdAt).toLocaleTimeString()}

Customer Information:
Name: ${orderData.customerInfo.name}
Phone: ${orderData.customerInfo.phone}
Hostel: ${orderData.customerInfo.hostel}
Room: ${orderData.customerInfo.roomNumber}

Items:
${orderData.items.map(item => 
  `${item.name} x${item.quantity} @ KES ${item.price} = KES ${item.subtotal}`
).join('\n')}

Subtotal: KES ${orderData.totalAmount - 50}
Delivery Fee: KES 50
Total Amount: KES ${orderData.totalAmount}

Payment Instructions:
-------------------
1. Send KES ${orderData.totalAmount} to M-Pesa number: 0740087715
2. Send the receipt via WhatsApp
3. Your order will be processed once payment is confirmed

Order Status: ${orderData.trackingStatus.replace(/_/g, ' ').toUpperCase()}

Thank you for shopping with QwetuHub!`;

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `QwetuHub-Receipt-${orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { state: { from: `/confirmation/${orderId}` } });
      return;
    }

    if (!orderId || !user) return;

    const unsubscribe = onSnapshot(
      doc(db, 'orders', orderId),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data() as OrderData;
          if (data.userId === user.uid || user.email === '6enard@gmail.com') {
            setOrderData(data);
            setError(null);
          } else {
            setError('You do not have permission to view this order');
            setOrderData(null);
          }
        } else {
          setError('Order not found');
          setOrderData(null);
        }
      },
      (error) => {
        console.error('Error fetching order:', error);
        setError('Error loading order details');
        setOrderData(null);
      }
    );

    return () => unsubscribe();
  }, [orderId, user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8 flex items-center justify-center gap-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const getStepNumber = (status: string) => {
    const steps = ['awaiting_payment', 'preparing', 'out_for_delivery', 'delivered'];
    return steps.indexOf(status) + 1;
  };

  const currentStep = getStepNumber(orderData.trackingStatus);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base text-center">
            Your order <span className="font-semibold">#{orderId}</span> has been placed successfully.
          </p>

          {/* Payment Instructions */}
          <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="font-medium text-orange-800 mb-2">Complete Your Payment:</h3>
            <ol className="list-decimal list-inside space-y-2 text-orange-700">
              <li>Send <span className="font-bold">KES {orderData.totalAmount}</span> to M-Pesa number: <span className="font-bold">0740087715</span></li>
              <li>Send the receipt via WhatsApp</li>
              <li>Your order will be processed once payment is confirmed</li>
            </ol>
          </div>

          {/* Order Status */}
          <div className="mb-10">
            <div className="relative">
              <div className="h-1 bg-gray-200 absolute top-6 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-4/5"></div>

              <div
                className="h-1 bg-green-500 absolute top-6 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out"
                style={{ width: `${(currentStep - 1) * 33}%` }}
              ></div>

              <div className="flex justify-between relative px-2 sm:px-4">
                {[
                  { label: 'Payment', icon: <CheckCircle size={24} />, status: 'awaiting_payment' },
                  { label: 'Preparing', icon: <Package size={24} />, status: 'preparing' },
                  { label: 'On the Way', icon: <Clock size={24} />, status: 'out_for_delivery' },
                  { label: 'Delivered', icon: <Home size={24} />, status: 'delivered' }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-xs sm:text-sm w-1/4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-1 sm:mb-2 ${
                        getStepNumber(orderData.trackingStatus) >= i + 1
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tracking Updates */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-800 mb-3">Order Updates</h3>
            <div className="space-y-3">
              {orderData.trackingUpdates.map((update, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {new Date(update.timestamp).toLocaleString()}
                    </p>
                    <p className="text-sm font-medium">{update.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:justify-center gap-3">
            <button
              onClick={generateReceipt}
              className="btn btn-secondary flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download Receipt
            </button>
            <button
              onClick={shareReceiptOnWhatsApp}
              className="btn bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
            >
              <Share2 size={18} />
              Share Receipt on WhatsApp
            </button>
            <Link to="/" className="btn btn-primary text-center">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;