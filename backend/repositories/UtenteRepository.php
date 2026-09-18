<?php 
require_once __DIR__ . '/../models/Utente.php';

class UtenteRepository {
    public function __construct(private PDO $pdo) {}

    public function findByEmail(string $email): ?Utente {
        $stmt = $this->pdo->prepare('SELECT id, nome, email, password_hash, ruolo FROM utenti WHERE email = ?');
        $stmt->execute([$email]);
        $r = $stmt->fetch(PDO::FETCH_ASSOC);
        return $r ? $this->mappa($r) : null;
    }

    public function emailEsiste(string $email): bool {
        $stmt = $this->pdo->prepare('SELECT id FROM utenti WHERE email = ?');
        $stmt->execute([$email]);
        return (bool) $stmt->fetch();
    }

    public function crea(string $nome, string $email, string $passwordHash, string $ruolo = 'utente'): int {
        $stmt = $this->pdo->prepare('INSERT INTO utenti (nome, email, password_hash, ruolo) VALUES (?, ?, ?, ?)');
        $stmt->execute([$nome, $email, $passwordHash, $ruolo]);
        return (int) $this->pdo->lastInsertId();
    }

    private function mappa(array $r): Utente {
        return new Utente((int) $r['id'], $r['nome'], $r['email'], $r['password_hash'], $r['ruolo']);
    }
    
}