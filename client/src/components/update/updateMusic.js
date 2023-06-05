import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {addMusic} from "../../store/slices/music/musicSlice";
import './styles/update.scss'


export const UpdateMusic = () => {

    const {musicId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const handleSubmit = (e) => {

        e.preventDefault();

        const token = localStorage.getItem('token');

        const name = e.target.elements.name.value;
        const image = e.target.elements.image.files[0];

        const music = new FormData();
        music.append('name', name);
        music.append('image', image);

        fetch(`${process.env.REACT_APP_API_URL}/user/update/audio/${musicId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: music
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                const name = data.music.name
                const image = data.music.image

                dispatch(addMusic({name, image}))
                navigate(`/music/${musicId}`)
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
                console.log('error')
            })

    }

    return (
        <>
            <h2>Update music</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className='form-update'>
                <label htmlFor='name'>Name</label>
                <input type="text" id='name' name='name' className='input-name'/>

                <label htmlFor='image'>Image</label>
                <input type="file" id='image' name='image'/>

                <button type="submit">Update</button>
            </form>
        </>
    );
}