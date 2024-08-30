import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useMemo} from 'react'
import {logout} from '../utils/localstorage'
import {setInitialState} from '../redux/actions/userSlice'

const Navbar = ({click}) => {
  const cart = useSelector(state => state.cart)
  const history = useNavigate()
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch()
  // console.log({user})

  const {cartItems} = cart

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
  }

  const _handleLogout = () => {
    // console.log('click')
    dispatch(setInitialState())
    logout()
    history.push('/')
  }

  return (
    <nav className="navbar bg-slate-600">
      <div className="navbar__logo">
        <h2>Shopy All</h2>
      </div>

      <ul className="navbar__links">
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            {!user.isLogin ? (
              <span>
                { }
                  <span className="relative inline-block px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-full">

                CART  0</span>
              </span>
            ) : (
              <span>
                { }
                <span className="relative inline-block px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-full">

                CART  {getCartCount()}</span>
              </span>
            )}
           
          </Link>
        </li>

        <li>
        <span className="relative inline-block px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-full">
        <Link to="/">Shop</Link>

          </span>
        </li>

        {!user.isLogin ? (
          <li>
            <Link to="/signin">Login</Link>
          </li>
        ) : (
          <li>
            <p onClick={_handleLogout}>Logout</p>
          </li>
        )}
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  )
}

export default Navbar
