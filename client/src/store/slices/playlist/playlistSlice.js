import {createSlice} from '@reduxjs/toolkit'

export const playlistSlice = createSlice({
    name: 'playlistSlice',
    initialState: {
        name: '',
        musics:[]
    },
    reducers: {
        addPlaylist: (state, action) => {
            return{
                ...state,
                id: action.payload._id,
                name: action.payload.name,
                musics:[]
            }
        }
    },
})

export const {addPlaylist} = playlistSlice.actions

export default playlistSlice.reducer