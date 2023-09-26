import ReactAudioPlayer from "react-audio-player"
import { Link } from "react-router-dom"
export default function LatestEpisode() {
  return (
    <>
      <div className="container" id="container">
        <div className="media-player">
            <div className="card">
              <div className="card-illustration">
              </div>
              <h1 className="episode-num">Episode #144</h1>
              <div className="player">
                <ReactAudioPlayer className="audio-player" src="../src/assets/audio/Suzume.mp3" controls />
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
          <Link to={"/episodes"} ><button className="more-episode-btn">More Episodes</button></Link>
        </div>
      </div>
    </>
  )
}

