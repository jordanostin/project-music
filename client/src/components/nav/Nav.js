import { useSelector } from "react-redux";
import {Link} from "react-router-dom";

export const Nav = () => {

    const user = useSelector(state => state.user)

    return(

        <>
            <nav>
                {!user.isLogged ? (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </>
                ):(
                    <>
                        <Link to='/logout'>Logout</Link>
                        <Link to='/upload'>Upload</Link>
                        {user.isAdmin && (
                            <>
                                <Link to='/admin'>Admin</Link>
                            </>
                        )}
                    </>
                )}
            </nav>
        </>
    );
}