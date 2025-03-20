<?php

require '../vendor/PHP-Mailer/src/PHPMailer.php';
require '../vendor/PHP-Mailer/src/SMTP.php';
require '../vendor/PHP-Mailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name = $_POST['name'] ?? '';
    $address = $_POST['address'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $message = $_POST['message'] ?? '';
    $services = $_POST['services'] ?? [];

    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'muhammadumair25591@gmail.com';
        $mail->Password = 'pyca boyl wejq bjer';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('getgroundskeeping@icloud.com', 'groundsmennc');
        $mail->addAddress('ali791ahmed@gmail.com');

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Contact Form Submission';
        $mail->Body    = "<h3>Contact Form Details</h3>
                          <p><strong>Name:</strong> $name</p>
                          <p><strong>Address:</strong> $address</p>
                          <p><strong>Email:</strong> $email</p>
                          <p><strong>Phone:</strong> $phone</p>
                          <p><strong>Message:</strong> $message</p>
                          <p><strong>Services:</strong> " . implode(', ', $services) . "</p>";

        // Send the email
        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'Form submitted successfully.']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo]);
    }
}