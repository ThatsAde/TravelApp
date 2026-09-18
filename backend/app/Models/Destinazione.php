<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destinazione extends Model
{
    protected $fillable = ['titolo', 'descrizione', 'immagine', 'prezzo'];
}
