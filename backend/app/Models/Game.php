<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'id',
        'name',
        'publisher',
        'release_date',
        'image',
        'description',
        'price',
        'features'
    ];

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }
    public function platforms()
    {
        return $this->belongsToMany(Platform::class);
    }
    use HasFactory;
}
