import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, where, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

interface Order {
  id: string;
  customerInfo: {
    name: string;
    phone: string;
    roomNumber: string;
    hostel: string;
  };
  totalAmount: number;
  createdAt: string;
  trackingStatus: string;
}

export const useNotifications = () => {
  const { isAdmin } = useAuth();
  const [hasPermission, setHasPermission] = useState(false);
  const [lastOrderTime, setLastOrderTime] = useState<string | null>(null);

  // Request notification permission
  useEffect(() => {
    if (!isAdmin) return;

    const requestPermission = async () => {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        setHasPermission(permission === 'granted');
      }
    };

    requestPermission();
  }, [isAdmin]);

  // Listen for new orders
  useEffect(() => {
    if (!isAdmin || !hasPermission) return;

    // Set initial timestamp to avoid notifications for existing orders
    if (!lastOrderTime) {
      setLastOrderTime(new Date().toISOString());
      return;
    }

    const q = query(
      collection(db, 'orders'),
      where('createdAt', '>', lastOrderTime),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const order = { id: change.doc.id, ...change.doc.data() } as Order;
          showOrderNotification(order);
        }
      });
    });

    return () => unsubscribe();
  }, [isAdmin, hasPermission, lastOrderTime]);

  const showOrderNotification = (order: Order) => {
    if (!hasPermission) return;

    const notification = new Notification('New Order Received! 🛒', {
      body: `Order from ${order.customerInfo.name}\nRoom ${order.customerInfo.roomNumber}\nAmount: KES ${order.totalAmount}`,
      icon: '/qwetuhub.svg',
      badge: '/qwetuhub.svg',
      tag: `order-${order.id}`,
      requireInteraction: true,
      actions: [
        {
          action: 'view',
          title: 'View Order'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    });

    // Play notification sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    audio.play().catch(() => {
      // Ignore audio play errors (browser restrictions)
    });

    notification.onclick = () => {
      window.focus();
      window.location.href = `/admin/orders/${order.id}`;
      notification.close();
    };

    // Auto-close after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10000);
  };

  return { hasPermission };
};