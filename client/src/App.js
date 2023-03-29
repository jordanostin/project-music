import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {addUser} from "./store/slices/user/userSlice";
import {Navigation} from "./routes/route";

function App() {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

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

    useEffect(() => {
        console.log(user)
    },[user])


  return(
      <>
          <Navigation/>
      </>
  );
}

export default App;
