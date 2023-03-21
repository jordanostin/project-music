import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const DeleteComment = () => {

    const {commentId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch(`http://localhost:9200/admin/delete/comment/${commentId}`, {
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