import {useSelector} from "react-redux";
import {Music} from "../../components/music/music";
import './home.scss'
import {Log} from "../log/log";
import {LatestMusic} from "../../components/latestmusic/LatestMusic";
import {AudioPlayer} from "../../components/audioPlayer/AudioPlayer";
import {useState} from "react";

export const Home = () => {

    const user = useSelector(state => state.user);
    const [link, setLink] = useState(null);

    return(
        <>

            {user.isLogged ? (
                <>
                    <div className='fond'></div>
                    <div className='welcome'>
                        <h2>Bonjour {user.name}</h2>
                    </div>

                    <Music setLink={setLink}/>

                    <LatestMusic />

                    <AudioPlayer trackUrl={link} />

                </>
            ):(
                <Log />
            )}
        </>
    );
}