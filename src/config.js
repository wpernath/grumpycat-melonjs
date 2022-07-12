const CONFIG = {
	environment: "dev", // change this on deployment

	appName: "{{applicationName}}",
	appVersion: "{{applicationVersion}}",

	mapServerURL: "maps",
	gameServerURL: "game",
	playerMovementURL: "movement",
	enemyMovementURL: "enemy",

	local: {
		baseURL: "http://localhost:8080",
	},

	dev: {
		baseURL: "http://grumpycat-cat-dev.apps.demo5.ocp.lan/",
	},
	test: {
		baseURL: "http://grumpycat-cat-stage.apps.demo5.ocp.lan/",
	},

	// use this one for the quarkus engine on production systems
	// {{baseURL}} will be replaced with the corresponding 
	// ENVIRONMENT parameter, provided via ConfigMap 
	prod: {
		baseURL: "{{baseURL}}",
	},
};

export default CONFIG;