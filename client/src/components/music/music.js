import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export const Music = () => {

    const song = useSelector(state => state.music)

    const [musics, setMusics] = useState([]);
    const [users, setUsers] = useState([]);

    console.log(song)

    useEffect(() => {

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch('http://localhost:9200/user/home', {headers})
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                setMusics(data.musics);
            })
            .catch(err => console.log(err))
    },[])



    return(
        <>
            {musics.map((music, i) => {
                console.log(music)
                return (
                    <div key={i}>
                        <h3>{music.name}</h3>
                        <p>{music.description}</p>
                        {music.image ? (<img src={`http://localhost:9200/public/${music.image}`}/>): null}
                        <audio controls >
                            <source src={`http://localhost:9200/public/${music.audio}`} type='audio/mpeg'/>
                        </audio>
                        <Link to={`/download/${music._id}`}>Download</Link>
                        <p></p>
                        <Link to={`/comment/${music._id}`}>Comment</Link>
                    </div>
                )
            })}
        </>
    );
}