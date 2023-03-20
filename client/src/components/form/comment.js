import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {addComment} from "../../store/slices/comment/commentSlice";
import {addCommentToMusic} from "../../store/slices/music/musicSlice";

export const Comment = () => {

    const dispatch = useDispatch();
    const {itemType, itemId} = useParams();
    const navigate = useNavigate();

    let type;

    if(itemType === 'music'){
        type = 'music'
    }else{
        type = 'comment'
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        const comments = {
            content: e.target.elements.content.value,
        }

        fetch(`http://localhost:9200/user/comment/music/${itemId}`, {
            method: 'POST',
            body: JSON.stringify(comments),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.user)

                const name = data.user.name
                const comment = data.comment
                const type = data.type
                const itemId = data.itemId

                dispatch(addComment({name,comment,type,itemId}));

                dispatch(addCommentToMusic(itemId, {name, comment}))


            })
            .catch((err) => console.log(err));

        navigate('/');
        window.location.reload();
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name='content' placeholder='Comment'/>
                <input type="submit" value='Comment'/>
            </form>
        </>
    );
}