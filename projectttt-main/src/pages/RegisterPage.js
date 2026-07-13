import React, { useState } from 'react';
import './Register.css';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: ''
  });

  const [message, setMessage] = useState(null); // { type: 'success'|'error', text: '' }
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    // Клиентская валидация
    if (!form.name.trim() || !form.email.trim() || !form.password || !form.confirm) {
      setMessage({ type: 'error', text: 'Заполните все обязательные поля' });
      setLoading(false);
      return;
    }
    if (form.password.length < 6) {
      setMessage({ type: 'error', text: 'Пароль должен быть не менее 6 символов' });
      setLoading(false);
      return;
    }
    if (form.password !== form.confirm) {
      setMessage({ type: 'error', text: 'Пароли не совпадают' });
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append('register', '1');
      params.append('name', form.name);
      params.append('email', form.email);
      params.append('phone', form.phone);
      params.append('password', form.password);
      params.append('confirm', form.confirm);

      const res = await fetch('http://localhost/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      });

      const text = await res.text();

      if (text.includes('успеш') || text.includes('✅')) {
        setMessage({ type: 'success', text: 'Регистрация прошла успешно!' });
        setForm({ name: '', email: '', phone: '', password: '', confirm: '' });
      } else if (text.includes('Ошибки') || text.includes('уже зарегистрирован')) {
        // Достаём текст ошибки из ответа
        const match = text.match(/<li>([^<]+)<\/li>/);
        const errText = match ? match[1] : 'Ошибка при регистрации';
        setMessage({ type: 'error', text: errText });
      } else {
        setMessage({ type: 'error', text: 'Неизвестная ошибка' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Ошибка соединения с сервером' });
    }

    setLoading(false);
  };

  return (
    <div className="wrapper">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Регистрация</h1>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="field">
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Введите имя"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+7 (999) 123-45-67"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Не менее 6 символов"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <div className="field">
          <label htmlFor="confirm">Подтверждение пароля</label>
          <input
            type="password"
            id="confirm"
            name="confirm"
            placeholder="Повторите пароль"
            value={form.confirm}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Отправка…' : 'Зарегистрироваться'}
        </button>

        <p className="login-link">
          Уже есть аккаунт? <a href="/login">Войти</a>
        </p>
      </form>
    </div>
  );
}
