import { Stage, game, input, Sprite, event, state, Body, collision, level, Tile, Rect, loader } from "melonjs/dist/melonjs.module.js";
import GameOverText from "./gameover-text";

class GameOverScreen extends Stage {
	
	/**
	 *  action to perform on state change
	 */
	onResetEvent() {
		console.log("GameOver.OnEnter()");
		// new sprite for the title screen, position at the center of the game viewport
		var backgroundImage = new Sprite(game.viewport.width / 2, game.viewport.height / 2, {
			image: loader.getImage("sensa_nee"),
		});

		// scale to fit with the viewport size
		backgroundImage.setOpacity(0.5);

		// there currently is a bug in melonjs where me.input.pointer is null if registerPointerEvent has not been called previously
		// here we are just telling melonjs we want to use pointer events, and setting the callback to a noop
		//if (typeof input.pointer === "undefined") input.registerPointerEvent("pointerdown", null, null);

		// add to the world container
		game.world.addChild(backgroundImage, 1);
		game.world.addChild(new GameOverText(), 10);

		// change to play state on press Enter or click/tap
		input.bindKey(input.KEY.ENTER, "enter", true);
		input.bindPointer(input.pointer.LEFT, input.KEY.ENTER);

		this.handler = event.on(event.KEYDOWN, function (action, keyCode, edge) {
			if (!state.isCurrent(state.GAMEOVER)) return;
			console.log("GameOver.EventHandler()");
			if (action === "enter" || action === "bomb") {
				state.change(state.MENU);
			}
			if( action === "exit") {
				state.change(state.MENU);
			}
		});
	}

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent() {
		console.log("GameOver.OnExit()");
		input.unbindKey(input.KEY.ENTER);
		input.unbindPointer(input.pointer.LEFT);
		event.off(event.KEYDOWN, this.handler);
	}
}

export default GameOverScreen;
