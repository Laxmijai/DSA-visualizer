import { BrowserRouter,Route,Routes } from "react-router-dom";
import Navbar from "./HomePage/Navbar"
import HeroSection from "./HomePage/HeroSection"
import Footer from "./HomePage/Footer"
import Index from "./AlgorithmVisualizer/Index"
import LinearSearchPage from "./Array-Functions/Searching/LinearSearchPage";
import BinarySearchPage from "./Array-Functions/Searching/BinarySearchPage";

import BubbleSort from "./Array-Functions/Sorting/BubbleSort";
import SelectionSort from "./Array-Functions/Sorting/SelectionSort";
import InsertionSort from "./Array-Functions/Sorting/InsertionSort";
import MergeSort from "./Array-Functions/Sorting/MergeSort";
import QuickSort from "./Array-Functions/Sorting/QuickSort";

import IsEmpty from "./StackFunction/IsEmpty"
import IsFullStack from "./StackFunction/IsFullStack"
import PushPopPeek from "./StackFunction/PushPopPeek"

function App() {
  return (
    <>
      
     <BrowserRouter>
     <Navbar/>
     <Routes>
     <Route path="/" element={<HeroSection/>}></Route> 
     <Route path="/visualise" element= {<Index/>}></Route>
     <Route path="/array/linear-search" element={ <LinearSearchPage/>}></Route>
     <Route path="/array/binary-search" element={<BinarySearchPage/>}></Route>
     <Route path="/array/merge-sort" element={<MergeSort />} />
     <Route path="/array/bubble-sort" element={<BubbleSort />} />
     <Route path="/array/insertion-sort" element={<InsertionSort />} />
     <Route path="/array/quick-sort" element={<QuickSort />} />
     <Route path="/array/selection-sort" element={<SelectionSort />} />
      <Route path="stack/push-and-pop" element={<PushPopPeek/>}></Route>
      <Route path="stack/peek" element={<PushPopPeek/>}></Route>
      <Route path="stack/is-empty" element={<IsEmpty/>}></Route>
      <Route path="stack/is-full" element={<IsFullStack/>}></Route>
     </Routes>
      <Footer/>
     </BrowserRouter>
     
      
    </>
  )
}

export default App
