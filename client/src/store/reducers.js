import {combineReducers} from "redux";
import {userSlice} from "./slices/user/userSlice";

//import reducer from 'chemin/reducer'

const rootReducer = combineReducers({
    user: userSlice,
})


export default rootReducer