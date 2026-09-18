<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->ruolo !== 'admin') {
            return response()->json(['message' => 'Accesso riservato agli admin'], 403);
        }

        return $next($request);
    }
}