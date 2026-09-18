<?php 

require __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtService {
    public function __construct(private string $secret) {}

    public function genera(int $userId, string $ruolo): string {
        $payload = [
            'user_id'=> $userId,
            'ruolo'=> $ruolo,
            'iat' => time(),
            'exp' => time() + 3600
        ];
        return JWT::encode($payload, $this->secret, 'HS256');
    }

    public function verifica(string $token): ?object {
        try {
            return JWT::decode($token, new Key($this->secret, 'HS256'));
        } catch (\Exception $e) {
            return null;
        }
    }
}