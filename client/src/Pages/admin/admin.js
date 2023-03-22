import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const Admin = () => {

    const [musics, setMusics] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([])

    useEffect(() => {

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch('http://localhost:9200/admin/back-office', {headers})
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                setMusics(data.musics);
                setComments(data.comments)
            })
            .catch(err => console.log(err))
    },[users, musics])

    const getUserName = (userId) => {
        const user = users.find((user) => user._id === userId);
        return user ? user.name : "";
    };

    return(
        <>
            <h2>Users</h2>

            <table>
                <thead>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Action</td>
                </tr>
                </thead>

                <tbody>
                {users.map((user,i) => (
                    <tr key={i}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td><Link to={`/delete/user/${user._id}`}>Delete</Link></td>
                    </tr>
                ))}
                </tbody>

            </table>

            <h2>Musics</h2>

            <table>
                <thead>
                <tr>
                    <td>ID</td>
                    <td>User</td>
                    <td>Name</td>
                    <td>Action</td>
                </tr>
                </thead>

                <tbody>
                {musics.map((music,i) => (
                    <tr key={i}>
                        <td>{music._id}</td>
                        <td>{getUserName(music.user)}</td>
                        <td>{music.name}</td>
                        <td><Link to={`/delete/music/${music._id}`}>Delete</Link></td>
                    </tr>
                ))}
                </tbody>

            </table>

            <h2>Comments</h2>

            <table>
                <thead>
                <tr>
                    <td>ID</td>
                    <td>User</td>
                    <td>Comment</td>
                    <td>Action</td>
                </tr>
                </thead>

                <tbody>
                {comments.map((comment,i) => (
                    <tr key={i}>
                        <td>{comment._id}</td>
                        <td>{getUserName(comment.user)}</td>
                        <td>{comment.content}</td>
                        <td><Link to={`/delete/comment/${comment._id}`}>Delete</Link></td>
                    </tr>
                ))}
                </tbody>

            </table>
        </>
    );
}