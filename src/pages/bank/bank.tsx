import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './table.css';
import AddBank from '../bank/addbankaccount';
import Nav from '../../main/components/Nav/Nav'
import { ICurAccount } from '../../main/store/stores/currency/currency.store';
import { useSelector } from 'react-redux';
import { RootState } from '../../main/store/redux/rootState';

export function Bank() {
  const [data, setData] = useState([]);
  const selectedCurrency: ICurAccount = useSelector((state: RootState) => state.cart.selectedCurrency);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios.get('/bankaccount/get-all?PageSize=30').then((res) => {
      console.log(res);
      setData(res.data.resultData.data);
    });
  };

  return (
    <>
    <Nav />
      <tbody>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Currency</th>
          <th>Balance</th>
          <th>Client</th>
          <th>Action</th>
        </tr>
        {data.map((item, id) => (
          <tr key={id}>
            <td>{item.code}</td>
            <td>{item.name}</td>
            <td>{item.currencyId}</td>
            <td>{item.balance}</td>
            <td>{item.clientId}</td>
            <td>{item.isActive.toString()}</td>
          </tr>
        ))}
      </tbody>

      <AddBank />
    </>
  );
}


export default Bank;

