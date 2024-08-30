import './HomeScreen.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Product from '../components/Product';

// Actions
import { getProducts as listProducts } from '../redux/actions/productSlice'; // Updated import
import { setUserDetails } from '../redux/actions/userSlice'; // Updated import

const HomeScreen = () => {
  const dispatch = useDispatch();
  
  // Use the correct state structure based on the slice name
  const { products, loading, error } = useSelector(state => state.product); // Updated state key

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setUserDetails());
  }, [dispatch]);

  return (
    <div className="p-4">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Latest Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading ? (
        <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
      ) : error ? (
        <h2 className="text-xl text-red-600 font-semibold">{error}</h2>
      ) : (
        products.map(product => (
          <Product
            key={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
            productId={product._id}
          />
        ))
        
        // products.map(product => (
        //   <div key={product._id} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
        //     <img
        //       src={product.imageUrl}
        //       alt={product.name}
        //       className="w-full h-60 object-cover rounded-t-xl mb-4"
        //     />
        //     <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
        //     <p className="text-gray-700 mb-2">{product.description}</p>
        //     <p className="text-lg font-bold text-gray-800">${product.price}</p>
        //   </div>
        // ))
      )}
    </div>
  </div>
  
  
  );
};

export default HomeScreen;
