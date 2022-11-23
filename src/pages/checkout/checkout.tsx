import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "./checkout.css"
import useGetUser from "../../main/hooks/useGetUser"
import { RootState } from "../../main/store/redux/rootState"
import { IBankAccount, IBankAccountName } from "../../main/store/stores/cart/cart.store"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react"
import Nav from '../../main/components/Nav/Nav'


export default function Checkout() {

    const user = useGetUser()
    const navigate = useNavigate();
    const totalValue: number = useSelector((state: RootState) => state.cart.totalValue);
    const selectedBankAccount: IBankAccount = useSelector((state: RootState) => state.cart.selectedBankAccount);


    const handleFormSubmitPayment = async (e: any) => {
        try {
            e.preventDefault()
            const transactionData = {
                bankAccountId: selectedBankAccount?.id,
                action: 1,
                amount: totalValue,
                description: `Amount by ${user?.username}`,
                isActive: true
            }
            console.log('transactionData: ', transactionData);

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/banktransaction`, transactionData);
            console.log('resutl : ', response);

            if (response?.status === 200) {
                console.log("Successful")
                toast("Your order is on the way")
                navigate("/", { replace: true });

            } else {
                toast("You don't have enough money in your account")
                navigate("/cart", { replace: true });


            
            }
        } catch (error: any) {
            toast(error?.message || error)
        }
    }


    return (

        <>
            <Nav />
            <div className="container-payment">
                <form
                    className="form-payment"
                >
                    <div className="wrapper-payment">
                        <h2>Payment </h2>
                        <table>
                            <tr>
                                <th>First Name:</th>
                                <td>{user.firstName}</td>
                            </tr>
                            <tr>
                                <th>Last Name:</th>
                                <td>{user.lastName}</td>
                            </tr>
                            <tr>
                                <th>Telephone:</th>
                                <td>{user.phone}</td>
                            </tr>
                            <tr>
                                <th>E-mail:</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>Total payment:</th>
                                <td> {totalValue} € </td>
                            </tr>
                            <tr>
                                <th>Bank Account:</th>
                                <td>{selectedBankAccount?.name}</td>
                            </tr>
                        </table>
                        <button className="checkout-button" type="submit" value="Submit" onClick={(e) => handleFormSubmitPayment(e)}>
                            Order being proceed!
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </>
    )
}

