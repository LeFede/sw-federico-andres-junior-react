import { configureStore } from "@reduxjs/toolkit";

import shop from './shop'

const store = configureStore({
  reducer: {
    shop
  }
})

export default store