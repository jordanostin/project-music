import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {useState} from "react";

export const Nav = () => {

    const user = useSelector(state => state.user)

    const [burgerClass, setBurgerClass] = useState('burger-bar unclicked');
    const [menuClass, setMenuClass] = useState('menu hidden');
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    const updateMenu = () => {
        if(!isMenuClicked){
            setBurgerClass('burger-bar clicked');
            setMenuClass('menu visible')

        }else{
            setBurgerClass('burger-bar unclicked');
            setMenuClass('menu hidden')
        }
        setIsMenuClicked(!isMenuClicked)
    }

    return(

        <>
            {user.isLogged &&
                <nav>
                    <div className='burger-menu' onClick={updateMenu}>
                        <div className={burgerClass}></div>
                        <div className={burgerClass}></div>
                        <div className={burgerClass}></div>
                    </div>
                    <div className={menuClass}>
                        <div className='center'>
                            <Link to='/upload'>Upload </Link>
                            <Link to='/playlist'>Playlist </Link>
                        </div>

                        <div className='logout'>
                            <Link to='/logout'>Logout </Link>
                        </div>
                    </div>
                </nav>

            }
        </>
    );
}