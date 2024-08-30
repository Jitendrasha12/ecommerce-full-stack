import './ProductScreen.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

// Actions
import { getProductDetails } from '../redux/actions/productSlice';
import { addToCart } from '../redux/actions/cartSlice';

const ProductScreen = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [qty, setQty] = useState(1);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.product);
  // console.log(productDetails,'this is our product')
  const { loading, error, product } = productDetails;
   console.log(product,'this is our product20')

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id, product]);

  const addToCartHandler = () => {
    if (user.isLogin) {
      console.log(product._id,qty,'{+Product id and quantity')
      dispatch(addToCart({id:product._id, qty}));
      navigate('/cart'); // Use navigate for redirecting
    } else {
      alert('You need to first login.');
    }
  };

  return (
    <div className="flex">
    <div className="w-2/3 pr-8">
      <div className="mb-4">
        <img src={product.imageUrl} alt={product.name} className="w-full h-auto" />
      </div>
      <div>
        <p className="text-2xl font-semibold mb-2">{product.name}</p>
        <p className="text-lg mb-2">Price: <span className="font-bold">${product.price}</span></p>
        <p className="text-base mb-4">Description: {product.description}</p>
      </div>
    </div>
    
    <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-lg">
      <div className="mb-4">
        <p className="text-lg mb-2">Price: <span className="text-xl font-bold">${product.price}</span></p>
        <p className="text-lg mb-2">Status: 
          <span className={`font-semibold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </p>
        <p className="text-lg mb-4">
          Qty
          <select value={qty} onChange={(e) => setQty(e.target.value)} className="ml-2 border border-gray-300 rounded p-1">
            {[...Array(product.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </p>
        <p>
          <button type="button" onClick={addToCartHandler} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Add To Cart
          </button>
        </p>
      </div>
    </div>
  </div>
  
  );
};

export default ProductScreen;
