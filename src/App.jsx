import './App.css'
import Visualizer from './AlgorithmVisualizer/visualizer'
import Array from './AlgorithmVisualizer/Array'
import Stack from './AlgorithmVisualizer/Stack'
import Queue from './AlgorithmVisualizer/Queue'
import LinkedList from './AlgorithmVisualizer/LinkedList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div>
   <Visualizer/>
   <Array/>
    <Stack/>
    <Queue/>
    <LinkedList/>
   </div>
    </>
  )
}

export default App
