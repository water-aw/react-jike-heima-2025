import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modelus/user";

export default configureStore({
  reducer: {
    // 注册子模块
    user: userReducer
  },
});