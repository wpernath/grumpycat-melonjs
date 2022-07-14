import { Container, Sprite, Text, game, loader, Vector2d, BitmapText, Stage, input,event, state } from "melonjs/dist/melonjs.module.js";
import CONFIG from "../../config";
import GlobalGameState from "../global-game-state";


class GetReadyBack extends Container {
	constructor() {
		super();

		// persistent across level change
		this.isPersistent = true;

		// make sure we use screen coordinates
		this.floating = true;

		// always on toppest
		this.z = 10;

		this.setOpacity(1.0);

		// give a name
		this.name = "TitleBack";

		// a tween to animate the text
		// new sprite for the title screen, position at the center of the game viewport
		this.backgroundImage = new Sprite(game.viewport.width / 2, game.viewport.height / 2, {
			image: loader.getImage("sensa_grass"),
		});

		// scale to fit with the viewport size
		this.backgroundImage.scale(game.viewport.width / this.backgroundImage.width, game.viewport.height / this.backgroundImage.height);
		this.backgroundImage.setOpacity(0.3);

		this.catLeftImage = new Sprite(5, game.viewport.height - 300, {
			image: loader.getImage("grumpy_cat_right"),
			anchorPoint: new Vector2d(0, 0),
		});
		this.catRightImage = new Sprite(game.viewport.width - 180, game.viewport.height - 300, {
			image: loader.getImage("grumpy_cat_left"),
			anchorPoint: new Vector2d(0, 0),
		});

		this.titleText = new Sprite(86, 0, {
			image: loader.getImage("title"),
			anchorPoint: new Vector2d(0, 0),
		});

		this.subTitleText = new Text(126, 170, {
			font: "Arial",
			size: "20",
			fillStyle: "white",
			textAlign: "left",
			text: "GET READY NOW",
			offScreenCanvas: false,
		});
		
		// add to the world container
		this.addChild(this.backgroundImage, 0);
		this.addChild(this.catLeftImage, 5);
		this.addChild(this.catRightImage, 5);
		this.addChild(this.titleText, 2);

		this.addChild(this.subTitleText, 5);
	}	
}

export default class GetReadyScreen extends Stage {
	/**
	 *  action to perform on state change
	 */
	onResetEvent() {
		console.log("GetReady.OnEnter()");

		this.back = new GetReadyBack();
		game.world.addChild(this.back);

		// change to play state on press Enter or click/tap
		input.bindKey(input.KEY.ENTER, "enter", true);
		input.bindPointer(input.pointer.LEFT, input.KEY.ENTER);

		this.handler = event.on(event.KEYDOWN, function (action, keyCode, edge) {
			if (!state.isCurrent(state.READY)) return;
			console.log("GetReady.EventHandler()");
			if (action === "enter" || action === "bomb") {
				state.change(state.PLAY);
			}
			if (action === "exit") {
				state.change(state.MENU);
			}
		});
	}

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent() {
		console.log("GetReady.OnExit()");
		input.unbindKey(input.KEY.ENTER);
		input.unbindPointer(input.pointer.LEFT);
		event.off(event.KEYDOWN, this.handler);
		game.world.removeChild(this.back);
	}
}
