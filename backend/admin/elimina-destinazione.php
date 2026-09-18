<?php
require '../bootstrap.php';
require '../repositories/DestinazioneRepository.php';
require '../services/DestinazioneService.php';

requireAdmin();

$input = getJsonInput();

if (empty($input['id'])) {
    jsonError('ID mancante', 400);
}

try {
    $service = new DestinazioneService(new DestinazioneRepository($pdo));
    $service->delete((int) $input['id']);
    jsonSuccess();
} catch (RuntimeException $e) {
    jsonError($e->getMessage(), 404);
} catch (PDOException $e) {
    jsonError('Errore nell\'eliminazione', 500);
}