import { createSlice, current } from "@reduxjs/toolkit";
import { getFromLocal, saveToLocal } from "./localStorage";

const initialState = {
  selectedCategory: 'all',
  selectedCurrency: getFromLocal('currency') ?? '$',
  preselectedProduct: {},
  cart: [

  ],
}

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToCart: (_state, {payload}) => {
      const {cart, preselectedProduct} = current(_state)
      
      const state = current(_state)
      const newState = {
        ...state,
        cart: [
          ...cart,
          preselectedProduct
        ]
      }

      //console.log(newState.cart)
      return newState
    },
    removeFromCart: (_state, {payload}) => {
      // console.log('Removing...')
      // console.log(current(_state.preselectedProduct))
      const { cart, preselectedProduct } = current(_state)
      const state = current(_state)

      const keys = Object.keys(preselectedProduct)
      const values = Object.values(preselectedProduct)

        
      const indexToRemove = cart.findIndex((cartItem) => {
        return keys.every((key, index) => {
          return cartItem[key] === values[index]
        })
      })

      if (indexToRemove < 0) {
        console.warn("Didn't find anything to remove...")
        return state
      }

      console.log('%cFound something to remove!', 'background: green; color: white;');
      
      const newCart = [...cart]
      newCart.splice(indexToRemove, 1)
      
      const newState = {
        ...state,
        cart: newCart
      }

      console.log(newCart)
      return newState

    },
    changeCategory: (state, {payload}) => ({...state, selectedCategory: payload}),
    changeCurrency: (state, {payload}) => {
      saveToLocal('currency', payload)
      return {...state, selectedCurrency: payload}
    },
    changePreselect: (_state, {payload}) => {
      //console.table(payload)
      const {productId, attribute, attributeValue} = payload
      const state = current(_state)
      //console.log(state)

      
      const newState = {
        ...state,
        preselectedProduct: {
            ...state.preselectedProduct,
            Id: productId,
            [attribute]: attributeValue
        }
      }

      // console.log(newState.preselectedProduct)
      return newState
    }
  }
})


export const {
  addToCart,
  removeFromCart,
  changeCategory,
  changeCurrency,
  changePreselect,
} = shopSlice.actions
export default shopSlice.reducer