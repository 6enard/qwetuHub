import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy, where, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Clock, Bell, Settings } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import NotificationBanner from '../components/NotificationBanner';
import DarkModeToggle from '../components/DarkModeToggle';

interface Order {
  id: string;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    roomNumber: string;
    hostel: string;
    additionalNotes?: string;
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

type TimeFilter = 'hour' | 'day' | 'week' | 'month' | 'all';
type StatusFilter = 'all' | 'awaiting_payment' | 'preparing' | 'out_for_delivery' | 'delivered';

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('day');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Initialize notifications
  const { hasPermission } = useNotifications();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }

    let startTime: Date;
    const now = new Date();

    switch (timeFilter) {
      case 'hour':
        startTime = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case 'day':
        startTime = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        startTime = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startTime = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        startTime = new Date(0);
    }

    let q = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'desc')
    );

    if (timeFilter !== 'all') {
      q = query(
        collection(db, 'orders'),
        where('createdAt', '>=', startTime.toISOString()),
        orderBy('createdAt', 'desc')
      );
    }
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderData: Order[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Order, 'id'>;
        const order = { id: doc.id, ...data };
        
        if (statusFilter === 'all' || order.trackingStatus === statusFilter) {
          orderData.push(order);
        }
      });
      setOrders(orderData);
    });

    return () => unsubscribe();
  }, [isAdmin, navigate, timeFilter, statusFilter]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'awaiting_payment':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <div className="flex items-center gap-2 mt-2">
              <Bell size={16} className={hasPermission ? 'text-green-500' : 'text-gray-400'} />
              <span className={`text-sm ${hasPermission ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                {hasPermission ? 'Notifications enabled' : 'Notifications disabled'}
              </span>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Settings size={16} className="text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
              <DarkModeToggle />
            </div>
          </div>
        </div>

        {/* Notification Banner */}
        <NotificationBanner />

        {/* Time Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setTimeFilter('hour')}
            className={`btn ${timeFilter === 'hour' 
              ? 'bg-blue-600 text-white dark:bg-blue-500' 
              : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            } border border-gray-300 dark:border-gray-600`}
          >
            <Clock size={16} className="mr-1" />
            Last Hour
          </button>
          <button
            onClick={() => setTimeFilter('day')}
            className={`btn ${timeFilter === 'day' 
              ? 'bg-blue-600 text-white dark:bg-blue-500' 
              : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            } border border-gray-300 dark:border-gray-600`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeFilter('week')}
            className={`btn ${timeFilter === 'week' 
              ? 'bg-blue-600 text-white dark:bg-blue-500' 
              : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            } border border-gray-300 dark:border-gray-600`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeFilter('month')}
            className={`btn ${timeFilter === 'month' 
              ? 'bg-blue-600 text-white dark:bg-blue-500' 
              : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            } border border-gray-300 dark:border-gray-600`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeFilter('all')}
            className={`btn ${timeFilter === 'all' 
              ? 'bg-blue-600 text-white dark:bg-blue-500' 
              : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            } border border-gray-300 dark:border-gray-600`}
          >
            All Time
          </button>
        </div>

        {/* Status Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`btn ${statusFilter === 'all' 
                ? 'bg-blue-600 text-white dark:bg-blue-500' 
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              } border border-gray-300 dark:border-gray-600`}
            >
              All States
            </button>
            <button
              onClick={() => setStatusFilter('awaiting_payment')}
              className={`btn ${statusFilter === 'awaiting_payment' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800'
              } border border-yellow-300 dark:border-yellow-600`}
            >
              Awaiting Payment
            </button>
            <button
              onClick={() => setStatusFilter('preparing')}
              className={`btn ${statusFilter === 'preparing' 
                ? 'bg-blue-500 text-white' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800'
              } border border-blue-300 dark:border-blue-600`}
            >
              Preparing
            </button>
            <button
              onClick={() => setStatusFilter('out_for_delivery')}
              className={`btn ${statusFilter === 'out_for_delivery' 
                ? 'bg-purple-500 text-white' 
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800'
              } border border-purple-300 dark:border-purple-600`}
            >
              Out for Delivery
            </button>
            <button
              onClick={() => setStatusFilter('delivered')}
              className={`btn ${statusFilter === 'delivered' 
                ? 'bg-green-500 text-white' 
                : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'
              } border border-green-300 dark:border-green-600`}
            >
              Delivered
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Orders ({orders.length})
            </h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No orders found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:hover:border-blue-400"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span className={`badge ${getStatusBadgeColor(order.trackingStatus)}`}>
                        {order.trackingStatus.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.customerInfo.name} • Room {order.customerInfo.roomNumber}
                      </p>
                      <p className="font-medium mt-1 text-gray-900 dark:text-white">
                        {order.items.length} items • KES {order.totalAmount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;