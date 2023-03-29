import {useEffect, useState} from "react";

export const AddInPlaylist = ( {musicId} ) => {

    const [playlistId, setPlaylistId] = useState("");
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch(`${process.env.REACT_APP_API_URL}/user/playlist/user`, {headers})
            .then(res => res.json())
            .then(data => {

                setPlaylists(data)

            })
            .catch(err => console.log(err))
    }, [])

    const handleAddToPlaylist = () => {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        };

        fetch(`${process.env.REACT_APP_API_URL}/user/playlist/${playlistId}/musics/${musicId}`, {
            method: "POST",
            headers,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <select value={playlistId} onChange={(e) => setPlaylistId(e.target.value)}>
                <option value="">-- Select a playlist --</option>
                {playlists.map((playlist) => (
                    <option key={playlist._id} value={playlist._id}>
                        {playlist.name}
                    </option>
                ))}
            </select>
            <button onClick={handleAddToPlaylist}>Add to playlist</button>
        </>
    );
};

