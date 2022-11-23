import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IProduct from '../../../interfaces/IProduct'

const productStore = createSlice({
    name: 'products',
    initialState: null as IProduct,
    reducers: {
        setProduct(state, action: PayloadAction<IProduct>) {
            state = action.payload
        },
        increaseCartQuantity: (state) => {
            state.quantity += 1;
        },
        decreaseCartQuantity: (state) => {
            if (state.quantity > 0) {
                state.quantity -= 1;
            }
        }
    },
});

export default productStore;
export const { setProduct } = productStore.actions;