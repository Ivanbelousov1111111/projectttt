import React, { useState, useEffect } from 'react';
import './Merch.css';

export default function MerchPage() {
  const [tShirts, setTShirts] = useState([]);
  const [posters, setPosters] = useState([]);

  // Загружаем футболки из базы
  useEffect(() => {
    fetch('http://localhost/merch.php') // замените на ваш актуальный API-эндпоинт
      .then((res) => res.json())
      .then((data) => setTShirts(data))
      .catch((err) => console.error('Ошибка загрузки футболок:', err));
  }, []);

  // Загружаем постеры из базы
  useEffect(() => {
    fetch('http://localhost/posters.php') // замените на ваш актуальный API-эндпоинт
      .then((res) => res.json())
      .then((data) => setPosters(data))
      .catch((err) => console.error('Ошибка загрузки постеров:', err));
  }, []);

  const renderGrid = (items) => (
    <div className="products-grid">
      {items.map((item) => (
        <div key={item.id} className="product-card">
          <img src={item.img} alt={item.title} className="product-image" />
          <div className="product-title">{item.title}</div>
          <div className="product-price">{item.price}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="merch-container">
      <h2 className="section-title">ФУТБОЛКИ</h2>
      {renderGrid(tShirts)}

      <h2 className="section-title">ПОСТЕРЫ</h2>
      {renderGrid(posters)}

      <footer className="footer">
        <p>&copy;Все права защищены. 2026</p>
      </footer>
    </div>
  );
}