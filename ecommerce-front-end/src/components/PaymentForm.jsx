// PaymentForm.jsx
import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      // Handle paymentMethod object
      // Call backend to process the payment
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
