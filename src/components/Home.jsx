import '../home.css'
import LatestEpisode from './LatestEpisode'
import NewsletterSignUp from './NewsletterSignUp'
import Footer from './Footer'
export default function Home() {
  return (
    <div>
      <div className="hero-image">
        <div className="hero-text">
          <h1>Welcome to the best podcast on the internet</h1>
          <a href='#container' className='latest-btn' >Latest Episode</a>
        </div>
      </div>
      <LatestEpisode/>
      <NewsletterSignUp/>
      <Footer/>
    </div>
  )
}
