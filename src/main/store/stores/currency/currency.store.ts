import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICurAccount {
	id?: number
	code: string
	description: string
	exchangeRate: number
	dateCreated: string
	dateModified: null | string
}

export interface ICurrencyStore {
    selectedCurrency : ICurAccount| null
    currencyAccount: ICurAccount []
}

export interface ICurAccountName {
    name: number
}

const initValue : ICurrencyStore = { 
    selectedCurrency : null,
    currencyAccount: []
}

const currencyStore = createSlice({

    name: 'currency',
  
    initialState: initValue,
  
    reducers: {
      setselectedCurrency(state, action:PayloadAction<ICurAccount>) {
          state.selectedCurrency = action.payload
      }
  
    }
  
  });
  
  export default currencyStore;
  
  export const { 
    setselectedCurrency} = currencyStore.actions;