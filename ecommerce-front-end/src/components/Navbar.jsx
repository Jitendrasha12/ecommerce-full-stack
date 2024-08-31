import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../utils/localstorage';
import { setInitialState } from '../redux/actions/userSlice';

const Navbar = ({ click }) => {
  const cart = useSelector(state => state.cart);
  const history = useNavigate();
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const _handleLogout = () => {
    dispatch(setInitialState());
    logout();
    history.push('/');
  };

  return (
    <nav className="navbar bg-slate-600">
      <div className="navbar__logo">
        <h2>Shopy All</h2>
      </div>

      <ul className="navbar__links">
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart__count-badge">{getCartCount()}</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="shop__link">
            <i className="fas fa-store"></i>
            <span>Shop</span>
          </Link>
        </li>
        {!user.isLogin ? (
          <li>
          <Link to="/signin" className="login__link">
            <i className="fas fa-sign-in-alt"></i>
            <span className="loginlogo__badge">Login</span>
          </Link>
        </li>
        ) : (
          <li>
          <p onClick={_handleLogout} className="logout__link">
            <i className="fas fa-sign-out-alt"></i>
            <span className="logoutlogo__badge">Logout</span>
          </p>
        </li>
        )}
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
