<?php

namespace App\Http\Controllers;

use App\Events\GameFinished;
use App\Events\movimiento;
use App\Events\PlayerJoinedGame;
use App\Models\Board;
use App\Models\Game;
use App\Models\Move;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function createGame()
    {
        $pendingGame = Game::where('player1_id', auth()->id())
            ->whereIn('status', ['pending', 'ongoing'])
            ->first();

        if ($pendingGame) {
            return response()->json(['message' => 'Ya estás en una partida pendiente', 'game_id' => $pendingGame]);
        }

        $pendingGame = Game::where('player2_id', auth()->id())
            ->where('status', 'ongoing')
            ->first();

        if ($pendingGame) {
            return response()->json(['message' => 'Ya estás en una partida pendiente', 'game_id' => $pendingGame]);
        }
        $pendingGame = Game::where('status', 'pending')
            ->whereNull('player2_id')
            ->first();

        if ($pendingGame) {
            $pendingGame->player2_id = auth()->id();
            $pendingGame->status = 'ongoing';
            $pendingGame->turn = $pendingGame->player2_id;
            $pendingGame->save();

            event(new PlayerJoinedGame($pendingGame->id, auth()->id()));
            
            $board = new Board();
            $board->game_id = $pendingGame->id;
            $board->player_id = auth()->id();
            $board->board_state = json_encode($this->generateRandomBoard());
            $board->save();

            return response()->json(['message' => 'Te has unido a una partida pendiente como jugador 2', 'game_id' => $pendingGame]);
        } else {
            $newGame = new Game();
            $newGame->player1_id = auth()->id();
            $newGame->status = 'pending';
            $newGame->save();

            $board = new Board();
            $board->game_id = $newGame->id;
            $board->player_id = auth()->id();
            $board->board_state = json_encode($this->generateRandomBoard());
            $board->save();

            return response()->json(['message' => 'Has creado una nueva partida, espera a que alguien se una', 'tablero' => $newGame]);
        }
    }




    public function makeMove(Request $request, $gameId)
    {
        $game = Game::findOrFail($gameId);

        if ($game->status == 'finished') {
            return response()->json(['error' => 'El juego ha finalizado'], 400);
        }

        if ($game->turn != auth()->id()) {
            return response()->json(['error' => 'No es tu turno'], 403);
        }


        $opponentId = ($game->player1_id == auth()->id()) ? $game->player2_id : $game->player1_id;

        $opponentBoard = Board::where('player_id', $opponentId)->where('game_id', $gameId)
            ->first();

        if (!$opponentBoard) {
            return response()->json(['error' => 'No se encontró el tablero del oponente', 'oponente' => $opponentId, $opponentBoard], 400);
        }

        $boardState = json_decode($opponentBoard->board_state, true);

        $x = $request->input('x');
        $y = $request->input('y');

        if (!isset($boardState[$x][$y])) {
            return response()->json(['error' => 'Coordenadas inválidas'], 400);
        }

        $cellState = $boardState[$x][$y];
        if ($cellState == 'F' || $cellState == 'K') {
            return response()->json(['error' => 'Celda ya atacada'], 400);
        }

        if ($this->hitShip($boardState, $x, $y)) {
            $boardState[$x][$y] = 'K';
            $message = '¡Has golpeado un barco!';
        } else {
            $boardState[$x][$y] = 'F';
            $message = 'Solo hay agua en esta posición.';

            $game->turn = ($game->turn == $game->player1_id) ? $game->player2_id : $game->player1_id;
            $game->save();
        }

        $opponentBoard->board_state = json_encode($boardState);
        $opponentBoard->save();

        $move = new Move();
        $move->game_id = $game->id;
        $move->player_id = auth()->id();
        $move->x_coordinate = $x;
        $move->y_coordinate = $y;
        $move->save();

        event(new movimiento(['gameId' => $gameId, 'playerId' => auth()->id(), 'x' => $x, 'y' => $y]));


        if ($this->allShipsSunk($boardState)) {
            $game->status = 'finished';
            $game->save();

            $winner = $game->turn;
            $loser = ($winner == $game->player1_id) ? $game->player2_id : $game->player1_id;

            event(new GameFinished($game->id, $winner));

            if ($winner == auth()->id()) {
                $winMessage = '¡Felicidades! Has hundido todos los barcos del oponente. ¡Has ganado!';
                $loseMessage = '¡El oponente ha hundido todos tus barcos! ¡Has perdido!';
            } else {
                $winMessage = '¡El oponente ha hundido todos tus barcos! ¡Has perdido!';
                $loseMessage = '¡Felicidades! Has hundido todos los barcos del oponente. ¡Has ganado!';
            }

            return response()->json(['message' => $winMessage, 'winner' => $winner, 'loser' => $loser]);

        }

        return response()->json(['message' => $message]);
    }

    private function generateRandomBoard()
    {
        $rows = 8;
        $cols = 5;

        $boardState = [];
        for ($i = 0; $i < $rows; $i++) {
            for ($j = 0; $j < $cols; $j++) {
                $boardState[$i][$j] = 'A';
            }
        }
        $numShips = 2;
        for ($s = 0; $s < $numShips; $s++) {
            $x = rand(0, $rows - 1);
            $y = rand(0, $cols - 1);

            if ($boardState[$x][$y] === 'A') {
                $boardState[$x][$y] = 'B';
            } else {
                $s--;
            }
        }

        return $boardState;
    }

    private function hitShip($boardState, $x, $y)
    {
        return $boardState[$x][$y] === 'B';
    }

    private function allShipsSunk($boardState)
    {
        foreach ($boardState as $row) {
            foreach ($row as $cell) {
                if ($cell === 'B') {
                    return false;
                }
            }
        }
        return true;
    }

    public function HistorialJuegos()
    {
        $user = auth()->id();

        $games = Game::where('status', 'finished')
            ->where(function ($query) use ($user) {
                $query->where('player1_id', $user)
                    ->orWhere('player2_id', $user);
            })
            ->get();

        if ($games->isEmpty()) {
            return response()->json(['message' => 'No tienes partidas jugadas']);
        }

        return response()->json(['partidas' => $games]);
    }
}
