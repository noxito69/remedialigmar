export interface Gameplay {
    message: string,
	game_id: {
		id: number,
		player1_id: number,
		player2_id: number,
		turn: number,
		status: string
	}
}
