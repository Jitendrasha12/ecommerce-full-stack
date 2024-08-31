import React, { useState } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1. Request order creation from your backend
      const { data: order } = await axios.post('http://localhost:5000/create-order', {
        amount: 500, // amount in the smallest currency unit (e.g., paise for INR)
        currency: 'INR',
      });

      // 2. Configure Razorpay options
      const options = {
        key: rzp_test_DLIkLvFfZJ8upH, // Enter the Key ID generated from the Razorpay Dashboard
        amount: order.amount,
        currency: order.currency,
        name: 'Your Company Name',
        description: 'Order Description',
        order_id: order.id,
        handler: async (response) => {
          // This function is called when payment is successful
          try {
            // Notify your backend about the successful payment
            await axios.post('http://localhost:5000/payment-success', {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
            });
            alert('Payment Successful');
          } catch (error) {
            console.error('Payment notification failed', error);
          }
        },
        prefill: {
          name: 'Your Name',
          email: 'your-email@example.com',
          contact: '1234567890',
        },
        theme: {
          color: '#3399cc',
        },
      };

      // 3. Initialize and open Razorpay payment modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment initiation failed', error);
      alert('Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default PaymentComponent;
