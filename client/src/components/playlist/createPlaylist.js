import { useDispatch } from "react-redux";
import { addPlaylist } from "../../store/slices/playlist/playlistSlice";

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
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Playlist name</label>
            <input type="text" id="name" name="name" />
            <button type="submit">Create playlist</button>
        </form>
    );
};
