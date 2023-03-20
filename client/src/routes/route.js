import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Login} from "../components/form/login";
import {Register} from "../components/form/register";
import {Logout} from "../components/logout/Logout";
import {Upload} from "../components/form/upload";
import {Home} from "../Pages/home/Home";
import {Header} from "../components/header/header";
import {Admin} from "../Pages/admin/admin";
import {DeleteUsers} from "../components/delete/deleteUser";
import {DeleteMusic} from "../components/delete/deleteMusic";
import {Download} from "../components/download/download";
import {Comment} from "../components/form/comment";

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
                <Route path='/delete/music/:musicId' element={<DeleteMusic />}/>
                <Route path='/download/:musicId' element={<Download />}/>
                <Route path='/comment/:itemId' element={<Comment />}/>
            </Routes>
        </BrowserRouter>
    );
}