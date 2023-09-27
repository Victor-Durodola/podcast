import { Link } from 'react-router-dom'
import '../navbar.css'
export default function Navbar() {


  
  return (
    <>
        <nav>
          <div className="home">
            <Link to={"/podcast"} className='home-btn link'>Journey Podcast</Link>
          </div>
          <div className="menu">
            <div className="menu-links">
              <Link to={"/podcast/episodes"} className='link episode-link'>Episodes</Link>
              {/* <Link to={"/articles"} className='link article-link'>Article</Link> */}
              <Link to={"/podcast/store"} className='link store-link'>
                <button className='store-btn'>
                  <span className="material-symbols-outlined">shopping_cart</span>
                </button>
              </Link>
            </div>
            <label className='menu-btn'>
              <input type="checkbox" />
            </label>

            <div className="collapsed-menu">
              <Link to={"/podcast/articles"} className='link'>Article</Link>
              <Link to={"/podcast/store"} className='link collapsible-store-btn'>Store</Link>
            </div>
          </div>

          
        </nav>
    </>
  )
}
