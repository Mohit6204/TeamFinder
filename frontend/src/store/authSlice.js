import { createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLogin:false,  
    },
    reducers:{
      setLogin(state,action){
        state.isLogin=action.payload;
      }
    }
});

export const {setLogin}=createSlice.actions;
export default authSlice.reducer;