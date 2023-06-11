import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ErrorPage from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <HomePage /> }/>
        <Route path='about' element={ <AboutPage /> }/>
        <Route path='*' element={ <ErrorPage /> }/>
      </Routes>
    </div>
  );
}

export default App;
