import {useDispatch, useSelector} from "react-redux";
import {addComment} from "../../store/slices/comment/commentSlice";
import "./styles/comment.scss"

export const Comment = ({id}) => {

    const dispatch = useDispatch();
    const com = useSelector(state => state.comment)

    const handleSubmit = (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        const comment = {
            content: e.target.elements.content.value,
        }

        fetch(`${process.env.REACT_APP_API_URL}/user/comment/music/${id}`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {

                const type = data.type;
                const itemId = data.itemId;

                dispatch(addComment({comment, type, itemId}))
            })
            .catch((err) => console.log(err));

        window.location.reload();
    }


    return(
        <>
            <form onSubmit={handleSubmit} className='form-com'>
                <input type="text" name='content' placeholder='Comment' className='comment'/>
                <input type="submit" value='Comment' className='submit-com'/>
            </form>
        </>
    );
}