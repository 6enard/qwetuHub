import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, doc, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, AlertTriangle, DollarSign, MessageCircle, Phone } from 'lucide-react';

interface Order {
  id: string;
  customerInfo: {
    name: string;
    phone: string;
    roomNumber: string;
    hostel: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  totalAmount: number;
  trackingStatus: string;
  createdAt: string;
  trackingUpdates: Array<{
    status: string;
    timestamp: string;
    message: string;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'today'>('today');
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const q = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderData: Order[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Order, 'id'>;
        const order = { id: doc.id, ...data };
        
        if (filter === 'today') {
          const orderDate = new Date(order.createdAt);
          if (orderDate >= today) {
            orderData.push(order);
          }
        } else {
          orderData.push(order);
        }
      });
      setOrders(orderData);
    });

    return () => unsubscribe();
  }, [isAdmin, navigate, filter]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        trackingStatus: newStatus,
        trackingUpdates: [{
          status: newStatus,
          timestamp: new Date().toISOString(),
          message: getStatusMessage(newStatus)
        }]
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
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

  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/254${phone.slice(-9)}`, '_blank');
  };

  const makePhoneCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('today')}
            className={`btn ${filter === 'today' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Today's Orders
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Orders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {filter === 'today' ? "Today's Orders" : 'All Orders'} ({orders.length})
              </h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                  <p className="text-gray-600">No orders found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedOrder === order.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedOrder(order.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <span className={`badge ${getStatusBadgeColor(order.trackingStatus)}`}>
                          {order.trackingStatus.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">{order.customerInfo.name}</p>
                        <div className="flex items-center gap-2">
                          <p>Room {order.customerInfo.roomNumber}, {order.customerInfo.hostel}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              makePhoneCall(order.customerInfo.phone);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Phone size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openWhatsApp(order.customerInfo.phone);
                            }}
                            className="text-green-600 hover:text-green-800"
                          >
                            <MessageCircle size={16} />
                          </button>
                        </div>
                        <p className="font-medium mt-1">KES {order.totalAmount}</p>
                      </div>

                      <div className="mt-2">
                        <p className="font-medium">Items:</p>
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm text-gray-600 flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span>KES {item.subtotal}</span>
                          </div>
                        ))}
                      </div>

                      {order.trackingUpdates && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="font-medium text-sm mb-1">Latest Update:</p>
                          <p className="text-sm text-gray-600">
                            {order.trackingUpdates[0]?.message}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Details & Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Actions</h2>
              
              {selectedOrder ? (
                <div className="space-y-4">
                  <button
                    onClick={() => updateOrderStatus(selectedOrder, 'preparing')}
                    className="btn w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <DollarSign size={18} />
                    Confirm Payment & Start Preparing
                  </button>
                  
                  <button
                    onClick={() => updateOrderStatus(selectedOrder, 'out_for_delivery')}
                    className="btn w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Truck size={18} />
                    Mark as Out for Delivery
                  </button>
                  
                  <button
                    onClick={() => updateOrderStatus(selectedOrder, 'delivered')}
                    className="btn w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <CheckCircle size={18} />
                    Mark as Delivered
                  </button>

                  {/* Contact Customer */}
                  {selectedOrder && orders.find(o => o.id === selectedOrder)?.customerInfo && (
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-3">Contact Customer</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const order = orders.find(o => o.id === selectedOrder);
                            if (order) makePhoneCall(order.customerInfo.phone);
                          }}
                          className="btn flex-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
                        >
                          <Phone size={18} className="mr-2" />
                          Call
                        </button>
                        <button
                          onClick={() => {
                            const order = orders.find(o => o.id === selectedOrder);
                            if (order) openWhatsApp(order.customerInfo.phone);
                          }}
                          className="btn flex-1 bg-green-100 text-green-700 hover:bg-green-200"
                        >
                          <MessageCircle size={18} className="mr-2" />
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center">
                  Select an order to update its status
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;