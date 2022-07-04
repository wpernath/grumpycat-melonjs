const CONFIG = {
	environment: "dev", // change this on deployment

	mapServerURL: "maps",
	gameServerURL: "game",
	playerMovementURL: "movement",
	enemyMovementURL: "enemy",

	local: {
		baseURL: "http://localhost:8080/",
	},
	dev: {
		baseURL: "http://grumpycat-cat-dev.apps.demo5.ocp.lan/",
	},
	test: {
		baseURL: "http://grumpycat-cat-stage.apps.demo5.ocp.lan/",
	},
};

export default CONFIG;