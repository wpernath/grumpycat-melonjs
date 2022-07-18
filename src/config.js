const CONFIG = {
	environment: "prod", // change this TO PROD on deployment

	appName: "{{applicationName}}",
	appVersion: "{{applicationVersion}}",

	baseURL: "",

	// server settings
	readHighscoreURL: null,
	createGameURL: null,
	writeScoreURL: null,
	writePlayerMovementURL: null,
	readPlayerMovementsURL: null,
	fakeNameURL: null,

	local: {
		baseURL: "http://localhost:8080/",
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