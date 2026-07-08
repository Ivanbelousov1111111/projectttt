import { useRef, useState, useEffect } from 'react';
import './Music.css';

function Music() {
  const [offset, setOffset] = useState(0);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const step = 300;
  const listRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
       
        const albumsResponse = await fetch('http://localhost/music.php');
        if (!albumsResponse.ok) {
          throw new Error(`Ошибка загрузки альбомов: ${albumsResponse.status}`);
        }
        const albumsData = await albumsResponse.json();
        setAlbums(albumsData);

        
        const tracksResponse = await fetch('http://localhost/tracks.php');
        if (!tracksResponse.ok) {
          throw new Error(`Ошибка загрузки треков: ${tracksResponse.status}`);
        }
        const tracksData = await tracksResponse.json();
        setTracks(tracksData);
        
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError(err.message);
        
        setAlbums([
          { id: 1, year: 2023, name: 'Тестовый альбом 1', img: 'https://via.placeholder.com/150' },
          { id: 2, year: 2022, name: 'Тестовый альбом 2', img: 'https://via.placeholder.com/150' }
        ]);
        setTracks([
          { id: 1, name: 'Тестовый трек 1', img: 'https://via.placeholder.com/50' },
          { id: 2, name: 'Тестовый трек 2', img: 'https://via.placeholder.com/50' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    setOffset(prev => prev - step);
  };

  const prevSlide = () => {
    setOffset(prev => {
      if (prev < 0) return prev + step;
      return prev;
    });
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация формы
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

    try {
      const response = await fetch('http://localhost/submit.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (response.ok) {
        alert(result.message || "Заявка отправлена!");
        setFormData({ name: '', email: '', phone: '', date: '' });
      } else {
        alert(result.error || "Ошибка при отправке заявки");
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      alert("Ошибка соединения с сервером");
    }
  };

  if (loading) {
    return <div className="loading">Загрузка данных...</div>;
  }

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
              <button>◀</button>
              <button>❚❚</button>
              <button>▶</button>
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