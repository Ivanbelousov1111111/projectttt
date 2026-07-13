<?php
// ===== Настройки =====
$users_file = 'users.json';
$redirect = 'register.html';

// ===== Проверяем отправку =====
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['register'])) {
  header("Location: $redirect");
  exit;
}

// ===== Забираем и чистим данные =====
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$password = $_POST['password'] ?? '';
$confirm = $_POST['confirm'] ?? '';

// ===== Валидация =====
$errors = [];

if ($name === '') {
  $errors[] = 'Введите имя';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors[] = 'Некорректный email';
}

if (strlen($password) < 6) {
  $errors[] = 'Пароль должен быть не менее 6 символов';
}

if ($password !== $confirm) {
  $errors[] = 'Пароли не совпадают';
}

// ===== Если есть ошибки =====
if (!empty($errors)) {
  echo '<h2>Ошибки:</h2><ul>';
  foreach ($errors as $e) {
    echo '<li>' . htmlspecialchars($e) . '</li>';
  }
  echo '</ul>';
  echo '<a href="' . $redirect . '">← Назад</a>';
  exit;
}

// ===== Сохраняем в JSON =====
$user = [
  'name'     => $name,
  'email'    => $email,
  'phone'    => $phone,
  'password' => password_hash($password, PASSWORD_DEFAULT),
  'created'  => date('Y-m-d H:i:s'),
];

$users = [];
if (file_exists($users_file)) {
  $json = file_get_contents($users_file);
  $users = json_decode($json, true) ?? [];
}

// Проверка на дубликат email
foreach ($users as $u) {
  if ($u['email'] === $email) {
    echo '<h2>Этот email уже зарегистрирован</h2>';
    echo '<a href="' . $redirect . '">← Назад</a>';
    exit;
  }
}

$users[] = $user;
file_put_contents($users_file, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// ===== Успех =====
echo '<h2>✅ Регистрация прошла успешно!</h2>';
echo '<p>Спасибо, ' . htmlspecialchars($name) . '!</p>';
echo '<a href="' . $redirect . '">← На главную</a>';
exit;
