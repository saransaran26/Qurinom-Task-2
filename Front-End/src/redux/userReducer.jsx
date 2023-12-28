import { createSlice } from '@reduxjs/toolkit'


const userReducer = createSlice({
    name:'user',
    initialState:{currentUser:""},
    reducers:{
        adduser:(state,action) =>{
            state.currentUser = action.payload
        },
        removeuser:(state)=>{
            state.currentUser = ""
        },
    }
})

export const {adduser,removeuser} = userReducer.actions

export default userReducer.reducer