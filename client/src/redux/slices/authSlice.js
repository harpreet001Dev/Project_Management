import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user:JSON.parse(localStorage.getItem("userinfo")) || null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    
    reducers:{
        login: (state, action) => {
            const { id, role } = action.payload;  // Destructure id and role from payload
            state.user = { id, role };  // Store id and role in Redux state
            localStorage.setItem("userinfo", JSON.stringify({ id, role }));  // Store the same object in localStorage
          },
    }
});

export const {login} = authSlice.actions;
export default authSlice.reducer;