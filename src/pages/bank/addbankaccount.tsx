import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './table.css';
import Nav from '../../main/components/Nav/Nav';
import { Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from '../../main/utils/formatCurrency';
import Currency from '../bank/currency';
import { ICurAccount, setselectedCurrency, ICurrencyStore, ICurAccountName } from "../../main/store/stores/currency/currency.store"
import { RootState } from '../../main/store/redux/rootState';



export function AddBank() {
  const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [balance, setBalance] = useState("")
    const [bankaccount, setBankaccount] = useState([]);
    const navigate = useNavigate();
    const selectedCurrency: ICurAccount = useSelector((state: RootState) => state.cart.selectedCurrency);


    const userId = useSelector((state:any) => state.user.id)  
    const handleSubmit = async (e: any) => {
      e.preventDefault()
      console.log({ code, name, balance, selectedCurrency })
      try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/bankaccount`, {
              code, name, balance, selectedCurrency
          })
          navigate(0);
      } catch (error: any) {
          console.log('err', error)
      }
  }

  const fetchTransaction = async () => {
      try {
          const response = await axios.get(`/bankaccount/get-all?clientId=${userId}`);
          setBankaccount(response.data.resultData.data);
          console.log('bank data: ', response.data.resultData.data);
      }
      catch (error) {
          console.log(error);
      }
  }


  return (
    <><>
    </><div className="bank-wrapper">
        <form className="form-wrapper">
          <h4>Fill the fields to add a Bank Account</h4>
          <div className="label-account">
            <label>
              Bank Code: </label>
            <input type="text" onChange={function (e: any) {
              setCode(e.target.value);
            } } />
          </div>
          <div className="label-account">
            <label>
              Bank Name:
            </label>
            <input type="text" onChange={function (e: any) {
              setName(e.target.value);
            } } />
          </div>
          <div className="label-account">
            <label>
            Currency:<Currency />
            </label>
          </div>
          <div className="label-account">

            <label>
              Balance:
            </label>

            <input type="text" onChange={function (e: any) {
              setBalance(e.target.value);
            } } />

            <div className="label-account">
              <Button type="submit" className="submit-bankaccount" variant="primary" onClick={(e) => handleSubmit(e)}>
                Add Bank Account
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddBank;

function dispatch(arg0: void) {
  throw new Error('Function not implemented.');
}