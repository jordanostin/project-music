import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {addUser} from "../../store/slices/user/userSlice";
import './styles/register.scss'
export const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = new FormData(e.target);

        fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({
                name: newUser.get('name'),
                email: newUser.get('email'),
                password: newUser.get('password')
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

            localStorage.setItem('jwt', data.token);

            dispatch(addUser({name,email,password,isAdmin,jwt}))

        })
        .catch((err) => console.log(err));

        navigate('/');

    }

    return(
        <>
            <form onSubmit={handleSubmit} className='box'>
                <div className='container'>

                    <div className='top'>
                        <h2>Register</h2>
                    </div>

                    <div className='input-field'>
                        <input type='text' id='name' name='name' placeholder='Name' className='input'/>
                    </div>

                    <div className='input-field'>
                        <input type='text' id='email' name='email' placeholder='Email' className='input'/>
                    </div>

                    <div className='input-field'>
                        <input type='password' id='password' name='password' placeholder='Password' className='input'/>
                    </div>

                    <div className='input-field'>
                        <input type="Submit" defaultValue='Register' className='submit'/>
                    </div>
                </div>
            </form>
        </>
    );
}