<?php 

require 'bootstrap.php';
require 'repositories/DestinazioneRepository.php';
require 'services/DestinazioneService.php';

try {
    $service = new DestinazioneService(new DestinazioneRepository($pdo));
    echo json_encode($service->getAll());
} catch (PDOException $e) {
    jsonError('Errore nel recupero delle destinazioni', 500);
}