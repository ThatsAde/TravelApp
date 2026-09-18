<?php

namespace App\Http\Controllers;

use App\Models\Richiesta;
use Illuminate\Http\Request;

class RichiestaController extends Controller
{
    public function index()
    {
        return Richiesta::orderByDesc('creato_il')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email',
            'meta' => 'nullable|string',
            'budget' => 'nullable|integer|min:0',
            'messaggio' => 'required|string',
        ]);

        $richiesta = Richiesta::create($validated);

        return response()->json($richiesta, 201);
    }
}