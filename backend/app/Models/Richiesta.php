<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Richiesta extends Model
{
    public $timestamps = false; // usiamo creato_il invece di created_at/updated_at
    protected $fillable = ['nome', 'email', 'meta', 'budget', 'messaggio'];
}
