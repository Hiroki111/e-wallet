import './styles/LoginForm.scss';

export const LoginForm = () => {
  return (
    <div className="login-form">
      <h3>LOGIN</h3>
      <div className="field">
        <label>email</label>
        <input />
      </div>
      <div className="field">
        <label>password</label>
        <input />
      </div>
      <button className="submit-btn" type="submit">
        Submit
      </button>
    </div>
  );
};
