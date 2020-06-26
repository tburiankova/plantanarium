import { useState, useEffect } from 'react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { handleLogin } from '../utils/auth';

// components
import Loading from '../components/_App/Loading';

const INITIAL_USER = {
  name: '',
  email: '',
  password: '',
};

function Signup({ user }) {
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
      const url = `${baseUrl}/api/signup`;
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
      <h1>Create an account</h1>
      <form className="form-main" onSubmit={handleSubmit}>
        {Boolean(error) && (
          <div className="form-message-error">
            <p>{error}</p>
          </div>
        )}
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
        />
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
          Sign Up
        </button>
        <div className="form-message-bottom">
          <p>
            Already have an account?
            <Link href="/login">
              <a> Sign in!</a>
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Signup;
