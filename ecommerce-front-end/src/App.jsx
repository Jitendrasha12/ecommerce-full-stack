import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Components
import Navbar from './components/Navbar';
import SideDrawer from './components/SideDrawer';
import Backdrop from './components/Backdrop';

// Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import CheckoutScreen from './screens/CheckoutScreen';
import { useDispatch } from 'react-redux';
import { fetchCart } from './redux/actions/cartSlice';
import { setUserDetails } from './redux/actions/userSlice';

// Load your Stripe public key

function App() {
  const [sideToggle, setSideToggle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(setUserDetails());
  }, [dispatch]);

  return (
   
      <Router>
        <Navbar click={() => setSideToggle(true)} />
        <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
        <Backdrop show={sideToggle} click={() => setSideToggle(false)} />

        <main className="app">
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/product/:id" element={<ProductScreen />} />
            <Route exact path="/cart" element={<CartScreen />} />
            <Route exact path="/checkout" element={<CheckoutScreen />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/order-success" element={<HomeScreen />} />
          </Routes>
        </main>
      </Router>
  );
}

export default App;
