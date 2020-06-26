import { useState, useEffect } from 'react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { handleLogin } from '../utils/auth';

// components
import Navbar from '../components/_App/Navbar';
import Loading from '../components/_App/Loading';

const INITIAL_USER = {
  email: '',
  password: '',
};

function Login() {
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const url = `${baseUrl}/api/login`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container">
        <div className="container--inner">
          <Navbar />
          <h1>Log in to your account</h1>
          <form className="form-main" onSubmit={handleSubmit}>
            {Boolean(error) && (
              <div className="form-message-error">
                <p>{error}</p>
              </div>
            )}
            <label htmlFor="email">Your email address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
            />
            <label htmlFor="password">Your chosen password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />
            {loading && <Loading />}
            <button
              type="submit"
              className="btn-submit"
              disabled={disabled || loading}
            >
              Log In
            </button>
            <div className="form-message-bottom">
              <p>
                Don't have an account yet?
                <Link href="/signup">
                  <a> Sign up!</a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
