<?php
require 'bootstrap.php';

checkRateLimit($pdo, 'richiesta_preventivo', maxRichieste: 5, finestreSecondi: 60);

$input = getJsonInput();

if (
    empty($input['nome']) ||
    empty($input['email']) ||
    empty($input['meta']) ||
    empty($input['budget']) ||
    !filter_var($input['email'], FILTER_VALIDATE_EMAIL)
) {
    jsonError('Dati mancanti o non validi', 400);
}

try {
    $stmt = $pdo->prepare(
        'INSERT INTO richieste (nome, email, meta, budget, messaggio) VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $input['nome'],
        $input['email'],
        $input['meta'],
        (int) $input['budget'],
        $input['messaggio'] ?? null
    ]);

    jsonSuccess(['id' => $pdo->lastInsertId()], 201);

} catch (PDOException $e) {
    jsonError('Errore nel salvataggio della richiesta', 500);
}