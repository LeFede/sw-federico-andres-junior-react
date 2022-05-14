import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: 'all',
  selectedCurrency: '$',
}

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    changeCategory: (state, {payload}) => ({...state, selectedCategory: payload}),
    changeCurrency: (state, {payload}) => ({...state, selectedCurrency: payload}),
  }
})


export const {changeCategory, changeCurrency} = shopSlice.actions
export default shopSlice.reducer