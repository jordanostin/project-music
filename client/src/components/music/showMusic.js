import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {AddInPlaylist} from "../playlist/addInPlaylist";
import {Like} from "../like/like";
import {Comment} from "../form/comment";
import './styles/showMusic.scss'
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../../store/slices/user/userSlice";
import {DeleteComment} from "../delete/deleteComment";

export const ShowMusic = () => {

    const {musicId} = useParams()

    const [music, setMusic] = useState({})
    const [comments, setComments] = useState([]);
    const user = useSelector(state => state.user.id);
    const dispatch = useDispatch();
    const getCommentDetails = (commentId) => {
        const comment = comments.find((comment) => comment._id === commentId);
        return comment;
    };

    useEffect(() => {

        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        if (token){

            fetch(`${process.env.REACT_APP_API_URL}/auth/verify-token`, {headers})
                .then(res => res.json())
                .then(data => {
                    dispatch(addUser(data.user))
                })
                .catch(err => console.log(err))
        };

    },[]);

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
            <h3 className='title'>{music.name}</h3>
            {music.image ? (<img src={`${process.env.REACT_APP_API_URL}/public/${music.image}`} className='image'/>): null}
            {music.audio && (
                <audio controls>
                    <source src={`${process.env.REACT_APP_API_URL}/public/${music.audio}`} type='audio/mpeg' />
                </audio>
            )}
            {music.comments && music.comments.map((commentId, i) => {
                const comment = getCommentDetails(commentId);
                console.log(comment)
                if (comment) {
                    return (
                        <div key={i}>
                            <h4>{comment.userName}</h4>
                            <p>{comment.content}</p>
                            {comment.user === user ?(
                                <Link to={`/delete/comment/by-user/${comment._id}`}>Delete</Link>
                            ) : null
                            }
                        </div>
                    );
                } else {
                    return null;
                }
            })}
            <Link to={`/download/${musicId}`}>Download</Link>
            <Comment id={musicId}/>
            <AddInPlaylist musicId={musicId}/>
            <Like musicId={musicId}/>
        </>
    )
}

/*<>
            <h3 className='title'>{music.name}</h3>
            {music.image ? (<img src={`${process.env.REACT_APP_API_URL}/public/${music.image}`} className='image'/>): null}
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
            <Comment id={musicId}/>
            <AddInPlaylist musicId={musicId}/>
            <Like musicId={musicId}/>
        </>*/