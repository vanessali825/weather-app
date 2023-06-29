import './App.css';
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Secret from './pages/Secret'
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element={ <Signup /> }/>
        <Route path='/' element={ <Login /> }/>
        <Route path='/secret' element={ 
          <RequireAuth>
            <Secret />
          </RequireAuth> 
        }/>
        <Route path='/home' element={ 
          <RequireAuth>
            <Home />
          </RequireAuth>
        }/>
        <Route path='*' element={ <NotFound /> }/>
      </Routes>
      <Typography><Footer /></Typography>
    </div>
  );
}

export default App;
