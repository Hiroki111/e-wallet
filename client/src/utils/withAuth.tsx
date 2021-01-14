/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';

import restApi from 'network/restApi';

// This HOC is made as an experimentation.
// It may be better to use a class component (instead of a functional one), because
// 1) TS class component returns React.ReactNode (with render), which can be both statefull and stateless components
// 2) TS function component returns JSX.Element | React.ReactElement | null, which can't be a statefull component
// This means that TS won't compile when this HOC tries to wrap statefull components.
// That said, I don't know if this is really an issue, because these days I don't use statefull components at all.
export const withAuth = (Component: () => JSX.Element) => ({ ...props }) => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const checkToken = useCallback(async () => {
    try {
      const res = await restApi.checkLoginStatus();
      if (res.status === 200) {
        setLoading(false);
      } else {
        throw new Error('login failed');
      }
    } catch (err) {
      console.error(err);
      setRedirect(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkToken();
  }, []);

  if (loading) {
    return null;
  } else if (redirect) {
    return <Redirect to="/login" />;
  }

  return <Component {...props} />;
};
