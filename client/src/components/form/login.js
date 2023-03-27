import {useDispatch} from "react-redux";
import {addUser} from "../../store/slices/user/userSlice";
import {useNavigate} from "react-router-dom";
import './styles/login.scss'

export const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = new FormData(e.target);

        fetch('http://localhost:9200/auth/login', {
            method:'POST',
            body: JSON.stringify({
                email: user.get('email'),
                password: user.get('password')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {

            console.log(data)
            const name = data.user.name
            const email = data.user.email
            const password = data.user.password
            const isAdmin = data.user.isAdmin
            const jwt = data.jwt

            localStorage.setItem('token', data.token);

            dispatch(addUser({name,email,password,isAdmin,jwt}))

        })
        .catch((err) => console.log(err));

        navigate('/');
    }

    return(
            <form onSubmit={handleSubmit} className='box'>
                <div className='container'>

                    <div className='top'>
                        <h2>Login</h2>
                    </div>

                    <div className='input-field'>
                        <input type='text' id='email' name='email' placeholder='email' className='input'/>
                    </div>

                    <div className='input-field'>
                        <input type='password' id='password' name='password' placeholder='password' className='input'/>
                    </div>

                    <div className='input-field'>
                        <input type="Submit" defaultValue='Login' className='submit'/>
                    </div>

                </div>
            </form>
    );
}