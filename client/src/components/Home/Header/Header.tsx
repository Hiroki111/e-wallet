import { useHistory } from 'react-router-dom';

import restApi from 'network/restApi';
import './styles/Header.scss';

export const Header = () => {
  let history = useHistory();

  const handleClickLogout = async () => {
    try {
      const res = await restApi.logout();
      if (res.status !== 200) {
        throw new Error('logout failed');
      }
      history.push('/login');
    } catch (error) {
      alert('Error logging out. Please try again later.');
    }
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
