const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure nodemailer with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '6enard@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD // Set this in Firebase Functions environment variables
  }
});

exports.sendOrderNotification = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snap, context) => {
    const order = snap.data();
    const orderId = context.params.orderId;

    // Email to admin
    const adminMailOptions = {
      from: '6enard@gmail.com',
      to: '6enard@gmail.com',
      subject: `New Order #${orderId} - QWETUHub`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Customer:</strong> ${order.customerInfo.name}</p>
        <p><strong>Room:</strong> ${order.customerInfo.roomNumber}</p>
        <p><strong>Hostel:</strong> ${order.customerInfo.hostel}</p>
        <p><strong>Phone:</strong> ${order.customerInfo.phone}</p>
        <h3>Order Details:</h3>
        <ul>
          ${order.items.map(item => `
            <li>${item.name} x${item.quantity} - KES ${item.subtotal}</li>
          `).join('')}
        </ul>
        <p><strong>Total Amount:</strong> KES ${order.totalAmount}</p>
        <p><a href="https://qwetu-eda5a.web.app/admin">Click here to manage this order</a></p>
      `
    };

    // Email to customer
    const customerMailOptions = {
      from: '6enard@gmail.com',
      to: order.customerInfo.email,
      subject: `Order Confirmation #${orderId} - QWETUHub`,
      html: `
        <h2>Thank you for your order!</h2>
        <p>Your order has been received and is being processed.</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <h3>Order Details:</h3>
        <ul>
          ${order.items.map(item => `
            <li>${item.name} x${item.quantity} - KES ${item.subtotal}</li>
          `).join('')}
        </ul>
        <p><strong>Total Amount:</strong> KES ${order.totalAmount}</p>
        <p><strong>Delivery to:</strong><br>
        Room ${order.customerInfo.roomNumber}<br>
        ${order.customerInfo.hostel}</p>
        <p>Payment Instructions:</p>
        <ol>
          <li>Send KES ${order.totalAmount} to M-Pesa number: 0740087715</li>
          <li>Send the M-Pesa confirmation message to WhatsApp: 0740087715</li>
        </ol>
        <p>We'll notify you when your order is confirmed and out for delivery.</p>
      `
    };

    try {
      // Always send admin notification
      await transporter.sendMail(adminMailOptions);
      
      // Send customer email if available
      if (order.customerInfo.email) {
        await transporter.sendMail(customerMailOptions);
      }
      
      console.log('Order notification emails sent successfully');
    } catch (error) {
      console.error('Error sending notification emails:', error);
    }
  });

exports.sendOrderStatusUpdate = functions.firestore
  .document('orders/{orderId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const previousData = change.before.data();
    
    if (newData.trackingStatus !== previousData.trackingStatus && newData.customerInfo.email) {
      const statusMessages = {
        preparing: 'Your order is being prepared',
        out_for_delivery: 'Your order is out for delivery',
        delivered: 'Your order has been delivered'
      };

      const mailOptions = {
        from: '6enard@gmail.com',
        to: newData.customerInfo.email,
        subject: `Order Status Update #${context.params.orderId} - QWETUHub`,
        html: `
          <h2>Order Status Update</h2>
          <p>${statusMessages[newData.trackingStatus] || 'Your order status has been updated'}</p>
          <p><strong>Order ID:</strong> ${context.params.orderId}</p>
          <p><strong>New Status:</strong> ${newData.trackingStatus.replace(/_/g, ' ').toUpperCase()}</p>
          <p>If you have any questions, please contact us on WhatsApp: 0740087715</p>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log('Status update email sent successfully');
      } catch (error) {
        console.error('Error sending status update email:', error);
      }
    }
  });