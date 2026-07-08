<?php
// --- НАСТРОЙКИ ПОДКЛЮЧЕНИЯ ---
// Замените эти значения на данные вашей базы данных
$host = 'localhost';      // Обычно 'localhost' или '127.0.0.1'
$dbname = 'albums'; // Имя вашей базы данных
$username = 'root';   // Имя пользователя базы данных (например, 'root')
$password = ''; // Пароль пользователя

// --- ГЛАВНАЯ ЛОГИКА СКРИПТА ---

// Устанавливаем заголовок для ответа в формате JSON
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


try {
    // 1. Создаем соединение с базой данных через PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    // Устанавливаем режим обработки ошибок в исключения
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 2. Подготавливаем и выполняем SQL-запрос
    $sql = "SELECT id, year,name,img FROM albums";
    $stmt = $pdo->query($sql);

    // 3. Получаем все результаты в виде ассоциативного массива
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 4. Проверяем, есть ли результаты
    if ($results && count($results) > 0) {
        // Если данные найдены, возвращаем их с кодом 200 (OK)
        http_response_code(200);
        echo json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    } else {
        // Если данных нет, возвращаем сообщение с кодом 404 (Not Found)
        http_response_code(404);
        echo json_encode(['message' => 'Данные не найдены']);
    }

} catch (PDOException $e) {
    // Если произошла ошибка подключения или выполнения запроса,
    // возвращаем информацию об ошибке с кодом 500 (Internal Server Error)
    http_response_code(500);
    echo json_encode([
        'error' => 'Ошибка базы данных',
        'details' => $e->getMessage() // Для отладки. В продакшене лучше не выводить детали ошибки.
    ]);
}