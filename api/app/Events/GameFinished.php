<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GameFinished implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $gameId;

    /**
     * The ID of the winning player.
     *
     * @var int
     */
    public $winnerId;

    /**
     * Create a new event instance.
     *
     * @param int $gameId
     * @param int $winnerId
     * @return void
     */
    public function __construct($gameId, $winnerId)
    {
        $this->gameId = $gameId;
        $this->winnerId = $winnerId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('FinishGame');
    }
}
