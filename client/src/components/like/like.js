import {useState} from "react";

export const Like = ({musicId}) => {

    const [isLiked, setIsLiked] = useState(false)
    const handleLike = () => {

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch(`http://localhost:9200/user/music/${musicId}/toggleLike`,{
            headers,
            method: 'POST'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.message)
                setIsLiked(!isLiked)
            })
            .catch(err => console.log(err))
    }

    return(
        <>
            <button onClick={handleLike}>{isLiked ? "Dislike" : "Like"}</button>
        </>
    );
}