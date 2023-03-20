import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const DeleteMusic = () => {

    const {musicId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch(`http://localhost:9200/admin/delete/music/${musicId}`, {
            headers,
            method: 'DELETE'
        })
            .then(data => {
                console.log(data)
                navigate('/admin');
                window.location.reload();
            })
            .catch(err => console.log(err))


    },[])

    return null
}