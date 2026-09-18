<?php
require '../bootstrap.php';

requireAdmin();

try {
    $stmt = $pdo->query('SELECT id, nome, email, meta, budget, messaggio, creato_il FROM richieste ORDER BY creato_il DESC');
    $richieste = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($richieste as &$r) {
        $r['id'] = (int) $r['id'];
        $r['budget'] = (int) $r['budget'];
    }

    echo json_encode($richieste);
} catch (PDOException $e) {
    jsonError('Errore nel recupero delle richieste', 500);
}