<?php
class Utente {
    public function __construct(
        public int $id,
        public string $nome,
        public string $email,
        public string $passwordHash,
        public string $ruolo
    ) {}

    public function toArray(): array {
        return [
            "id"=> $this->id,
            "nome"=> $this->nome,
            "email"=> $this->email,
            "ruolo" => $this->ruolo
        ];
    }
}