import {Link} from "react-router-dom";
import {Nav} from "../nav/Nav";
import logo from "../../public/images/logo.png";
import {useSelector} from "react-redux";
import './header.scss'

export const Header = () => {

    const user = useSelector(state => state.user)

    return(
        <header>
            <div className='title-admin'>
                <Link to='/'><img src={logo} alt="" className='logo'/></Link>
                {user.isAdmin && (
                    <>
                        <Link to='/admin' className='admin'>Admin </Link>
                    </>
                )}
            </div>
            <Nav/>
        </header>
    )
}