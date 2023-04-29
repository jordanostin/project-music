import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import "./audioPlayer.scss";

export const AudioPlayer = ({trackUrl, nameMusic}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    const audioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    useEffect(() => {
        const audioElement = audioRef.current;

        const setDurationFromAudio = () => {
            setDuration(audioElement.duration);
        };

        const setCurrentTimeFromAudio = () => {
            setCurrentTime(audioElement.currentTime);
        };

        audioElement.addEventListener("loadedmetadata", setDurationFromAudio);
        audioElement.addEventListener("timeupdate", setCurrentTimeFromAudio);

        return () => {
            audioElement.removeEventListener(
                "loadedmetadata",
                setDurationFromAudio
            );
            audioElement.removeEventListener("timeupdate", setCurrentTimeFromAudio);
        };
    }, [trackUrl]);

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
        audioRef.current.volume = event.target.value;
    };

    return (
        <div className='player'>
            <p className='music-title'>{nameMusic}</p>

            <div className="audio-player">

                <div className="play-pause" onClick={togglePlay}>
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </div>
                <div className="time">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
                <div className="progress">
                    <div
                        className="progress-bar"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                </div>
                <div className="volume">
                    <label htmlFor="volume-control">Volume:</label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        id="volume-control"
                    />
                </div>
                <audio src={trackUrl} ref={audioRef} />
            </div>
        </div>
    );
};
