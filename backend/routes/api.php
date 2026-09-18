<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DestinazioneController;
use App\Http\Controllers\RichiestaController;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/richieste', [RichiestaController::class, 'store']); // pubblica, form di contatto
Route::middleware(['auth:sanctum', 'admin'])->get('/richieste', [RichiestaController::class, 'index']);

// Pubbliche: chiunque può sfogliare le destinazioni
Route::get('/destinazioni', [DestinazioneController::class, 'index']);
Route::get('/destinazioni/{destinazione}', [DestinazioneController::class, 'show']);

// Protette: solo utenti loggati E con ruolo admin
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/destinazioni', [DestinazioneController::class, 'store']);
    Route::put('/destinazioni/{destinazione}', [DestinazioneController::class, 'update']);
    Route::delete('/destinazioni/{destinazione}', [DestinazioneController::class, 'destroy']);
});