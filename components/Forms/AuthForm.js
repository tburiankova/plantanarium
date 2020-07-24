import React from 'react';
import Link from 'next/link';

import Loading from '../_App/Loading';

function AuthForm({
  handleSubmit,
  handleChange,
  error,
  user,
  loading,
  disabled,
  signUp,
}) {
  return (
    <form className="form-main" onSubmit={handleSubmit}>
      {Boolean(error) && (
        <div className="form-message-error">
          <p>{error}</p>
        </div>
      )}
      {signUp && (
        <>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
          />
        </>
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
        {signUp ? 'Sign Up' : 'Sign In'}
      </button>
      <div className="form-message-bottom">
        {signUp ? (
          <p>
            Already have an account?
            <Link href="/login">
              <a> Sign in!</a>
            </Link>
          </p>
        ) : (
          <p>
            Don't have an account yet?
            <Link href="/signup">
              <a> Sign up!</a>
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}

export default AuthForm;
