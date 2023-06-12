import './App.css';
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Secret from './pages/Secret'
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Signup /> }/>
        <Route path='/login' element={ <Login /> }/>
        <Route path='/secret' element={ 
          <RequireAuth>
            <Secret />
          </RequireAuth> }/>
        <Route path='/home' element={ 
          <RequireAuth>
            <Home />
          </RequireAuth>
        }/>
        <Route path='about' element={ <About /> }/>
        <Route path='*' element={ <NotFound /> }/>
      </Routes>
    </div>
  );
}

export default App;
