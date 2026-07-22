-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июл 22 2026 г., 19:27
-- Версия сервера: 10.4.6-MariaDB
-- Версия PHP: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `albums`
--

-- --------------------------------------------------------

--
-- Структура таблицы `albums`
--

CREATE TABLE `albums` (
  `id` int(20) NOT NULL,
  `year` varchar(90) NOT NULL,
  `name` varchar(90) NOT NULL,
  `img` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `albums`
--

INSERT INTO `albums` (`id`, `year`, `name`, `img`) VALUES
(1, '2025', 'BABY BOI', '/img/https___images.genius.com_6ac65b919ce5339d3f2707c03b8909ec.1000x1000x1 (1).jpg'),
(2, '2025', 'I AM MUSIC', '/img/S600xU.webp'),
(3, '2025', 'MUSIC — SORRY 4 DA WAIT', '/img/S600xU.webp'),
(4, '2020', 'Whole Lotta Red', '/img/orig.webp'),
(5, '2018', 'Die Lit', '/img/Die_Lit_by_Playboi_Carti.jpg'),
(6, '2017', 'Playboi Carti', '/img/800x800cc.jpg'),
(7, '2015', 'death in tune', '/img/https___images.genius.com_62f4a404267fc809a4174d11b53a46b9.499x499x1.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `merch`
--

CREATE TABLE `merch` (
  `id` int(100) NOT NULL,
  `title` varchar(90) NOT NULL,
  `price` varchar(90) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `merch`
--

INSERT INTO `merch` (`id`, `title`, `price`, `img`) VALUES
(1, '???????? Red Face', '2 900', '/img/playboicartiTS.jpeg'),
(2, '???????? All Red Premium', '3 900', '/img/people_30_manlong_front_black_552.webp'),
(3, '???????? I AM White X Supreme', '10 500', '/img/Supreme_Carti_Black_1.webp'),
(4, '???????? I AM White camouflage X Supreme', '10 500', '/img/Supreme_Carty_Tee_Military_1_.webp'),
(5, '???????? I AM White X Supreme Red', '4 200', '/img/playboicarti_red.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `posters`
--

CREATE TABLE `posters` (
  `id` int(100) NOT NULL,
  `title` varchar(90) NOT NULL,
  `price` varchar(90) NOT NULL,
  `img` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `posters`
--

INSERT INTO `posters` (`id`, `title`, `price`, `img`) VALUES
(1, '?????? Magnolia', '1200', '/img/1 (1).webp'),
(2, '?????? Playboi Carti', '1200', '/img/1 (5).webp'),
(3, '?????? Red Line Vector', '1200', '/img/1 (6).webp'),
(4, '?????? Monochrome Carti', '1100', '/img/1 (7).webp'),
(5, '?????? I AM MUSIC', '1300', '/img/1 (4).webp');

-- --------------------------------------------------------

--
-- Структура таблицы `tracks`
--

CREATE TABLE `tracks` (
  `id` int(100) NOT NULL,
  `name` varchar(90) NOT NULL,
  `img` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `tracks`
--

INSERT INTO `tracks` (`id`, `name`, `img`) VALUES
(1, 'The Weeknd, Playboi Carti - Timeless', '/img/orig (1).webp'),
(2, 'Playboi Carti, Madonna - Popular', '/img/orig (1).webp'),
(3, 'Playboi Carti - Magnolia', '/img/orig (1).webp'),
(4, 'Playboi Carti - EVIL J0RDAN', '/img/orig (1).webp'),
(5, 'Trippie Redd, Playboi Carti - Miss The Rage', '/img/orig (1).webp'),
(6, 'Playboi Carti - Sky', '/img/orig (1).webp');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `merch`
--
ALTER TABLE `merch`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
