import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NotificationBanner: React.FC = () => {
  const { isAdmin } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [hasPermission, setHasPermission] = useState(
    'Notification' in window ? Notification.permission === 'granted' : false
  );

  if (!isAdmin || !isVisible || hasPermission) return null;

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setHasPermission(permission === 'granted');
      if (permission === 'granted') {
        setIsVisible(false);
      }
    }
  };

  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-blue-400 mr-3" />
          <div>
            <p className="text-sm text-blue-700">
              <strong>Enable notifications</strong> to get instant alerts when new orders are placed.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={requestPermission}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium"
          >
            Enable
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-blue-400 hover:text-blue-600"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;