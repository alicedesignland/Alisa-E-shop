import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../main/store/redux/rootState"
import { ICurAccount, setselectedCurrency, ICurrencyStore, ICurAccountName } from "../../main/store/stores/currency/currency.store"
import { formatCurrency } from '../../main/utils/formatCurrency';
import React from "react"



export default function Currency() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [cur, setCur] = useState([])

    const selectedCurrency: ICurAccount = useSelector((state: RootState) => state.cart.selectedCurrency);
    async function getCurAccount() {
        const result = await axios.get(`/currency/get-all`);
        console.log("test cart", result.data)
        dispatch(setselectedCurrency(result.data.resultData.data[0]))
        setCur(result.data.resultData.data)
    }

    useEffect(() => {
        getCurAccount()
    }, [])


    function handleOnChangeSelect(e: any) {
        const newCurAccounts = [...cur]
        const curAccountFinal = newCurAccounts.find(curAccount => curAccount.id === Number(e.target.value))
        dispatch(setselectedCurrency(curAccountFinal))
    }

    return (
        <>
            
            <div>
                <select name="filter-currency"
                    onChange={function (e: any) {
                        handleOnChangeSelect(e)
                    }}>

                    <>
                        {
                            (!cur || cur?.length === 0) ? (
                                <option value="Default">No Currency </option>
                            ) : (
                                cur.map(curAccount =>
                                    <option value={curAccount.id}>{curAccount.id}</option>
                                )

                            )
                        }
                    </>
                </select>
            </div>

        </>

    )

}
