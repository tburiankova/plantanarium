import { useState, useEffect } from 'react';
import catchErrors from '../utils/catchErrors';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { handleLogin } from '../utils/auth';

// components
import AuthForm from '../components/Forms/AuthForm';

const INITIAL_USER = {
  name: '',
  email: '',
  password: '',
};

function Signup() {
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
      <AuthForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        error={error}
        user={user}
        loading={loading}
        disabled={disabled}
        signUp
      />
    </>
  );
}

export default Signup;
