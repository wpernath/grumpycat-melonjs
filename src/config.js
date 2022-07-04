const CONFIG = {
	environment: "local", // change this on deployment

	appName: "{{applicationName}}",
	appVersion: "{{applicationVersion}}",
	
	mapServerURL: "maps",
	gameServerURL: "game",
	playerMovementURL: "movement",
	enemyMovementURL: "enemy",

	local: {
		baseURL: "{{baseURL}}",
	},
	dev: {
		baseURL: "http://grumpycat-cat-dev.apps.demo5.ocp.lan/",
	},
	test: {
		baseURL: "http://grumpycat-cat-stage.apps.demo5.ocp.lan/",
	},
};

export default CONFIG;