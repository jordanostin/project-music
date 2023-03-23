import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


export const DeleteMusicInPlaylist = () => {

    const {playlistId, musicId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch(`http://localhost:9200/user/delete/playlist/${playlistId}/music/${musicId}`, {
            headers,
            method: 'DELETE'
        })
            .then(data => {
                console.log(data)
                navigate(`/playlist/${playlistId}`);
                window.location.reload();
            })
            .catch(err => console.log(err))


    },[])

    return null
}