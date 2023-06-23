import { createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLogin:false,  
        myUser:null,
        
    },
    reducers:{
      setLogin(state,action){
        state.isLogin=action.payload;
      },
      setMyUser(state,action){
        state.myUser=action.payload;
      },
    },
});

export const {setLogin,setMyUser}=authSlice.actions;
export default authSlice.reducer;