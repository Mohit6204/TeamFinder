import { createSlice} from "@reduxjs/toolkit";

const mainSlice = createSlice({
    name:'main',
    initialState:{
         apply:null,
    },
    reducers:{
      setApply(state,action){
        state.apply=action.payload;
      },
    },
});

export const {setApply}=mainSlice.actions;
export default mainSlice.reducer;