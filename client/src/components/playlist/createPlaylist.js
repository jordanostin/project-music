import { useDispatch } from "react-redux";
import { addPlaylist } from "../../store/slices/playlist/playlistSlice";
import './styles/createPlaylist.scss'

export const CreatePlaylist = ({ onAddPlaylist }) => {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const playlist = {
            name: e.target.elements.name.value,
        };

        fetch(`${process.env.REACT_APP_API_URL}/user/create-playlist`, {
            method: "POST",
            body: JSON.stringify(playlist),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {

                dispatch(addPlaylist(data));
                onAddPlaylist(data);

                window.location.reload();

            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className='form-playlist'>
            <input type="text" id="name" name="name" placeholder='Playlist Name' className='input-name'/>
            <input type="submit" value='Create Playlist' className='submit-playlist'/>
        </form>
    );
};
