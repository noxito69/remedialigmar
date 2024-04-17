<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BoardController extends Controller
{
    public function show($gameId)
    {
        $game = Game::findOrFail($gameId);

        if ($game->status === 'ongoing') {
            if ($game->player1_id === Auth ::id() || $game->player2_id === Auth::id()) {
                $board = Board::where('player_id', Auth::id())->where('game_id', $gameId)->first();
                return response()->json(['board' => $board]);
            } else {
                return response()->json(['error' => 'No tienes permiso para ver este tablero'], 403);
            }
        }
        
    }
}
