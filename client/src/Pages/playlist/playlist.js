import {CreatePlaylist} from "../../components/playlist/createPlaylist";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const Playlist = () => {
    const [playlists, setPlaylists] = useState([])


    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch('http://localhost:9200/user/playlist/user', {headers})
            .then(res => res.json())
            .then(data => {

                setPlaylists(data)

            })
            .catch(err => console.log(err))
    }, []);

    return(
        <>
            <CreatePlaylist />
            {playlists.map((playlist, i) =>{
                return(
                    <div key={i}>
                        <Link to={`/playlist/${playlist._id}`} >{playlist.name} </Link>
                        <Link to={`/delete/playlist/${playlist._id}`}>Delete</Link><br/>
                    </div>
                )
            })}
        </>
    );
}