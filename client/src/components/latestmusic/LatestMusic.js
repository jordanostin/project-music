import { useEffect, useState } from "react";
import defaultImage from "../../public/images/mp3.png";
import { Link } from "react-router-dom";
import './latestMusic.scss';

export const LatestMusic = () => {

    const [latestMusic, setLatestMusic] = useState([])

    useEffect(() => {

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch(`${process.env.REACT_APP_API_URL}/user/latestmusic`, {headers})
            .then(res => res.json())
            .then(data => {
                setLatestMusic(data)
            })
            .catch(err => console.log(err))
    },[])

    return(
        <div className='show'>
            <h3 className='title-music-added'>Recently added</h3>
            <div className='music-container'>
                {latestMusic.map((music, i) =>{
                    return(
                        <div key={i} className='music-added'>
                            <div className='img-music-added'>
                                {music.image ? (
                                        <Link to={`/music/${music._id}`}>
                                            <img src={`${process.env.REACT_APP_API_URL}/public/${music.image}`} alt="Image de la musique"/>
                                        </Link>
                                ) : (
                                    <Link to={`/music/${music._id}`}>
                                        <img src={defaultImage} alt="Image de base"/>
                                    </Link>
                                )}
                            </div>
                            <p>{music.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

