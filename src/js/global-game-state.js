const GlobalGameState = {
	// engine state
	currentLevel: 0,
	levels: [
		// GUIDs from manifest.js
		"level1",
		"level2",
		"level3",
		"level4",
		"level5",
	],
	enemyStunnedTime: 5000, // ms
	playerInvincibleTime: 3000, // ms

	// player state
	energy: 100,
	score: 0,
	bombs: 0,
	invincible: false,

  // statistics
	placedBarriers: 0,
	usedBombs: 0,
  bittenBySpiders : 0,
  catchedByCats : 0,
};

export default GlobalGameState;