import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import onLogout from '../../main/store/stores/user/login.store.on-logout';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import React from 'react';


const Logout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state: any) => state.user.username);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(onLogout());
    navigate('/login', { replace: true });
  };

  return (
    <>
      <Button onClick={(e) => handleSubmit(e)}> Logout </Button>
    </>
  );
};

export default Logout;