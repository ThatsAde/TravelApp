<?php

require_once __DIR__ . '/../repositories/DestinazioneRepository.php';

class DestinazioneService {
    public function __construct(private DestinazioneRepository $repo) {}

    public function getAll(): array {
        return array_map(fn($d) => $d->toArray(), $this->repo->findAll());
    }

    public function create(array $dati): int {
        $this->valida($dati);
        return $this->repo->create($dati['titolo'], $dati['descrizione'], $dati['immagine'] ?? null, (int) $dati['prezzo']);
    }
    public function update(int $id, array $dati): void {
        if (!$this->repo->findById($id)) {
            throw new RuntimeException('Destinazione non trovata');
        }
        $this->valida($dati);
        $this->repo->update($id, $dati['titolo'], $dati['descrizione'], $dati['immagine'] ?? null, (int) $dati['prezzo']);
    }

    public function delete(int $id): void {
        if (!$this->repo->findById($id)) {
            throw new RuntimeException('Destinazione non trovata');
        }
        $this->repo->delete($id);
    }

    private function valida(array $dati): void { 

        if (empty($dati['titolo']) || empty($dati['descrizione']) || empty($dati['prezzo'])) {
            throw new InvalidArgumentException('Titolo, descrizione e prezzo sono richiesti'); 
        }

        if ((int) $dati['prezzo'] <= 0) {
            throw new InvalidArgumentException('Il prezzo deve essere maggiore di zero');
        }

    }
}