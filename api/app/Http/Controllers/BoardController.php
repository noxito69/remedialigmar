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

        if ($game->status === 'ongoing' || $game->status === 'finished') {
            if ($game->player1_id === Auth ::id() || $game->player2_id === Auth::id()) {
                $board = Board::where('player_id', Auth::id())->where('game_id', $gameId)->first();
                return response()->json(['board' => $board]);
            } else {
                return response()->json(['error' => 'No tienes permiso para ver este tablero'], 403);
            }
        }
        
        
    }
    public function showOpponentBoard($gameId)
    {
        $game = Game::findOrFail($gameId);

        // Verificar si el juego está en curso o finalizado
        if ($game->status === 'ongoing' || $game->status === 'finished') {
            // Verificar si el usuario autenticado es un jugador en el juego
            if ($game->player1_id === Auth::id() || $game->player2_id === Auth::id()) {
                // Obtener el ID del oponente
                $opponentId = ($game->player1_id === Auth::id()) ? $game->player2_id : $game->player1_id;
                // Buscar el tablero del oponente
                $opponentBoard = Board::where('player_id', $opponentId)->where('game_id', $gameId)->first();
                // Retornar el tablero del oponente
                return response()->json(['board' => $opponentBoard]);
            } else {
                // El usuario autenticado no tiene permiso para ver este tablero
                return response()->json(['error' => 'No tienes permiso para ver este tablero'], 403);
            }
        } else {
            // El juego no está en curso o finalizado
            return response()->json(['error' => 'El juego no está en curso o finalizado'], 404);
        }
    }
}
