import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {addComment} from "../../store/slices/comment/commentSlice";

export const Comment = () => {

    const dispatch = useDispatch();
    const {itemId} = useParams();
    const navigate = useNavigate();
    const com = useSelector(state => state.comment)

    const handleSubmit = (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        const comment = {
            content: e.target.elements.content.value,
        }

        fetch(`http://localhost:9200/user/comment/music/${itemId}`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {

                console.log(data)

                const type = data.type;
                const itemId = data.itemId;

                console.log( comment, type, itemId)

                dispatch(addComment({comment, type, itemId}))


            })
            .catch((err) => console.log(err));

        navigate('/');
        //window.location.reload();
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