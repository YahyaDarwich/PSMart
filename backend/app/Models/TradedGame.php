<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TradedGame extends Model
{
    protected $fillable = [
        'id',
        'name',
        'publisher',
        'trade_to',
        'image',
        'description',
        'status',
        'user_id',
        'genre',
        'platform',
        'location'
    ];
    public function users()
    {
        return $this->belongsTo(User::class);
    }
    use HasFactory;
}
