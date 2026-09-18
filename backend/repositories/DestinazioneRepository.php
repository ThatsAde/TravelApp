<?php

require_once __DIR__ . '/../models/Destinazione.php';

class DestinazioneRepository {
    public function __construct(private PDO $pdo) {

    }

    public function findAll(): array {
        $stmt = $this->pdo->query('SELECT id, titolo, descrizione, immagine, prezzo FROM destinazioni ORDER BY id ASC');
        $righe = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map(fn($r) => new Destinazione(
            (int) $r['id'], $r['titolo'], $r['descrizione'], $r['immagine'], (int) $r['prezzo']
        ), $righe);
    }

    public function findById(int $id): ?Destinazione {
        $stmt = $this->pdo->prepare('SELECT id, titolo, descrizione, immagine, prezzo FROM destinazioni WHERE id = ?');
        $stmt->execute([$id]);
        $r = $stmt->fetch(PDO::FETCH_ASSOC);
        return $r ? new Destinazione((int) $r['id'], $r['titolo'], $r['descrizione'], $r['immagine'], (int) $r['prezzo']) : null;
    }

    public function create(string $titolo, string $descrizione, ?string $immagine, int $prezzo): int {
        $stmt = $this->pdo->prepare(
            'INSERT INTO destinazioni (titolo, descrizione, immagine, prezzo) VALUES (?, ?, ?, ?)'
        );
        $stmt->execute([$titolo, $descrizione, $immagine, $prezzo]);
        return (int) $this->pdo->lastInsertId();
    }

    public function update(int $id, string $titolo, string $descrizione, ?string $immagine, int $prezzo): void {
        $stmt = $this->pdo->prepare(
            'UPDATE destinazioni SET titolo = ?, descrizione = ?, immagine = ?, prezzo = ? WHERE id = ?'
        );
        $stmt->execute([$titolo, $descrizione, $immagine, $prezzo, $id]);
    }

    public function delete(int $id): void {
        $stmt = $this->pdo->prepare('DELETE FROM destinazioni WHERE id = ?');
        $stmt->execute([$id]);
    }

}