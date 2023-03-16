import {Navigation} from "../../routes/route";
import {useSelector} from "react-redux";


export const Home = () => {

    const user = useSelector(state => state.user)

    return(
        <>
            <Navigation />
            {user.isLogged ? (<p>Bonjour {user.name}</p>): null}

        </>
    );
}