import { FC, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import onLogin from "../../main/store/stores/user/login.store.on-login"
import { Button } from 'react-bootstrap';
import './login.css';
import React from "react";




const Login: FC = () => {

  const [userName, setUserName] = useState(null)
  const [password, setPassword] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(onLogin({ userName, password }));
  }


  const handleButtonClick = () => {
    navigate("/dashboard", { replace: true });
  }

  const OnClick = () => {
    navigate("/register", { replace: true });
  }

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3>Login in Shop</h3>
          <form>

            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-grid">
              <Button type="submit" variant="primary" onClick={(e) => handleSubmit(e)}>
                Log in
              </Button>
            </div>
            <p className="notice-text text-right">
              Don't have an account yet? Register now!
            </p>
            <Button
            type="button"
            onClick={OnClick}
            className="login__registerButton" >
            Register here
            </Button>
          </form>
        </div> </div>
    </>
  )
}

export default Login