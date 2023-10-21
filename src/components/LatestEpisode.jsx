import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import {BsArrowLeftShort, BsArrowRightShort} from 'react-icons/bs'
import {FaPlay, FaPause} from 'react-icons/fa'

export default function LatestEpisode() {
  const [isplaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef()
  const progressBarRef = useRef()
  const animationRef = useRef()

  useEffect(()=>{
    
    const seconds = Math.floor(audioRef.current.duration);
    setDuration(seconds) ;

    progressBarRef.current.max = seconds;
    
  },[audioRef?.current?.loadedmetadata, audioRef?.current?.readyState]);

  const Play = () => {
    const prevValue = isplaying
    setIsPlaying(!isplaying)
    if (!prevValue) {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current)
    }
  }

  const changePlayerCurrentTime = () => {
    setCurrentTime(progressBarRef.current.value)
  }

  const whilePlaying = () => {
    progressBarRef.current.value = audioRef.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeTime = () => {
    audioRef.current.currentTime = progressBarRef.current.value
    changePlayerCurrentTime()
  }

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const backwards =()=> {
    progressBarRef.current.value = Number(progressBarRef.current.value - 30);
    changeTime()
  }  
  
  const forwards =()=> {
    progressBarRef.current.value = Number(progressBarRef.current.value + 30);
    changeTime()
  }  
 
  

  

  return (
    <>
      <div className="container" id="container">
        <div className="media-player">
            <div className="card">
              <div className="card-illustration">
              </div>
              <h1 className="episode-num">Episode #144</h1>
              <div className="player">
                <audio className="audio-player" ref={audioRef} src="https://github.com/Victor-Durodola/podcast/raw/main/src/assets/audio/Suzume.mp3"  />
                
                {/* {slider} */}
                <div className="time-info">
                  <div className="currentTime">{calculateTime(currentTime)}</div>
                  <div className="duration">{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
                </div>
                <input type="range" min={0} max={100} defaultValue={0} ref={progressBarRef} onChange={changeTime}/>

                {/* control buttons */}
                <div className="player-btns">
                  <button className="back-btn" onClick={backwards}><BsArrowLeftShort />30</button>
                  <button className="play-btn" onClick={Play}>{isplaying? <FaPause/>: <FaPlay className="playicon"/>}</button>
                  <button className="forward-btn" onClick={forwards}>30<BsArrowRightShort/></button>
                </div>

              </div>
            </div>
        </div>
        <div className="episode-details">
          <h1 className="episode-num">Episode #144</h1>
          <h2 className="episode-title">My first trial discussed with Steven Gate</h2>
          <p className="episode-summary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus vitae repudiandae
              sit necessitatibus doloribus architecto deserunt nemo libero odio inventore debitis, numquam
              dolor et quod ut! Amet molestias itaque adipisci.
          </p>
          <Link to={"/podcast/episodes"} className="link"><button className="more-episode-btn">More Episodes</button></Link>
        </div>
      </div>
    </>
  )
}

