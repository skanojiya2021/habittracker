import { configureStore } from '@reduxjs/toolkit'
import habitReducer from './habit-slice'
//can be multiple reducers
const store = configureStore({
  reducer: {
    habits: habitReducer
  }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch  = typeof store.dispatch;
export default store