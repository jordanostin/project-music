import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Login} from "../components/form/login";
import {Register} from "../components/form/register";
import {Logout} from "../components/logout/Logout";
import {Upload} from "../components/form/upload";
import {Home} from "../Pages/home/Home";
import {Header} from "../components/header/header";
import {Admin} from "../Pages/admin/admin";
import {DeleteUsers} from "../components/delete/deleteUser";

export const Navigation = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/upload' element={<Upload/>}/>
                <Route path='/admin' element={<Admin />}/>
                <Route path='/delete/user/:userId' element={<DeleteUsers/>}/>
            </Routes>
        </BrowserRouter>
    );
}