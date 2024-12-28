import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state,action) => {
        state.user = action.payload;
        // console.log("Printing in userSlice",action.payload)
    },
    deleteUserDetails: (state,action) => {
      state.user = null
    },
  },
})

export const { setUserDetails ,deleteUserDetails} = userSlice.actions
export default userSlice.reducer