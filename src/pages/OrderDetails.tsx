import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Package, Truck, CheckCircle, AlertCircle, MessageCircle, Phone, Clock, User, Home, Mail, ArrowLeft, Trash2 } from 'lucide-react';

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
    email: string;
    roomNumber: string;
    hostel: string;
    additionalNotes?: string;
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

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!orderId || !user) return;

    const unsubscribe = onSnapshot(
      doc(db, 'orders', orderId),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data() as OrderData;
          if (data.userId === user.uid || isAdmin) {
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
  }, [orderId, user, isAdmin]);

  const updateOrderStatus = async (newStatus: string) => {
    if (!orderId || !orderData) return;

    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        trackingStatus: newStatus,
        trackingUpdates: [
          ...orderData.trackingUpdates,
          {
            status: newStatus,
            timestamp: new Date().toISOString(),
            message: getStatusMessage(newStatus)
          }
        ]
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status');
    }
  };

  const handleDeleteOrder = async () => {
    if (!orderId) return;

    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      navigate('/admin'); // Redirect to admin dashboard after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
      setError('Failed to delete order. Please try again.');
    } finally {
      setDeleting(false);
      setDeleteConfirmation(false);
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'Order is being prepared';
      case 'out_for_delivery':
        return 'Order is out for delivery';
      case 'delivered':
        return 'Order has been delivered successfully';
      default:
        return 'Order status updated';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'awaiting_payment':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const openWhatsApp = () => {
    if (!orderData) return;

    const message = `
*Order #${orderId}*
Date: ${new Date(orderData.createdAt).toLocaleDateString()}
Time: ${new Date(orderData.createdAt).toLocaleTimeString()}

*Customer Details:*
Name: ${orderData.customerInfo.name}
Phone: ${orderData.customerInfo.phone}
Email: ${orderData.customerInfo.email}
Room: ${orderData.customerInfo.roomNumber}
Hostel: ${orderData.customerInfo.hostel}
${orderData.customerInfo.additionalNotes ? `\nNotes: ${orderData.customerInfo.additionalNotes}` : ''}

*Order Items:*
${orderData.items.map(item => `• ${item.name} x${item.quantity} = KES ${item.subtotal}`).join('\n')}

Subtotal: KES ${orderData.totalAmount - 50}
Delivery Fee: KES 50
*Total Amount: KES ${orderData.totalAmount}*

Status: ${orderData.trackingStatus.replace(/_/g, ' ').toUpperCase()}`;

    window.open(`https://wa.me/254${orderData.customerInfo.phone.slice(-9)}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const makePhoneCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8 flex items-center justify-center gap-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Go Back
        </button>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Orders
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Order #{orderId}</h1>
                  <p className="text-gray-600">
                    Placed on {new Date(orderData.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`badge ${getStatusBadgeColor(orderData.trackingStatus)}`}>
                    {orderData.trackingStatus.replace(/_/g, ' ').toUpperCase()}
                  </span>
                  {isAdmin && (
                    <button
                      onClick={() => setDeleteConfirmation(true)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete Order"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Customer Information */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <span>{orderData.customerInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      <span>{orderData.customerInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-500" />
                      <span>{orderData.customerInfo.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Home size={16} className="text-gray-500" />
                      <span>Room {orderData.customerInfo.roomNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home size={16} className="text-gray-500" />
                      <span>{orderData.customerInfo.hostel}</span>
                    </div>
                  </div>
                </div>
                {orderData.customerInfo.additionalNotes && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{orderData.customerInfo.additionalNotes}</p>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Order Items</h2>
                <div className="divide-y">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="py-4 flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">KES {item.subtotal}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>KES {orderData.totalAmount - 50}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mt-2">
                    <span>Delivery Fee</span>
                    <span>KES 50</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                    <span>Total</span>
                    <span>KES {orderData.totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div>
                <h2 className="text-lg font-bold mb-4">Order Timeline</h2>
                <div className="space-y-4">
                  {orderData.trackingUpdates.map((update, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        {index !== orderData.trackingUpdates.length - 1 && (
                          <div className="absolute top-2 left-1 w-0.5 h-full -ml-px bg-blue-200"></div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          {new Date(update.timestamp).toLocaleString()}
                        </p>
                        <p className="font-medium">{update.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-lg font-bold mb-6">Order Actions</h2>
              
              {isAdmin && (
                <div className="space-y-4">
                  <button
                    onClick={() => updateOrderStatus('preparing')}
                    className="btn w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Package size={18} />
                    Confirm Payment & Start Preparing
                  </button>
                  
                  <button
                    onClick={() => updateOrderStatus('out_for_delivery')}
                    className="btn w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Truck size={18} />
                    Mark as Out for Delivery
                  </button>
                  
                  <button
                    onClick={() => updateOrderStatus('delivered')}
                    className="btn w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <CheckCircle size={18} />
                    Mark as Delivered
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => makePhoneCall(orderData.customerInfo.phone)}
                      className="btn flex-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                      <Phone size={18} className="mr-2" />
                      Call
                    </button>
                    <button
                      onClick={openWhatsApp}
                      className="btn flex-1 bg-green-100 text-green-700 hover:bg-green-200"
                    >
                      <MessageCircle size={18} className="mr-2" />
                      WhatsApp
                    </button>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setDeleteConfirmation(true)}
                      className="btn w-full bg-red-100 text-red-700 hover:bg-red-200 flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
                      Delete Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="text-red-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Order</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this order? This action cannot be undone and will permanently remove all order data.
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmation(false)}
                className="btn btn-secondary"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOrder}
                className="btn bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete Order
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;