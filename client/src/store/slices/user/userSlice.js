import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        id: '',
        name: '',
        email:'',
        token:'',
        isAdmin: false,
    },
    reducers: {
        addUser: (state, action) => {
            return{
                ...state,
                id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token,
                isAdmin: action.payload.isAdmin,
                isLogged: true
            }
        }
    },
})

export const {addUser} = userSlice.actions

export default userSlice.reducer