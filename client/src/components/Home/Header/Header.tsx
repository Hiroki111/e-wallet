import { useHistory } from 'react-router-dom';

import './styles/Header.scss';

export const Header = () => {
  let history = useHistory();

  const handleClickLogout = () => {
    fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.status === 200) {
          history.push('/login');
        } else {
          const error = new Error('login failed');
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error logging out please try again');
      });
  };

  return (
    <div className="header">
      <div>
        <span>E-Wallet</span>
      </div>
      <div>
        <span className="logout" onClick={handleClickLogout}>
          log out
        </span>
      </div>
    </div>
  );
};
