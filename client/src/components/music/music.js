import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AddInPlaylist} from "../playlist/addInPlaylist";
import {Like} from "../like/like";

export const Music = () => {

    const [musics, setMusics] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);

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

        fetch('http://localhost:9200/user/home', {headers})
            .then(res => res.json())
            .then(data => {

                setUsers(data.users);
                setMusics(data.musics);
                setComments(data.comments);
            })
            .catch(err => console.log(err))
    },[])



    return(
        <>
            {musics.map((music, i) => {
                return (
                    <div key={i}>
                        <h3>{music.name}</h3>
                        <p>{music.description}</p>
                        {music.image ? (<img src={`http://localhost:9200/public/${music.image}`}/>): null}
                        <audio controls >
                            <source src={`http://localhost:9200/public/${music.audio}`} type='audio/mpeg'/>
                        </audio>
                        <Link to={`/download/${music._id}`}>Download</Link>
                        {music.comments.map((commentId, i) => {
                            const comment = getCommentDetails(commentId);
                            return (
                                <div key={i}>
                                    <h4>{comment.userName}</h4>
                                    <p>{comment.content}</p>
                                </div>
                            );
                        })}
                        <Link to={`/comment/${music._id}`}>Comment </Link>
                        <AddInPlaylist musicId={music._id}/>
                        <Like musicId={music._id}/>
                    </div>
                )
            })}
        </>
    );
}