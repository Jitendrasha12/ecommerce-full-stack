import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/actions/cartSlice'; // Ensure you have this action

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;  
  const[shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };
  const subtotal = getCartSubTotal();
  // const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // console.log(subtotal,'this is our subtotal')

  // Dynamically load the Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up the script when component unmounts
    };
  }, []);

  const handleRazorpayPayment = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/order/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shippingAddress,
          paymentMethod,
          amount: subtotal, // Convert amount to paise
          currency: "INR",
        }),
      });

      const data = await response.json();
     

      if (!data || !data.id || !data.amount) {
        throw new Error('Failed to create order');
      }

      const options = {
        key: "rzp_test_DLIkLvFfZJ8upH",
        amount: data.amount,
        currency: 'INR',
        name: 'Jitendra Firm',
        description: 'Order Payment',
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyResponse = await fetch('http://localhost:5002/api/order/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: data.id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            console.log('Verification response:', verifyData);

            if (verifyData.success) {
              dispatch(clearCart());
              navigate('/order-success');
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (verifyError) {
            console.error('Verification failed:', verifyError);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: '', // Add prefilled details if needed
          email: '',
          contact: '',
        },
        theme: {
          color: '#528ff0',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      alert('Please select a valid payment method');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">Shipping Address</label>
          <input
            type="text"
            id="shippingAddress"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
            required
          >
            <option value="">Select Payment Method</option>
            <option value="razorpay">Razorpay</option>
            {/* Add more payment methods as needed */}
          </select>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutScreen;
