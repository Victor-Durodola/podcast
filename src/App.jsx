import Home from "./components/Home"
import Navbar from "./components/Navbar"
// import Articles from "./components/Articles"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Store from "./components/Store"
import Episodes from "./components/Episodes"
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/podcast" element={<Home/>}/>
          <Route path="/podcast/episodes" element={<Episodes/>}/>
          {/* <Route path="/articles" element={<Articles/>}/> */}
          <Route path="/podcast/store" element={<Store/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
