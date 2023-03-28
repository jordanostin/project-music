import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Slider from "react-slick";
import defaultImage from "../../public/images/mp3.png";
import './styles/music.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'


export const Music = () => {

    const [musics, setMusics] = useState([]);


    useEffect(() => {

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        fetch('http://localhost:9200/user/home', {headers})
            .then(res => res.json())
            .then(data => {
                setMusics(data.musics);
            })
            .catch(err => console.log(err))
    },[])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        centerMode: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return(
        <div className='carousel'>
            <Slider {...settings}>
                {musics.map((music, i) =>{
                    return(
                        <div key={i} className='image-music' >
                            <p className='name'>{music.name}</p>
                            {music.image ? (
                                <Link to={`/music/${music._id}`}><img src={`http://localhost:9200/public/${music.image}`} alt="Image de la musique"/></Link>
                                ) : (
                                <Link to={`/music/${music._id}`}><img src={defaultImage} alt="Image de base"/></Link>
                            )}
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}