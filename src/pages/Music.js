import { useRef, useState,useEffect} from 'react';
import './Music.css';

const albums = [
  { id: 1, year: '2025', name: 'BABY BOI', img: '/img/https___images.genius.com_6ac65b919ce5339d3f2707c03b8909ec.1000x1000x1 (1).jpg' },
  { id: 2, year: '2025', name: 'I AM MUSIC', img: '/img/S600xU.webp' },
  { id: 3, year: '2025', name: 'MUSIC — SORRY 4 DA WAIT', img: '/img/S600xU.webp' },
  { id: 4, year: '2025', name: 'Whole Lotta Red', img: '/img/orig.webp' },
  { id: 5, year: '2018', name: 'Die Lit', img: '/img/Die_Lit_by_Playboi_Carti.jpg' },
  { id: 6, year: '2017', name: 'Playboi Carti', img: '/img/800x800cc.jpg' },
  { id: 7, year: '2015', name: 'death in tune', img: '/img/https___images.genius.com_62f4a404267fc809a4174d11b53a46b9.499x499x1.jpg' }
];

const tracks = [
  { id: 1, name: 'The Weeknd, Playboi Carti - Timeless', img: '/img/orig (1).webp' },
  { id: 2, name: 'The Weeknd, Playboi Carti, Madonna - Popular', img: '/img/orig (1).webp' },
  { id: 3, name: 'Playboi Carti - Magnolia', img: '/img/orig (1).webp' },
  { id: 4, name: 'Playboi Carti - EVIL J0RDAN', img: '/img/orig (1).webp' },
  { id: 5, name: 'Trippie Redd, Playboi Carti - Miss The Rage', img: '/img/orig (1).webp' },
  { id: 6, name: 'Playboi Carti - Sky', img: '/img/orig (1).webp' }
];


function Music() {
  const [offset, setOffset] = useState(0);
  const step = 300;
  const listRef = useRef(null);

  const nextSlide = () => {
    setOffset(prev => prev - step);
  };

  const prevSlide = () => {
    setOffset(prev => {
      if (prev < 0) return prev + step;
      return prev;
    });
  };

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert("Поле ввода не должно быть пустым");
      return;
    }
    if (!formData.email.includes('@')) {
      alert("Ошибка email");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert("Некорректный email-адрес");
      return;
    }
    if (formData.phone.length < 10) {
      alert("Ошибка: такого телефона не существует!");
      return;
    }
    if (!formData.date) {
      alert("Выберите дату рождения");
      return;
    }
    
    alert("Заявка отправлена!");
    setFormData({ name: '', email: '', phone: '', date: '' });
  };
   const handle = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        // Отправляем данные на твой PHP-файл
        fetch('http://localhost/login.php', {
            method: 'POST', })
        .then(res => res.text())
        .then(msg => alert(msg))
        .catch(err => console.error(err));
    };


  return (
    <div className="music-page">
      <section className="albums">
        <div className="albums__header">
          <h2 className="albums__title">ПОПУЛЯРНЫЕ АЛЬБОМЫ</h2>
          <div className="albums__controls">
            <button className="albums__btn" id="prev" onClick={prevSlide}>←</button>
            <button className="albums__btn" id="next" onClick={nextSlide}>→</button>
          </div>
        </div>
        <div className="albums__track">
          <div 
            className="albums__list" 
            ref={listRef}
            style={{ transform: `translateX(${offset}px)` }}
          >
            {albums.map(album => (
              <div key={album.id} className="album-card">
                <img src={album.img} alt={album.name} className="album-card__img" />
                <div className="album-card__info">
                  <span className="album-card__year">{album.year}</span>
                  <p className="album-card__name">{album.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tracks">
        <h2 className="tracks__title">ПОПУЛЯРНЫЕ ТРЕКИ</h2>
        <ul className="tracks__list">
          {tracks.map(track => (
            <li key={track.id} className="track">
              <img src={track.img} alt="" className="track__img" />
              <span className="track__name">{track.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container">
        <h4>Хотите получать уведомления о новых песнях?</h4>
        <form id="musicForm" onSubmit={handleSubmit}>
          <label htmlFor="name"><h2>Name</h2></label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="ФИО" 
            required 
            value={formData.name}
            onChange={handleChange}
          />
          
          <label htmlFor="email"><h2>Email</h2></label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Email" 
            required 
            value={formData.email}
            onChange={handleChange}
          />
          
          <label htmlFor="phone"><h2>Number</h2></label>
          <input 
            type="tel" 
            id="Number" 
            name="phone" 
            placeholder="Телефон" 
            required 
            value={formData.phone}
            onChange={handleChange}
          />
          
          <label htmlFor="date"><h2>День of births</h2></label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            required 
            value={formData.date}
            onChange={handleChange}
          />
          
          <button type="submit" id="submit">Подтвердить</button>
        </form>
      </section>
    </div>
  );
}

export default Music;