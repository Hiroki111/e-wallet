import { useState } from 'react';

import './styles/LoginForm.scss';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted', email, password);
  };

  const renderField = (type: 'email' | 'password') => {
    let value = undefined;
    let handler = undefined;

    if (type === 'email') {
      value = email;
      handler = handleEmailChange;
    } else if (type === 'password') {
      value = password;
      handler = handlePasswordChange;
    }

    return (
      <div className="field">
        <label htmlFor={type}>{type}</label>
        <input type={type} value={value} onChange={handler} id={type} name={type} required />
      </div>
    );
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h3>LOGIN</h3>
        {renderField('email')}
        {renderField('password')}
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
