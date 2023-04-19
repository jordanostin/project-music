import {useEffect, useState} from "react";
import defaultImage from "../../public/images/mp3.png";
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

    console.log(latestMusic)

    return(
        <div className='show'>
            <h3 className='title-music-added'>Recently added</h3>
            {latestMusic.map((music, i) =>{
                return(
                    <div key={i} className='music-added'>
                        <div className='img-music-added'>
                            {music.image ? (
                                <img src={`${process.env.REACT_APP_API_URL}/public/${music.image}`} alt="Image de la musique"/>
                            ) : (
                                <img src={defaultImage} alt="Image de base"/>
                            )}
                        </div>
                        <p>{music.name}</p>
                    </div>
                )
            })}
        </div>
    )

}