import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const Music = () => {

    const [musics, setMusics] = useState([]);


    useEffect(() => {

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch('http://localhost:9200/user/home', {headers})
            .then(res => res.json())
            .then(data => {
                setMusics(data.musics);
            })
            .catch(err => console.log(err))
    },[])

    const handlePlay = (e) => {
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = e.target.getAttribute('data-url');
        audioPlayer.play();
    }

    return(
        <>
            {musics.map((music, i) =>{
                return(
                <div key={i}>
                    <Link to={`/music/${music._id}`}>{music.name}</Link>
                </div>
                )
            })}
        </>
    );
}