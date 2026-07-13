import { Link } from 'react-router-dom';
import '../pages/Header.css';

function Header() {
  return (
    <header className="main-header">
      <div className="nav">
        <div className="logo">
          <span><a href='/'>Playboi</a></span>
        </div>
        <div className="navbar">
          
          <Link className="nav-item" to="/">НА ГЛАВНУЮ</Link>
          <Link className="nav-item" to="/biography">БИОГРАФИЯ</Link>
          <Link className="nav-item" to="/merch">МЕРЧ</Link>
          <Link className="nav-item" to="/music">МУЗЫКА</Link>
          <Link className="nav-item" to="/cart">КОРЗИНА</Link>
          <Link className='nav-item' to="/register"><span className='btn'>РЕГИСТРАЦИЯ</span></Link>
          <Link className='nav-item'><span className='btn'>ВОЙТИ</span></Link>
        </div>
      </div>
    </header>
  );
}

export default Header;