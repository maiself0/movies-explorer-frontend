import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const isAuth = localStorage.getItem('isAuth')
  return (
    <Route>
      {() =>
        isAuth === "true" ? <Component {...props} /> : <Redirect to='/' />
      }
    </Route>
  );
};

export default ProtectedRoute; 