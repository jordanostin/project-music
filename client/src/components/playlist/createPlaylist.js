import {useDispatch, useSelector} from "react-redux";
import {addPlaylist} from "../../store/slices/playlist/playlistSlice";
import {useEffect} from "react";

export const CreatePlaylist = () => {

    const playlists = useSelector(state => state.playlist)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(playlists)
    },[playlists])
    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const playlist = {
            name: e.target.elements.name.value,
        }

        fetch(`http://localhost:9200/user/create-playlist`, {
            method: 'POST',
            body: JSON.stringify(playlist),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                dispatch(addPlaylist(data))
            })
            .catch(err => console.log(err))
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Playlist name</label>
                <input type='text' id='name' name='name' />
                <input type='submit' value='Create playlist'/>
            </form>
        </>
    );
}