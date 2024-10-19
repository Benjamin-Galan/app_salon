<?php

namespace Controllers;

use MVC\Router;

class CitaController{
    public static function index(Router $router) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    
        $nombre = isset($_SESSION['nombre']) ? $_SESSION['nombre'] : null;
    
        $router->render('cita/index', [
            'nombre' => $nombre
        ]);
    }
    
}