import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Api } from '../../utils/Api';
import { setToken } from '../../utils/localstorage';
import './signIn.css';

function Index() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const _handleSubmit = useCallback(async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (email.length > 2 && password.length > 2) {
      setLoading(true);
      const { statusCode, data } = await Api.postRequest('/api/user/signin', {
        email,
        password,
      });
      setLoading(false);
      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        alert(data);
        return;
      }
      const { token } = JSON.parse(data);
      setToken(token);
      navigate('/');
    }
  }, [email, password, navigate]);

  if (loading) return <h1>Loading.....</h1>;

  return (
    <div className="signinscreen">
      <div className="container">
        <div className="innerContainer">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              <i className="fas fa-arrow-circle-left fa-5x"></i>
            </div>
            <p>Sign In</p>
          </div>

          <form onSubmit={_handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password.."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link to="/signup" className="link">
              <span>Create a new account?</span>
            </Link>
            <br />

            <button type="submit">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Index;
