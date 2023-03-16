import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {addUser} from "../../store/slices/user/userSlice";
export const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = new FormData(e.target);

        fetch('http://localhost:9200/auth/register', {
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
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Pseudo</label>
                <input type='text' id='name' name='name'/>

                <label htmlFor='email'>Email</label>
                <input type='text' id='email' name='email'/>

                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password'/>

                <input type='submit' value='Submit'/>
            </form>
        </>
    );
}