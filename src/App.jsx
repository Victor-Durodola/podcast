import Home from "./components/Home"
import Navbar from "./components/Navbar"
// import Articles from "./components/Articles"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Store from "./components/Store"
import Episodes from "./components/Episodes"
import ShoppingContext from "./context/ShoppingContext"
function App() {

  return (
    <>
      <ShoppingContext>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/podcast" element={<Home/>}/>
            <Route path="/podcast/episodes" element={<Episodes/>}/>
            {/* <Route path="/articles" element={<Articles/>}/> */}
            <Route path="/podcast/store" element={<Store/>}/>
          </Routes>
        </BrowserRouter>
      </ShoppingContext>
    </>
  )
}

export default App
