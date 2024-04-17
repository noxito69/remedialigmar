<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class BoardMongo extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'boards';

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

    public function getCellState($x, $y)
    {
        return $this->board_state[$x][$y];
    }

    public function setCellState($x, $y, $state)
    {
        $this->board_state[$x][$y] = $state;
        $this->save();
    }
}
