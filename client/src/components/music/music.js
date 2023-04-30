import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Slider from "react-slick";
import defaultImage from "../../public/images/mp3.png";
import './styles/music.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'

export const Music = ({setLink, setNameMusic}) => {

    const [musics, setMusics] = useState([]);
    const [currentMusic, setCurrentMusic] = useState(null);
    const [musicUrl, setMusicUrl] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch(`${process.env.REACT_APP_API_URL}/user/home`, {headers})
            .then(res => res.json())
            .then(data => {
                setMusics(data.musics);
                setCurrentMusic(data.musics[Math.floor(data.musics.length / 2)]);
            })
            .catch(err => console.log(err))
    }, []);

    const handlePlay = () => {
        if (currentMusic) {
            const url = `${process.env.REACT_APP_API_URL}/public/${currentMusic.audio}`;
            setMusicUrl(url);
            setLink(url)
            setNameMusic(currentMusic.name)
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        centerMode: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        beforeChange: (current, next) => {
            setCurrentMusic(musics[next]);
        }
    };

    return (
        <>
            <div className='carousel'>
                <Slider {...settings}>
                    {musics.map((music, i) => {
                        return (
                            <div key={i} className='music-carousel'>
                                <div className='image-music'>
                                    {music.image ? (
                                        <Link to={`/music/${music._id}`}><img
                                            src={`${process.env.REACT_APP_API_URL}/public/${music.image}`}
                                            alt="Image de la musique"/></Link>
                                    ) : (
                                        <Link to={`/music/${music._id}`}><img src={defaultImage}
                                                                              alt="Image de base"/></Link>
                                    )}
                                </div>
                                <p className='music-name'>{music.name}</p>
                            </div>
                        );
                    })}
                </Slider>
                {currentMusic && (
                    <div className='play-button'>
                        <button onClick={handlePlay}>
                            Play
                        </button>
                    </div>
                )}
            </div>

        </>
    );
};


/*{currentMusic && (
                <>
                    <AudioPlayer trackUrl={`${process.env.REACT_APP_API_URL}/public/${currentMusic.audio}`} />
                </>
            )}*/