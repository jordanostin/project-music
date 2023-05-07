import { CreatePlaylist } from "../../components/playlist/createPlaylist";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/playlist.scss";

export const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        };

        fetch(`${process.env.REACT_APP_API_URL}/user/playlist/user`, { headers })
            .then((res) => res.json())
            .then((data) => {
                setPlaylists(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleAddPlaylist = (newPlaylist) => {
        setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
    };

    return (
        <div className="playlist-container">
            <CreatePlaylist className="create-playlist-btn" onAddPlaylist={handleAddPlaylist}/>
            {playlists.map((playlist, i) => {
                return (
                    <div className="playlist-item" key={i}>
                        <Link to={`/playlist/${playlist._id}`}>{playlist.name}</Link>
                        <Link
                            to={`/delete/playlist/${playlist._id}`}
                            className="delete-link"
                        >
                            Delete
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};
