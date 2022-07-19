
var networkManager = null;
export default class NetworkManager {
	static getInstance() {
		if (networkManager == null) {
			networkManager = new NetworkManager();
		}
		return networkManager;
	}

	async writeHighscore() {
		// store another entry in Hightscores
		let score = {
			playerId: GlobalGameState.globalServerGame.player.id,
			gameId: GlobalGameState.globalServerGame.id,
			score: GlobalGameState.score,
			level: LevelManager.getInstance().getCurrentLevelIndex() + 1,
			name: GlobalGameState.globalServerGame.player.name,
		};

		fetch(CONFIG.writeScoreURL, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(score),
		});
	}

	async writePlayerAction(action) {
		fetch(CONFIG.writePlayerMovementURL, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action),
		});
	}
}