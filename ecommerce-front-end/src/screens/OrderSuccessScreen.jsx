import React from 'react';

const OrderSuccessScreen = () => {
  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
      <p className="text-lg mb-4">Thank you for your purchase. Your order will be processed soon.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Go to Home
      </button>
    </div>
  );
};

export default OrderSuccessScreen;
