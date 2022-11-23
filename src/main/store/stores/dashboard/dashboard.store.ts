import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICategory from '../../../interfaces/ICategory';
import ICurrency from '../../../interfaces/ICurrency';
import IDashboard from "../../../interfaces/IDashboard"
import { TProduct } from '../../../interfaces/TProduct';

const initialState: IDashboard = {
  
  products: [],
  productItem: null,
  categories: [],
  currencies: [],
  categorySelected: ""
  
}

const dashboardStore = createSlice({

  name: 'dashboard',

  initialState,
  
  reducers: {

    setProducts(state, action: PayloadAction<[]>) {
      state.products = action.payload
    },

    invalidateProducts(state) {
      state.products = []
    },

    setProductItem(state, action: PayloadAction<TProduct>) {
      state.productItem = action.payload
    },

    invalidateProductItem(state) {
      state.productItem = null
    },

    setCategories(state, action: PayloadAction<ICategory[] | undefined>) {
      state.categories = action.payload
    },

    invalidateCategories(state) {
      //@ts-ignore
      state.categories = []
    },

    setCurrencies(state, action: PayloadAction<ICurrency[] | undefined>) {
      //@ts-ignore
      state.currencies = action.payload
    },

    invalidateCurrencies(state) {
      //@ts-ignore
      state.currencies = action.payload
    },

    setCategorySelected(state, action: PayloadAction<string>) {
      //@ts-ignore
      state.categorySelected = action.payload
    },

    invalidateCategorySelected(state) {
      //@ts-ignore
      state.currencies = action.payload
    }

  }
  
});

export default dashboardStore;

export const { 
  setProducts, 
  invalidateProducts, 
  setProductItem, 
  invalidateProductItem,
  setCategories,
  invalidateCategories,
  setCurrencies,
  invalidateCurrencies,
  setCategorySelected,
  invalidateCategorySelected
} = dashboardStore.actions;