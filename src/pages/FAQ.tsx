import React from 'react';
import { ShoppingBag, CreditCard, Truck, Package, Bell, Search } from 'lucide-react';

const FAQ: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">How It Works</h1>

      {/* Order Process Steps */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="grid gap-8">
          {/* Step 1: Browse & Select */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingBag className="text-blue-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">1. Browse & Select Products</h3>
                <p className="text-gray-600 mb-4">
                  Navigate through our categories or use the search function to find what you need.
                  Add items to your cart and adjust quantities as needed.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="block mb-2">Pro Tips:</strong>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Use filters to narrow down products by category</li>
                    <li>Check product availability and stock status</li>
                    <li>Review product descriptions for detailed information</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Checkout */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CreditCard className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">2. Checkout & Payment</h3>
                <p className="text-gray-600 mb-4">
                  Proceed to checkout, provide your delivery details, and complete payment using M-Pesa.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="block mb-2">Payment Process:</strong>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    <li>Enter your delivery information accurately</li>
                    <li>Review your order summary</li>
                    <li>Send payment to M-Pesa number: 0740087715</li>
                    <li>Share M-Pesa confirmation message via WhatsApp</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Order Processing */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Package className="text-purple-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">3. Order Processing</h3>
                <p className="text-gray-600 mb-4">
                  Once payment is confirmed, we'll start preparing your order. You'll receive updates at every stage.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="block mb-2">Order Stages:</strong>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <Bell size={16} className="text-yellow-600" />
                      <span>Payment Confirmation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Package size={16} className="text-blue-600" />
                      <span>Order Preparation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Truck size={16} className="text-purple-600" />
                      <span>Out for Delivery</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Search size={16} className="text-green-600" />
                      <span>Delivery Confirmation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Delivery */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Truck className="text-orange-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">4. Delivery</h3>
                <p className="text-gray-600 mb-4">
                  We'll deliver your order directly to your hostel room. Track your delivery in real-time.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="block mb-2">Delivery Information:</strong>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Average delivery time: 30-45 minutes</li>
                    <li>Real-time tracking through your order confirmation page</li>
                    <li>Delivery notifications via email and WhatsApp</li>
                    <li>Direct delivery to your room</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">How do I track my order?</h3>
            <p className="text-gray-600">
              After placing your order, you'll receive an order confirmation with a tracking link.
              You can also find all your orders in the "My Orders" section when logged in.
              Each order status update will be sent to you via email and WhatsApp.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">What if I'm not in my room during delivery?</h3>
            <p className="text-gray-600">
              Our delivery person will call you when they arrive. If you're not available,
              you can arrange for a roommate to receive the delivery or reschedule for a more convenient time.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">How long does delivery take?</h3>
            <p className="text-gray-600">
              Typical delivery time is 30-45 minutes from payment confirmation.
              During peak hours or special circumstances, it might take slightly longer,
              but we'll keep you updated on any changes to the estimated delivery time.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">
              We currently accept Safaricom M-Pesa payments. After placing your order,
              send the payment to our M-Pesa number (0740087715) and share the confirmation
              message via WhatsApp for quick verification.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">What if something is missing from my order?</h3>
            <p className="text-gray-600">
              If anything is missing from your order, contact us immediately through WhatsApp
              (0740087715). We'll verify the issue and resolve it promptly by delivering the
              missing items or providing a refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;