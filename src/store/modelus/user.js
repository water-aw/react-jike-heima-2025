import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";


const userStore = createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    token: localStorage.getItem('token_key') || '',
    userInfo: {}
  },
  // 同步修改方法
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
      // localstorage存一份
      localStorage.setItem('token_key', action.payload)
    }
  }
})

// 解构出actioncreater
const { setToken } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 1. 发送异步请求
    const res = await request.post('/authorizations', loginForm)
    // 2. 提交同步action进行token的存入
    dispatch(setToken(res.data.token))
  }
}

export { fetchLogin, setToken }

export default userReducer