<?php
require 'bootstrap.php';
require 'repositories/UtenteRepository.php';
require 'services/AuthService.php';

$input = getJsonInput();

if (empty($input['nome']) 
    || empty($input['email']) 
    || empty($input['password'])) {
    jsonError('Nome, email e password sono richiesti', 400);
}

try {
    $repo = new UtenteRepository($pdo);
        $service = new AuthService($repo);
    $service->registra($input['nome'], $input['email'], $input['password']);

    $utente = $repo->findByEmail($input['email']);
    $token = $jwtService->genera($utente->id, $utente->ruolo);

    jsonSuccess([
        'token' => $token,
        'utente' => $utente->toArray()
    ], 201);

} catch (InvalidArgumentException $e) {
    jsonError($e->getMessage(), 400);
} catch (RuntimeException $e) {
    jsonError($e->getMessage(), 409);
}