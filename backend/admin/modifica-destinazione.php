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
    $service->update((int) $input['id'], $input);
    jsonSuccess();
} catch (InvalidArgumentException $e) {
    jsonError($e->getMessage(), 400);
} catch (RuntimeException $e) {
    jsonError($e->getMessage(), 404);
} catch (PDOException $e) {
    jsonError('Errore nell\'aggiornamento', 500);
}