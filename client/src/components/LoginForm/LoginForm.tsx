import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles/LoginForm.scss';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted', email, password);
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.status === 200) {
          history.push('/');
        } else {
          const error = new Error('login failed');
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error logging in please try again');
      });
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h3>LOGIN</h3>
        <div className="field">
          <label htmlFor="email">email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            id="email"
            name="email"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            id="password"
            name="password"
            required
          />
        </div>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
