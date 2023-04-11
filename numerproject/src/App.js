import './App.css';
import TestMenu, { NavbarNested } from './code/testmenu';
import Bisection from './code/rootEquation/bisection';
import FalsePosition from './code/rootEquation/falsePosition';
import OnePoint from './code/rootEquation/onepoint';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Bisection/>
        {/* <FalsePosition/> */}
        {/* <OnePoint/> */}
        {/* <TestMenu/> */}
      </header>
    </div>
  );
}

export default App;
