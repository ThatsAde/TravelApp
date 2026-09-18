<?php
require_once __DIR__ . '/../repositories/UtenteRepository.php';

class AuthService {
    public function __construct(private UtenteRepository $repo) {}

    public function registra(string $nome, string $email, string $password): int {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new InvalidArgumentException('Email non valida');
            }
            if (strlen($password) < 8) {
                throw new InvalidArgumentException('La password deve avere almeno 8 caratteri');
            }
            if ($this->repo->emailEsiste($email)) {
                throw new RuntimeException('Email già registrata');
            }
        }
        $hash = password_hash($password, PASSWORD_DEFAULT);
        return $this->repo->crea($nome, $email, $hash);
    }

    public function login(string $email, string $password): Utente {
        $utente = $this->repo->findByEmail($email);

        if (!$utente || !password_verify($password, $utente->passwordHash)) {
            throw new RuntimeException('Credenziali non valide');
        }

        return $utente;
    }

}