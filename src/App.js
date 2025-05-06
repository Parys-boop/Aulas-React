import logo from './logo.png';
import './App.css';
import { BrowserRouter, Routes, Route } from
  'react-router-dom';
import Login from "./screens/Login";
import Home from "./screens/Home";
import Contact from "./screens/Contact";
import About from "./screens/About";
import NavBar from "./components/NavBar";
import Cadastrar from './screens/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Cadastrar />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        A the best hamburgueria of the world
      </p>

    </div>
  );
}

export default App;