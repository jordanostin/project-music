import {useSelector} from "react-redux";
import {Nav} from "../../components/nav/Nav";

export const Home = () => {

    const user = useSelector(state => state.user)

    return(
        <>
            {user.isLogged ? (<p>Bonjour {user.name}</p>): null}

        </>
    );
}