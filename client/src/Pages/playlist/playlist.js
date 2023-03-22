import {CreatePlaylist} from "../../components/playlist/createPlaylist";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {addUser} from "../../store/slices/user/userSlice";
import {useDispatch, useSelector} from "react-redux";

export const Playlist = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
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
    }, [])

    return(
        <>
            <CreatePlaylist />
            {playlists.map((playlist, i) =>{
                return(
                    <div key={i}>
                        <Link to='#' >{playlist.name}</Link><br/>
                    </div>
                )
            })}
        </>
    );
}