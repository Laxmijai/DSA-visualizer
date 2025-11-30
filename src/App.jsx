import { BrowserRouter,Routes,Route } from "react-router-dom"
import Navbar from "./HomePage/Navbar"
import HeroSection from "./HomePage/HeroSection"
import Footer from "./HomePage/Footer"
import Index from "./AlgorithmVisualizer"

function App() {
  return (
    <>
      
     <BrowserRouter>
     <Navbar/>
     <Routes>
     <Route path="/" element={<HeroSection/>}></Route> 
     <Route path="/visualise" element= {<Index/>}></Route>
     </Routes>
      <Footer/>
     </BrowserRouter>
     
      
    </>
  )
}

export default App
