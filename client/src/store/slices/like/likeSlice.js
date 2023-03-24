import {createSlice} from '@reduxjs/toolkit'

export const likeSlice = createSlice({
    name: 'likeSlice',
    initialState: {
        isLiked: false
    },
    reducers: {
        toggleLike: (state, action) => {
            return{
                ...state,
                isLiked: action.payload
            }
        },
    },
})

export const {toggleLike} = likeSlice.actions

export default likeSlice.reducer