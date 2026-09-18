<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Utente extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = ['nome', 'email', 'password', 'ruolo'];
    protected $hidden = ['password'];

    protected function casts(): array 
    {
        return [
            'password' => 'hashed',
        ];
    }
}
