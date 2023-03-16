import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Login} from "../components/form/login";
import {Register} from "../components/form/register";
import {Logout} from "../components/logout/Logout";
import {Upload} from "../components/form/upload";
import {Nav} from "../components/nav/Nav";

export const Navigation = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Nav />}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/Upload' element={<Upload/>}/>
            </Routes>
        </BrowserRouter>
    );
}