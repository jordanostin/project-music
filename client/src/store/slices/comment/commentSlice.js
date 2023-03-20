import {createSlice} from '@reduxjs/toolkit'

export const commentSlice = createSlice({
    name: 'commentSlice',
    initialState: {
        comment:[]
    },
    reducers: {
        addComment: (state, action) => {
            return{
                ...state,
                id: action.payload._id,
                itemId: action.payload.itemId,
                type: action.payload.type,
                userId: action.payload.userId,
                comment: action.payload.comment
            }
        }
    },
})

export const {addComment} = commentSlice.actions

export default commentSlice.reducer