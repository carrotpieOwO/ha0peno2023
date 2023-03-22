import './App.css';
import Nav from './components/Nav';
import Scene from './components/Scene';

function App() {
  
  return (
   <>
    <Nav />
    <div style={ {background:'linear-gradient(to right, rgb(224, 234, 252), rgb(207, 222, 243))'}}>  
      <Scene />
    </div>
    {/* <Interface/> */}
   </>
  );
}

export default App;
