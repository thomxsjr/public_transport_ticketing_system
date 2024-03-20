import './App.css'
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  

  return (
    <>
    <div className="container">
      <div className="title">
        <h1>Digital Ticketing System For Public Transport</h1>   
      </div>
      <div className="button">
        <button>Sign In</button>
        <button>Sign Up</button>
      </div>
    </div>
      
    
    </>
  );
}

export default App;