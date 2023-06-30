import { createSlice} from "@reduxjs/toolkit";

const mainSlice = createSlice({
    name:'main',
    initialState:{
         open:false,
         heading:"",
    },
    reducers:{
      setOpen(state,action){
        state.open=action.payload;
      },
      setHeading(state,action){
        state.heading=action.payload;
      }
    },
});

export const {setOpen,setHeading}=mainSlice.actions;
export default mainSlice.reducer;