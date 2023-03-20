import {createSlice} from '@reduxjs/toolkit'

export const musicSlice = createSlice({
    name: 'musicSlice',
    initialState: {
        name: '',
        description:'',
        image:'',
        audio:'',
        comments:[]
    },
    reducers: {
        addMusic: (state, action) => {
            return{
                ...state,
                id: action.payload._id,
                userId: action.payload.userId,
                name: action.payload.name,
                description: action.payload.description,
                image: action.payload.image,
                audio: action.payload.audio,
                comments:[]
            }
        },
        addCommentToMusic: (state, action) => {
            const { itemId, name, comment } = action.payload;
            const music = state.find((music) => music.id === itemId);
            music.comments = music.comments.push({ name, comment });
        }
    },
})

export const {addMusic, addCommentToMusic} = musicSlice.actions

export default musicSlice.reducer