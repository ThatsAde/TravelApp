<?php
require '../bootstrap.php';
require '../repositories/DestinazioneRepository.php';
require '../services/DestinazioneService.php';

requireAdmin();

$input = getJsonInput();

try {
    $service = new DestinazioneService(new DestinazioneRepository($pdo));
    $id = $service->create($input);
    jsonSuccess(['id' => $id], 201);
} catch (InvalidArgumentException $e) {
    jsonError($e->getMessage(), 400);
} catch (PDOException $e) {
    jsonError("Errore nel salvataggio", 500);
}