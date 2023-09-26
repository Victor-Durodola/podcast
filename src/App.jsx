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
          <Route path="/" element={<Home/>}/>
          <Route path="/episodes" element={<Episodes/>}/>
          {/* <Route path="/articles" element={<Articles/>}/> */}
          <Route path="/store" element={<Store/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
