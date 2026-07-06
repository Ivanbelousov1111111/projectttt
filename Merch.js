import React from 'react';
import './Merch.css';

const T_SHIRTS = [
  { id: 1, title: 'Футболка Red Face', price: '3 500 ₽', img: '/img/people_30_manshort_front_black_552.webp' },
  { id: 2, title: 'Футболка All Red Premium', price: '3 900 ₽', img: '/img/people_30_manlong_front_black_552.webp' },
  { id: 3, title: 'Футболка I AM White', price: '3 500 ₽', img: '/img/Supreme_Carti_Black_1.webp' },
  { id: 4, title: 'Футболка I AM Dark Gray', price: '3 500 ₽', img: '/img/Supreme_Carty_Tee_Military_1_.webp' },
  { id: 5, title: 'Футболка Playboi Carti', price: '4 200 ₽', img: '/1 (3).webp' },
];

const POSTERS = [
  { id: 1, title: 'Постер Neon Red', price: '1 200 ₽', img: '/img/1 (1).webp' },
  { id: 2, title: 'Постер Die Lit Tracklist', price: '1 200 ₽', img: '/img/1 (5).webp' },
  { id: 3, title: 'Постер Red Line Vector', price: '1 200 ₽', img: '/img/1 (6).webp' },
  { id: 4, title: 'Постер Monochrome Carti', price: '1 200 ₽', img: '/img/1 (7).webp' },
  { id: 5, title: 'Постер Red Velvet Tour', price: '1 500 ₽', img: '/img/1 (4).webp' },
];

export default function MerchPage() {
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
      {renderGrid(T_SHIRTS)}

      <h2 className="section-title">ПОСТЕРЫ</h2>
      {renderGrid(POSTERS)}
    </div>
  );
}