import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AudioPlayer} from "../audioPlayer/AudioPlayer";
import defaultImage from "../../public/images/mp3.png";
import playButton from "../../public/images/play-button.png";
import './styles/showPLaylist.scss';

export const ShowPlaylist = () => {

    const {playlistId} = useParams();
    const [playlist, setPlaylist] = useState('');
    const [currentTrack, setCurrentTrack] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch(`${process.env.REACT_APP_API_URL}/user/playlist/${playlistId}`, { headers })
            .then(res => res.json())
            .then(data => {
                setPlaylist(data);
            })
            .catch(err => console.log(err));
    },[])

    const handlePlayTrack = (trackUrl, name) => {
        setCurrentTrack(prevState => {
            if (prevState.trackUrl === trackUrl) {
                return {};
            } else {
                return {trackUrl, name};
            }
        });
    };

    return (
        <>
            {playlist ? (
                <div className='container-showPlaylist'>
                    <h2>{playlist.name}</h2>
                    {playlist.musics.map((music, i) => {
                        return (
                            <div key={i} className="music-container">
                                {music.image ? (<img src={`${process.env.REACT_APP_API_URL}/public/${music.image}`} className='imgInPlaylist'/>) : (<img src={defaultImage} alt="Image de base" className='imgInPlaylist'/>)}
                                {currentTrack.trackUrl !== `${process.env.REACT_APP_API_URL}/public/${music.audio}` && (
                                    <div className="play-button">
                                        <img src={playButton} alt="Bouton Play" onClick={() => handlePlayTrack(`${process.env.REACT_APP_API_URL}/public/${music.audio}`, music.name)} className="button" />
                                    </div>
                                )}
                                <h3 className='titleInPlaylist'>{music.name}</h3>
                                <Link to={`/delete/playlist/${playlist._id}/music/${music._id}`} className='delete-button'>Delete</Link>
                            </div>
                        );
                    })}
                    <AudioPlayer trackUrl={currentTrack.trackUrl} nameMusic={currentTrack.name} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}




/*<audio controls>
                                    <source src={`${process.env.REACT_APP_API_URL}/public/${music.audio}`} type='audio/mpeg' />
                                </audio>*/

