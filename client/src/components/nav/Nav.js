import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {Log} from "../../Pages/log/log";

export const Nav = () => {

    const user = useSelector(state => state.user)

    return(

        <nav>
            {user.isLogged &&
                <div className='link'>
                    <Link to='/upload'>Upload </Link>
                    <Link to='/playlist'>Playlist </Link>
                </div>
            }

            {!user.isLogged ? null:(
                <>
                    <div className='logout'>
                        <Link to='/logout'>Logout </Link>
                    </div>
                </>
            )}
        </nav>
    );
}