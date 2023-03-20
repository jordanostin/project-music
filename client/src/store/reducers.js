import {combineReducers} from "redux";
import userSlice from "./slices/user/userSlice";
import musicSlice from "./slices/music/musicSlice";
import commentSlice from "./slices/comment/commentSlice";

//import reducer from 'chemin/reducer'

const rootReducer = combineReducers({
    user: userSlice,
    music: musicSlice,
    comment: commentSlice,
})


export default rootReducer