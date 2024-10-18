<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email
{
    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion()
    {
        $mail = new PHPMailer();

        $mail = new PHPMailer();
        $mail->isSMTP();

        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = 'fe8eb8959bf245';
        $mail->Password = '339ff5b1312954';

        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');
        $mail->Subject = 'Confirma tu cuenta';

        // Set html 
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
            line-height: 1.5;
        }
        a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class='container'>
        <p><strong>Hola " . htmlspecialchars($this->email) . "</strong>, has creado tu cuenta en AppSalon, 
        solo debes confirmarla presionando el siguiente enlace:</p>
        <p>Presiona aquí: <a href='http://localhost:3000/confirmar-cuenta?token="
            . htmlspecialchars($this->token) . "'>Confirmar cuenta</a></p>
        <p>Si tú no solicitaste esta cuenta, puedes ignorar el mensaje.</p>
    </div>
</body>
</html>";

        $mail->Body = $contenido;


        //Enviar el email
        $mail->send();
    }

    public function enviarInstrucciones(){
        $mail = new PHPMailer();

        $mail = new PHPMailer();
        $mail->isSMTP();

        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = 'fe8eb8959bf245';
        $mail->Password = '339ff5b1312954';

        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');
        $mail->Subject = 'Reestablece tu contraseña';

        // Set html 
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
            line-height: 1.5;
        }
        a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class='container'>
        <p><strong>Hola " . htmlspecialchars($this->nombre) . "</strong>. Has solicitado reestablecer tu contraseña,
        sigue el siguiente enlace para hacerlo:</p>
        <p>Presiona aquí: <a href='http://localhost:3000/recuperar?token="
            . htmlspecialchars($this->token) . "'>Reestablecer contraseña</a></p>
        <p>Si tú no solicitaste esta cuenta, puedes ignorar el mensaje.</p>
    </div>
</body>
</html>";

        $mail->Body = $contenido;


        //Enviar el email
        $mail->send();
    }
}
