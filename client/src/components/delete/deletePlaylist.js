import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const DeletePlaylist = () => {

    const {playlistId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch(`${process.env.REACT_APP_API_URL}/user/delete/playlist/${playlistId}`, {
            headers,
            method: 'DELETE'
        })
            .then(data => {
                console.log(data)
                navigate('/playlist');
                window.location.reload();
            })
            .catch(err => console.log(err))


    },[])

    return null
}