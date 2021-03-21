import '../App.css';
import { BrowserRouter } from "react-router-dom"

function HomePage() {
  
  return (
    <div>
      <h1>Welcome to the best Dating website!!!</h1>
    </div>
  )
}

function Matches() {
  return (
    <>
      <p>Here will reside your matches!</p>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
