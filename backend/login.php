<?php
require 'bootstrap.php';
require 'repositories/UtenteRepository.php';
require 'services/AuthService.php';

session_start();

$input = getJsonInput();

if (empty($input['email']) || empty($input['password'])) {
    jsonError('Email e password richiesti', 400);
}

try {
    $service = new AuthService(new UtenteRepository($pdo));
    $utente = $service->login($input['email'], $input['password']);

    $token = $jwtService->genera($utente->id, $utente->ruolo);

    jsonSuccess([
        'token'=> $token,
        'utente'=> $utente->toArray(),
    ]);
} catch (RuntimeException $e) {
    jsonError($e->getMessage(), 401);
}