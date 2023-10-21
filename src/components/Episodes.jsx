import '../latestEpisode.css'
import '../episodes.css'
import data from '../data.json'

import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import {BsArrowLeftShort, BsArrowRightShort} from 'react-icons/bs'
import {FaPlay, FaPause} from 'react-icons/fa'

export function AudioItem (props) {
  function myFunction() {
    props.handleClick()
  }
  return (
    <>
      <div className="item" onClick={myFunction}>
        <div className="item-image"></div>
        <div className="episode-elements">
          <div className="top">
            <div className="episode-num">Episode #{props.episode}</div>
            <div className="episode-duration">{props.duration}</div>
          </div>
          <div className="episode-name">{props.name}</div>
        </div>
      </div>
    </>
  )
}

export default function Episodes() {
  const [selectedAudio, setSelectedAudio] = useState({"episode" : "12", "file" : "https://github.com/Victor-Durodola/podcast/raw/main/src/assets/audio/ozy.mp3"})
  const [isplaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioPlyerRef = useRef()
  const progressBarRef = useRef()
  const animationRef = useRef()

  useEffect(()=>{
    
    const seconds = Math.floor(audioPlyerRef.current.duration);
    setDuration(seconds) 

    progressBarRef.current.max = seconds
    
  },[audioPlyerRef?.current?.loadedmetadata, audioPlyerRef?.current?.readyState])

  function selectAudio(episode, file) {
    setSelectedAudio({
      "episode" : episode,
      "file" : file
    })
  }

  

  const Play = () => {
    const prevValue = isplaying
    setIsPlaying(!isplaying)
    if (!prevValue) {
      audioPlyerRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlyerRef.current.pause();
      cancelAnimationFrame(animationRef.current)
    }
  }

  const changePlayerCurrentTime = () => {
    setCurrentTime(progressBarRef.current.value)
  }

  const whilePlaying = () => {
    progressBarRef.current.value = audioPlyerRef.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeTime = () => {
    audioPlyerRef.current.currentTime = progressBarRef.current.value
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
 
  
  let allAudio = data.map(item => {
    return <AudioItem key={item.name} 
                      name={item.name} 
                      file={item.file} 
                      duration={item.duration}
                      episode={item.episode} 
                      handleClick={()=>{selectAudio(item.episode, item.file)}}/> 
  })
  
  
  return (
    <div className="episode-container">
      <h1>Episodes</h1>
      <div className="list-player">
        <div className="episode-list">
          {allAudio}
          
        </div>
        <div className="media-player">
            <div className="card">
              <div className="card-illustration">
              </div>
              <h1 className="episode-num">Episode # {selectedAudio.episode}</h1>
              <div className="player">
                <audio className="audio-player" src={selectedAudio.file} ref={audioPlyerRef} />
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
      </div>
    </div>
  )
}

AudioItem.propTypes = {
  name : PropTypes.string,
  file : PropTypes.string,
  episode : PropTypes.string,
  duration : PropTypes.string,
  handleClick: PropTypes.func
}