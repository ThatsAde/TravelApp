<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dbConfig = require __DIR__ .'/config.php';

require_once __DIR__ .'/services/JwtService.php';

$jwtService = new JwtService($dbConfig['jwt_secret']);

try {
    $pdo = new PDO(
        "mysql:host={$dbConfig['host']};dbname={$dbConfig['dbname']};charset=utf8mb4",
        $dbConfig['user'],
        $dbConfig['pass']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    jsonError('Connessione al database fallita', 500);
}

function jsonError(string $message, int $code = 400): never {
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit;
}

function jsonSuccess(array $data = [], int $code = 200): never {
    http_response_code($code);
    echo json_encode(array_merge(['success' => true], $data));
    exit;
}

function getJsonInput(): array {
    $input = json_decode(file_get_contents('php://input'), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        jsonError('JSON non valido nel body della richiesta', 400);
    }
    return $input ?? [];
}

function checkRateLimit(PDO $pdo, string $endpoint, int $maxRichieste = 5, int $finestreSecondi = 60): void {
    $chiave = $endpoint . '_' . $_SERVER['REMOTE_ADDR'];

    $pdo->prepare('DELETE FROM rate_limits WHERE chiave = ? AND creato_il < (NOW() - INTERVAL ? SECOND)')
        ->execute([$chiave, $finestreSecondi]);
    
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM rate_limits WHERE chiave = ?');
    $stmt->execute([$chiave]);
    $conteggio = (int) $stmt->fetchColumn();

    if ($conteggio >= $maxRichieste) {
        jsonError('Troppe richieste, riprova tra un minuto', 429);
    }

    $pdo->prepare('INSERT INTO rate_limits (chiave) VALUES (?)')->execute([$chiave]);
}

function getBearerToken(): ?string {
    $authHeader = null;

    if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    }
    elseif (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    }
    elseif (function_exists('getallheaders')) {
        $headers = getallheaders();
        if (!empty($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
        }
    }

    if ($authHeader && str_starts_with($authHeader, 'Bearer ')) {
        return substr($authHeader, 7);
    }

    return null;

}

function requireAuth(): object {
    global $jwtService;
    $token = getBearerToken();

    if (!$token) {
        jsonError('Token Mancante',0);
    }

    $payload = $jwtService->verifica($token);
    if (!$payload) {
        jsonError('Token non valido o scaduto', 401);
    }

    return $payload;
}

function requireAdmin(): object {
    $payload = requireAuth();
    if ($payload->ruolo !== 'admin') {
        jsonError('Accesso riservato agli amministratori', 403);
    }
    return $payload;
}