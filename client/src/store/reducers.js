import {combineReducers} from "redux";
import userSlice from "./slices/user/userSlice";
import musicSlice from "./slices/music/musicSlice";
import commentSlice from "./slices/comment/commentSlice";
import playlistSlice from "./slices/playlist/playlistSlice";
import likeSlice from "./slices/like/likeSlice";

//import reducer from 'chemin/reducer'

const rootReducer = combineReducers({
    user: userSlice,
    music: musicSlice,
    comment: commentSlice,
    playlist: playlistSlice,
    like: likeSlice
})


export default rootReducer