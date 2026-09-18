<?php

namespace App\Http\Controllers;

use App\Models\Utente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            "email"=> "required|email",
            "password"=> "required",
        ]);
    
        $utente = Utente::where("email", $request->email)->first();

        if ( ! $utente || ! Hash::check($request->password, $utente->password)) {
            return response()->json(['message' => "Credenziali non valide"], 401);
        }

        $token = $utente->createToken('api-token')->plainTextToken;

        return response()->json([
            'message'=> $utente, 
            'token' => $token
        ]);

    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message'=> 'Logout effettuato']);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email|unique:utentes,email',
            'password' => 'required|string|min:8',
        ]);

        $utente = Utente::create([
            'nome' => $validated['nome'],
            'email' => $validated['email'],
            'password' => $validated['password'], // il cast "hashed" lo cripta da solo
            'ruolo' => 'user',
        ]);

        $token = $utente->createToken('api-token')->plainTextToken;

        return response()->json(['utente' => $utente, 'token' => $token], 201);
    }

}
