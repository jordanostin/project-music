import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {AddInPlaylist} from "../playlist/addInPlaylist";
import {Like} from "../like/like";

export const ShowMusic = () => {

    const {musicId} = useParams()

    const [music, setMusic] = useState({})
    const [comments, setComments] = useState([]);

    const getCommentDetails = (commentId) => {
        const comment = comments.find((comment) => comment._id === commentId);
        return comment;
    };

    useEffect(() =>{
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch(`${process.env.REACT_APP_API_URL}/user/home`, {headers})
            .then(res => res.json())
            .then(data => {
                setComments(data.comments);
            })
            .catch(err => console.log(err))
    },[])

    useEffect(() => {

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch(`${process.env.REACT_APP_API_URL}/user/show-music/${musicId}`, {headers})
            .then(res => res.json())
            .then(data => {
                setMusic(data.music)
            })
            .catch(err => console.log(err))
    },[])

    return(
        <>
            <h3>{music.name}</h3>
            {music.image ? (<img src={`${process.env.REACT_APP_API_URL}/public/${music.image}`}/>): null}
            {music.audio && (
                <audio controls>
                    <source src={`${process.env.REACT_APP_API_URL}/public/${music.audio}`} type='audio/mpeg' />
                </audio>
            )}
            {music.comments && music.comments.map((commentId, i) => {
                const comment = getCommentDetails(commentId);
                if (comment) {
                    return (
                        <div key={i}>
                            <h4>{comment.userName}</h4>
                            <p>{comment.content}</p>
                        </div>
                    );
                } else {
                    return null;
                }
            })}
            <Link to={`/download/${musicId}`}>Download</Link>
            <Link to={`/comment/${musicId}`}>Comment </Link>
            <AddInPlaylist musicId={musicId}/>
            <Like musicId={musicId}/>
        </>
    )
}