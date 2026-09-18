<?php

namespace App\Http\Controllers;

use App\Models\Destinazione;
use Illuminate\Http\Request;

class DestinazioneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Destinazione::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titolo' => 'required|string|max:255',
            'descrizione' => 'required|string',
            'immagine' => 'nullable|string',
            'prezzo' => 'required|integer|min:0'
        ]);

        $destinazione = Destinazione::create($validated);

        return response()->json($destinazione, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Destinazione $destinazione)
    {
        return $destinazione;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Destinazione $destinazione)
    {
        $validated = $request->validate([
            'titolo' => 'sometimes|required|string|max:255',
            'descrizione' => 'sometimes|required|string',
            'immagine' => 'nullable|string',
            'prezzo' => 'sometimes|required|integer|min:0',
        ]);

        $destinazione->update($validated);

        return $destinazione;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Destinazione $destinazione)
    {
        $destinazione->delete();

        return response()->json(null, 204);
    }
}
