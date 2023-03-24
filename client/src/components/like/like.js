import {useEffect, useState} from "react";

export const Like = ({musicId}) => {

    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        fetch(`http://localhost:9200/user/music/${musicId}`, {
            headers,
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setIsLiked(data.isLiked)
            })
            .catch(err => console.log(err));
    }, []);
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

                const like = data.isLiked

                console.log(like)

                setIsLiked(like)


            })
            .catch(err => console.log(err))
    }

    return(
        <>
            <button onClick={handleLike}>{isLiked ? "Dislike" : "Like"}</button>
        </>
    );
}

