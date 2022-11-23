import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import "./cart.css"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../main/store/redux/rootState"
import { IBankAccount, IBankAccountName, ICartProduct } from "../../main/store/stores/cart/cart.store"
import {
    deleteProductById,
    changeProductQuantity,
    setSelectedBankAccount} from "../../main/store/stores/cart/cart.store"
import { Button } from "react-bootstrap";
import Nav from '../../main/components/Nav/Nav';
import { Offcanvas, Stack } from "react-bootstrap";
import { formatCurrency } from '../../main/utils/formatCurrency';



export default function Cart() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [banks, setBanks] = useState([])
    const productsInTheCart: ICartProduct[] = useSelector((state: RootState) => state.cart.products);
    const totalValue: number = useSelector((state: RootState) => state.cart.totalValue);
    const selectedBankAccount: IBankAccount = useSelector((state: RootState) => state.cart.selectedBankAccount);
    async function getBankAccount() {
        const result = await axios.get(`/bankaccount/get-all`);
        console.log("test cart", result.data)
        dispatch(setSelectedBankAccount(result.data.resultData.data[0]))
        setBanks(result.data.resultData.data)
    }

    useEffect(() => {
        getBankAccount()
    }, [])


    function handleOnChangeSelect(e: any) {
        const newBankAccounts = [...banks]
        const bankAccountFinal = newBankAccounts.find(bankAccount => bankAccount.id === Number(e.target.value))
        dispatch(setSelectedBankAccount(bankAccountFinal))
    }

    return (

        <>
            <Nav />
            <div className="cart-wrapper">
                <div className="cart-container">
                    <Offcanvas.Header>
                        <Offcanvas.Title>Wishlist:</Offcanvas.Title>
                    </Offcanvas.Header>
                    {
                        productsInTheCart.map(productCart => {
                            console.log('productCart: ', productCart)
                            return <li key={productCart.product.id}>
                                <div className="cart-details">
                                    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">  </Stack>
                                    <img
                                        src={`${productCart.product.base64Image}`}
                                        alt={productCart.product.name}
                                        style={{ width: "125px", height: "75px", objectFit: "cover" }}
                                    />

                                    <div className="me-auto">
                                        <div>
                                            {productCart.product.name}{" "}
                                            {productCart.quantity > 1 && (
                                                <span className="text-muted" style={{ fontSize: ".65rem" }}>
                                                    x{productCart.quantity}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-muted" style={{ fontSize: ".75rem" }}> Price for 1:
                                            {formatCurrency(productCart.product.price)}
                                        </div>
                                    </div>
                                    <div>Total ammount: {formatCurrency(productCart.product.price * productCart.quantity)}</div>

                                    <Button
                                        variant="outline-danger"
                                        size="sm" onClick={function () {
                                            dispatch(deleteProductById(productCart.product.id))
                                        }}>
                                    </Button>

                                    <span>Quantity: </span>
                                    <input
                                        className="total-options"
                                        defaultValue={productCart.quantity}
                                        onChange={function (e) {
                                            dispatch(changeProductQuantity({ productId: productCart.product.id, quantity: Number(e.target.value) }))
                                        }}>

                                    </input>


                                    <Button className="clear-button"
                                        variant="outline-danger"
                                        size="sm" onClick={function () {
                                            dispatch(deleteProductById(productCart.product.id))
                                        }}> &times;
                                    </Button>

                                    <form id="form-cart">
                                        <label htmlFor="title-bank">
                                            <h3 className="title-bank">Bank Account: </h3>
                                        </label>
                                        <br></br>
                                    </form>

                                </div>

                            </li>

                        })

                    }
                        <select name="filter-bank"
                            onChange={function (e: any) {
                                handleOnChangeSelect(e)
                            }}>
                            <>
                                {
                                    (!banks || banks?.length === 0) ? (
                                        <option value="Default">No Bank Account </option>
                                    ) : (
                                        banks.map(bankAccount =>
                                            <option value={bankAccount.id}>{bankAccount.name}</option>
                                        )

                                    )
                                }
                            </>
                        </select>


                    <h3 className="title-bank">Total: {totalValue} $ </h3>
                    <div className="button-wrapper-cart">
                        <button className="button-payment" onClick={function () {
                            navigate(`/checkout`)
                        }}>
                            Pay now!
                        </button>
                    </div>
                </div>
            </div>

        </>

    )

}