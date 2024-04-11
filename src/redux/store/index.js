import { configureStore } from "@reduxjs/toolkit";
import motorReducers from "../reducers/motorReducers";
export default configureStore({
   reducer: {
       listMotor: motorReducers
   }
});