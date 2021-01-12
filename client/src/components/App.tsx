import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { Home } from 'components/Home';
import { LoginForm } from 'components/LoginForm';
import { withAuth } from 'utils/withAuth';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={withAuth(Home)} />
        <Route path="/login" component={LoginForm} />
      </Router>
    </div>
  );
};

export default App;
