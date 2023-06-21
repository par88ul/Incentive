import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const CreateUser=createAsyncThunk('createuser',async(data,{rejectWithValue})=>{

const response=await fetch('http://localhost:8000/api/products' ,{
method: 'Post',
headers:{
    "content-Type":"application/json",
},
body: JSON.stringify(data)
})
try{
    const result= await Response.json()
    return result
}
catch(error){
return rejectWithValue(error)
}
})

export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
      users: [],
      loading: false,
      error: null,
    },
      extraReducers :{
        [CreateUser.pending]:(state)=>{
          state.loading=true
        },
        [CreateUser.fulfilled]:(state,action)=>{
          state.loading=false
          state.user.push(action.payload)
        },
        [CreateUser.rejected]:(state,action)=>{
          state.loading=false
          state.user=action.payload
        },
      }
    },
)

export default userDetail.reducer;