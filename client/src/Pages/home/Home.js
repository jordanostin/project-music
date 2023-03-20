import {useSelector} from "react-redux";
import {Music} from "../../components/music/music";

export const Home = () => {

    const user = useSelector(state => state.user)

    return(
        <>
            {user.isLogged ? (
                <>
                    <h2>Bonjour {user.name}</h2>

                    <Music />
                </>
            ): null}
        </>
    );
}