import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Components
import CartItem from '../components/CartItem';

// Actions
import { addToCart, removeFromCart } from '../redux/actions/cartSlice';
import useLogin from '../utils/hooks/useLogin';
import CheckoutScreen from './CheckoutScreen';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginInfo } = useLogin();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart({id, qty}));
  };

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart({ pId: item.product, _id: item._id }));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };
  const subtotal = getCartSubTotal();

  const handleProceedBtn = () => {
    navigate('/checkout'); // Redirect to CheckoutScreen
  };

  if (loginInfo.loading) return <h1 className="text-xl font-semibold text-gray-600">Loading.....</h1>;
  else if (!loginInfo.loading && loginInfo.isLogin) 
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <div className="text-center">
                Add items to your cart <Link to="/" className="text-blue-500 underline">Go Back</Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.product}
                  item={item}
                  // qtyChangeHandler={qtyChangeHandler}
                  removeHandler={() => removeFromCartHandler(item)}
                />
              ))
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <p className="text-lg font-semibold">Subtotal ({getCartCount()}) items</p>
              <p className="text-xl font-bold">${getCartSubTotal()}</p>
            </div>
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleProceedBtn}
              title={subtotal > 0 ? "Proceed to checkout" : "Add items to your cart"}
              disabled={subtotal <= 0}
              aria-disabled={subtotal <= 0}
            >
              Proceed To Checkout
            </button>


          </div>
        </div>
      </div>
    );
};

export default CartScreen;
