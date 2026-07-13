import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import Biography from './pages/Biography.js';
import Music from './pages/Music.js';
import Merch from './pages/Merch.js';
import Cart from './pages/Cart.js';
import './App.css';
import RegisterPage from './pages/RegisterPage.js';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/biography" element={<Biography />} />
            <Route path="/music" element={<Music />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='register' element={<RegisterPage/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;