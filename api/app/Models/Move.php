<?php

namespace App\Models;

use Eloquent;
use Jenssegers\Mongodb\Eloquent\Model;

class Move extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'moves';
    protected $fillable = ['game_id', 'player_id', 'x_coordinate', 'y_coordinate'];

}
