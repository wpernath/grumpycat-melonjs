import CONFIG from "../../config";
import GlobalGameState from "./global-game-state";
import { LevelManager } from "./level";

var networkManager = null;
export default class NetworkManager {
	static getInstance() {
		if (networkManager == null) {
			networkManager = new NetworkManager();
		}
		return networkManager;
	}

	// server settings
	readHighscoreURL = null;
	createGameURL = null;
	writeScoreURL = null;
	writePlayerMovementURL = null;
	readPlayerMovementsURL = null;
	fakeNameURL = null;

	constructor() {
		let baseURL = CONFIG.baseURL;
		this.readHighscoreURL = baseURL + "highscore/10";
		this.writeScoreURL = baseURL + "highscore";
		this.createGameURL = baseURL + "game";
		this.fakeNameURL = baseURL + "faker";
		this.writePlayerMovementURL = baseURL + "movement";
		this.readPlayerMovementsURL = baseURL + "movement/";
	}

	async readTop10Highscores() {
		let res = await fetch(this.readHighscoreURL);
		return res.json();
	}

	/**
	 * Writes a new score to the server
	 *
	 */
	async writeHighscore() {
		// store another entry in Hightscores
		let score = {
			playerId: GlobalGameState.globalServerGame.player.id,
			gameId: GlobalGameState.globalServerGame.id,
			score: GlobalGameState.score,
			level: LevelManager.getInstance().getCurrentLevelIndex() + 1,
			name: GlobalGameState.globalServerGame.player.name,
		};

		fetch(this.writeScoreURL, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(score),
		});
	}

	/**
	 * Writes a new player action to the server. A player action consists of
	 * - Movement
	 * - Barriers
	 * - Bombs
	 * - GameOver
	 * - LevelWon
	 *
	 * @param {*} action the action to write
	 */
	async writePlayerAction(action) {
		fetch(this.writePlayerMovementURL, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action),
		});
	}

	/**
	 * Create a new game on the server
	 */
	async createGameOnServer() {
		let resp = await fetch(this.fakeNameURL);
		let name = await resp.text();
		console.log("name: " + name);

		resp = await fetch(this.createGameURL + "/version");
		GlobalGameState.globalServerVersion = await resp.json();

		let req = {
			name: name,
			level: "0",
			player: {
				name: name,
			},
		};

		req = JSON.stringify(req);
		console.log(req);
		resp = await fetch(this.createGameURL, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: req,
		});

		GlobalGameState.globalServerGame = await resp.json();
		console.log("   Server API: " + JSON.stringify(GlobalGameState.globalServerVersion));
		console.log("   New game  : " + JSON.stringify(GlobalGameState.globalServerGame));
	}
}