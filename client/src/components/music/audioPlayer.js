import { useEffect, useRef, useState, useCallback, useMemo } from "react";

export const AudioPlayer = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef();

    const handleTimeUpdate = useCallback(() => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    }, []);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = currentTime;
        }
    }, [currentTime]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (event) => {
        setCurrentTime(event.target.value);
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const totalDuration = useMemo(() => {
        return isNaN(duration) ? 0 : duration;
    }, [duration]);

    return (
        <div className="audio-player">
            <div className="audio-controls">
                <button onClick={handlePlayPause}>
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <input
                    type="range"
                    min={0}
                    max={totalDuration}
                    value={currentTime}
                    onChange={handleSeek}
                />
            </div>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                preload="metadata"
            />
        </div>
    );
};
