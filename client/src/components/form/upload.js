import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addMusic} from "../../store/slices/music/musicSlice";


export const Upload = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user)

    let role;

    if (user.isAdmin) {
        role = 'admin'
    } else {
        role = 'user'
    }
    const handleSubmit = (e) => {

        e.preventDefault();

        const token = localStorage.getItem('token');

        const name = e.target.elements.name.value;
        const description = e.target.elements.description.value;
        const audio = e.target.elements.audio.files[0];
        const image = e.target.elements.image.files[0];

        const music = new FormData();
        music.append('name', name);
        music.append('description', description);
        music.append('audio', audio);
        music.append('image', image);

        fetch(`http://localhost:9200/${role}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: music
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            const name = data.music.name
            const desc = data.music.description
            const image = data.music.image
            const audio = data.music.audio

            dispatch(addMusic({name, desc, image, audio}))
        })
        .catch(err => {
            console.log(err)
            console.log('error')
        })

        navigate('/')

    }

    return (
        <>
            <h1>Upload music</h1>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor='name'>Name</label>
                <input type="text" id='name' name='name'/>

                <label htmlFor='description'>Description</label>
                <input type="text" id='description' name='description'/>

                <label htmlFor='audio'>Music</label>
                <input type="file" id='audio' name='audio'/>

                <label htmlFor='image'>Image</label>
                <input type="file" id='image' name='image'/>

                <button type="submit">Upload</button>
            </form>
        </>
    );
}