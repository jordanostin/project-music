import {useSelector} from "react-redux";
import {Music} from "../../components/music/music";
import './home.scss'
import {Log} from "../log/log";
import {LatestMusic} from "../../components/latestmusic/LatestMusic";
import {AudioPlayer} from "../../components/audioPlayer/AudioPlayer";

export const Home = () => {

    const user = useSelector(state => state.user)

    return(
        <>

            {user.isLogged ? (
                <>
                    <div className='fond'></div>
                    <div className='welcome'>
                        <h2>Bonjour {user.name}</h2>
                    </div>

                    <Music />

                    <LatestMusic />

                </>
            ):(
                <Log />
            )}
        </>
    );
}