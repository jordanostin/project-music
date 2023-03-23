import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const ShowPlaylist = () => {

    const {playlistId} = useParams();
    const [playlist, setPlaylist] = useState('');



    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch(`http://localhost:9200/user/playlist/${playlistId}`, { headers })
            .then(res => res.json())
            .then(data => {
                setPlaylist(data);
            })
            .catch(err => console.log(err));
    },[])

    console.log(playlist)


    return (
        <>
            {playlist ? (
                <>
                    <h2>{playlist.name}</h2>
                    {playlist.musics.map((music, i) => {
                        return (
                            <div key={i}>
                                <h3>{music.name}</h3>
                                <p>{music.description}</p>
                                {music.image ? (<img src={`http://localhost:9200/public/${music.image}`} />) : null}
                                <audio controls>
                                    <source src={`http://localhost:9200/public/${music.audio}`} type='audio/mpeg' />
                                </audio>
                                <a href={`http://localhost:9200/public/${music.audio}`} download>Download</a>
                                <br />
                                <Link to={`/delete/playlist/${playlist._id}/music/${music._id}`}>Delete</Link>
                            </div>
                        );
                    })}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

