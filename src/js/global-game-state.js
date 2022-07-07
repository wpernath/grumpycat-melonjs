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

	// some configs
	enemyStunnedTime: 5000, // ms
	playerInvincibleTime: 3000, // ms

	// adding score for different elements
	scoreForPills: 10,
	scoreForBombs: 50,
	scoreForMeat: 25,
	scoreForCheese: 15,
	scoreForStunningCat: 50,
	scoreForKillingSpider: 100,

	// Amount of energy to get back 
	energyForMeat: 10,
	energyForCheese: 5,

	// bombs for picking up a bomb bonus
	bombsForBombBonus: 5,

	// how much energy do you loose if
	energyLostBySpider: 15,
	energyLostByCat: 10,

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
	killedSpiders: 0,
	stunnedCats: 0,
};

export default GlobalGameState;