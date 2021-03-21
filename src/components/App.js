import '../App.css';
import { Button, Menu, MenuItem } from '@material-ui/core';
import SimpleMenu from './Menu';

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
      <Matches />
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <SimpleMenu />
    </div>
  );
}

export default App;
