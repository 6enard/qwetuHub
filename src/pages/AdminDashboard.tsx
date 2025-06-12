import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy, where, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  Clock, 
  Bell, 
  TrendingUp, 
  Package, 
  DollarSign, 
  Users, 
  ShoppingCart,
  Calendar,
  Filter,
  Download,
  Search,
  Eye,
  MoreVertical,
  CheckCircle,
  XCircle,
  Truck,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import NotificationBanner from '../components/NotificationBanner';

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
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('day');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Initialize notifications
  const { hasPermission } = useNotifications();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }

    const q = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderData: Order[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Order, 'id'>;
        orderData.push({ id: doc.id, ...data });
      });
      setAllOrders(orderData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAdmin, navigate]);

  // Filter orders based on time, status, and search
  useEffect(() => {
    let filtered = [...allOrders];

    // Time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      let startTime: Date;

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

      filtered = filtered.filter(order => 
        new Date(order.createdAt) >= startTime
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.trackingStatus === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(query) ||
        order.customerInfo.name.toLowerCase().includes(query) ||
        order.customerInfo.phone.includes(query) ||
        order.customerInfo.roomNumber.toLowerCase().includes(query)
      );
    }

    setOrders(filtered);
  }, [allOrders, timeFilter, statusFilter, searchQuery]);

  const handleDeleteOrder = async (orderId: string) => {
    if (!orderId) return;

    setDeleting(orderId);
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      setDeleteConfirmation(null);
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  // Calculate statistics
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
    pendingOrders: orders.filter(order => order.trackingStatus === 'awaiting_payment').length,
    completedOrders: orders.filter(order => order.trackingStatus === 'delivered').length,
    averageOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0) / orders.length : 0
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'awaiting_payment':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'awaiting_payment':
        return <Clock size={14} />;
      case 'preparing':
        return <Package size={14} />;
      case 'out_for_delivery':
        return <Truck size={14} />;
      case 'delivered':
        return <CheckCircle size={14} />;
      default:
        return <XCircle size={14} />;
    }
  };

  const exportOrders = () => {
    const csvContent = [
      ['Order ID', 'Customer', 'Phone', 'Room', 'Items', 'Total', 'Status', 'Date'].join(','),
      ...orders.map(order => [
        order.id,
        order.customerInfo.name,
        order.customerInfo.phone,
        order.customerInfo.roomNumber,
        order.items.length,
        order.totalAmount || 0,
        order.trackingStatus,
        new Date(order.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center gap-2 mt-2">
              <Bell size={16} className={hasPermission ? 'text-green-500' : 'text-gray-400'} />
              <span className={`text-sm ${hasPermission ? 'text-green-600' : 'text-gray-500'}`}>
                {hasPermission ? 'Notifications enabled' : 'Notifications disabled'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={exportOrders}
              className="btn btn-secondary flex items-center gap-2"
            >
              <Download size={16} />
              Export
            </button>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        {/* Notification Banner */}
        <NotificationBanner />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingCart className="text-blue-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">KES {stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="text-green-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="text-yellow-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedOrders}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="text-green-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">KES {Math.round(stats.averageOrderValue)}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="text-purple-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders, customers, phone numbers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10 w-full"
                />
              </div>
            </div>

            {/* Time Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'hour', label: 'Last Hour', icon: Clock },
                { key: 'day', label: 'Today', icon: Calendar },
                { key: 'week', label: 'This Week', icon: Calendar },
                { key: 'month', label: 'This Month', icon: Calendar },
                { key: 'all', label: 'All Time', icon: Calendar }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setTimeFilter(key as TimeFilter)}
                  className={`btn flex items-center gap-2 ${
                    timeFilter === key ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            {[
              { key: 'all', label: 'All Orders', color: 'btn-secondary' },
              { key: 'awaiting_payment', label: 'Awaiting Payment', color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' },
              { key: 'preparing', label: 'Preparing', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200' },
              { key: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-purple-100 text-purple-800 hover:bg-purple-200' },
              { key: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800 hover:bg-green-200' }
            ].map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key as StatusFilter)}
                className={`btn ${
                  statusFilter === key 
                    ? key === 'all' ? 'btn-primary' : color.replace('hover:', 'bg-opacity-100 ')
                    : color
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                Orders ({orders.length})
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Filter size={16} />
                Filtered Results
              </div>
            </div>
          </div>
          
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items & Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr 
                      key={order.id} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            #{order.id.slice(-8)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.customerInfo.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Room {order.customerInfo.roomNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.customerInfo.phone}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          KES {(order.totalAmount || 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items.map(item => item.name).join(', ').slice(0, 30)}
                          {order.items.map(item => item.name).join(', ').length > 30 ? '...' : ''}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(order.trackingStatus)}`}>
                          {getStatusIcon(order.trackingStatus)}
                          {order.trackingStatus.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                        <div>{new Date(order.createdAt).toLocaleTimeString()}</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/orders/${order.id}`)}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                          >
                            <Eye size={16} />
                            View
                          </button>
                          <button
                            onClick={() => setDeleteConfirmation(order.id)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                            disabled={deleting === order.id}
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="text-red-600" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Order</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete order #{deleteConfirmation.slice(-8)}? This action cannot be undone.
              </p>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="btn btn-secondary"
                  disabled={deleting === deleteConfirmation}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteOrder(deleteConfirmation)}
                  className="btn bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                  disabled={deleting === deleteConfirmation}
                >
                  {deleting === deleteConfirmation ? (
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
    </div>
  );
};

export default AdminDashboard;