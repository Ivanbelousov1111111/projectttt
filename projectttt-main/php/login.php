<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Получаем данные
    $name = trim(htmlspecialchars($_POST['name'] ?? ''));
    $email = trim(htmlspecialchars($_POST['email'] ?? ''));
    $phone = trim(htmlspecialchars($_POST['phone'] ?? ''));
    $dob = trim(htmlspecialchars($_POST['dob'] ?? ''));

    // Проверка обязательных полей
    if (!empty($name) && !empty($email)) {

        
        $data = "Имя: $name | Email: $email | Телефон: $phone | Дата: $dob" . PHP_EOL;
        file_put_contents('subscribers.txt', $data, FILE_APPEND | LOCK_EX);

        echo json_encode([
            "status" => "success",
            "message" => "Спасибо! Вы успешно подписались."
        ]);
    } else {
        
        echo json_encode([
            "status" => "error",
            "message" => "Заполните обязательные поля (Имя и Email)."
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Неверный метод запроса."
    ]);
}
?>

