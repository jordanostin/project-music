import {Link} from "react-router-dom";
import './log.scss'

export const Log = () => {

    return(
        <div className='log'>
            <div className='container'>
                <div  className='link-field'>
                    <Link to='/login' className='link'>Login</Link>
                </div>
                <div  className='link-field'>
                    <Link to='/register' className='link'>Register </Link>
                </div>
            </div>
        </div>
    );
}