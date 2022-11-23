import React from 'react';
import AppNavigate from './AppNavigate';
import PrivateRoute from './private-route';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/login'
import DashboardPage from '../pages/dashboard/dashboard';
import Register from '../pages/register/register';
import Myaccount from '../pages/myaccount/myaccount';
import Bank from '../pages/bank/bank';
import Checkout from '../pages/checkout/checkout';
import Cart from '../pages/cart/cart';

import { connect } from "react-redux";


const App = () => {
  return (
    <BrowserRouter>
      <AppNavigate />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateRoute isPageLogin>
              <Login />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/myaccount" element={<Myaccount />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};



export default App;
