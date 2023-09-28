import '../latestEpisode.css'
import '../episodes.css'

import PropTypes from 'prop-types'
import ReactAudioPlayer from 'react-audio-player'
import { useEffect, useState } from 'react'

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
  const [catalogue, setCatalogue] = useState([{"name": "f", "file": "https://github.com/Victor-Durodola/podcast/raw/main/src/assets/audio/ozy.mp3", "duration":"2","episode": "2"}])
  const [selectedAudio, setSelectedAudio] = useState({"episode" : "12", "file" : "https://github.com/Victor-Durodola/podcast/raw/main/src/assets/audio/ozy.mp3"})
  const url = 'src/data.json'

  function selectAudio(episode, file) {
    setSelectedAudio({
      "episode" : episode,
      "file" : file
    })
  }

  let allAudio = catalogue.map(item => {
    return <AudioItem key={item.name} 
                      name={item.name} 
                      file={item.file} 
                      duration={item.duration}
                      episode={item.episode} 
                      handleClick={()=>{selectAudio(item.episode, item.file)}}/> 
  })

  useEffect(()=>{
    async function getData() {
      try {const response = await fetch(url)
      const data = await response.json()
      setCatalogue (data)}
      catch (error){
        console.error("error");
      }
    }

    getData()
  },[])
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
                <ReactAudioPlayer className="audio-player" src={selectedAudio.file} controls />
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