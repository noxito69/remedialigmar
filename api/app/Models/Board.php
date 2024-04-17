<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use HasFactory;
    protected $fillable = [
        'game_id', 'player_id', 'board_state',
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function player()
    {
        return $this->belongsTo(User::class, 'player_id');
    }

    public function getBoardStateAttribute($value)
    {
        return json_decode($value, true);
    }

    public function setBoardStateAttribute($value)
    {
        $this->attributes['board_state'] = json_encode($value);
    }
}
