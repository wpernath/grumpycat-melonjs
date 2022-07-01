import { Stage, game, input, Sprite, event, state, Body, collision, level, Tile, Rect, loader } from 'melonjs/dist/melonjs.module.js';
import TitleText from './title-text';
import GlobalGameState from '../global-game-state';

class TitleScreen extends Stage {
	/**
	 *  action to perform on state change
	 */
	onResetEvent() {
		console.log("Title.OnEnter()");
		// Reset GlobalGameState
		GlobalGameState.currentLevel = 0;
		GlobalGameState.energy = 100;
		GlobalGameState.placedBarriers = 0;
		GlobalGameState.score = 0;
		GlobalGameState.bombs = 0;

		//level.load("level1");

		// new sprite for the title screen, position at the center of the game viewport
		var backgroundImage = new Sprite(game.viewport.width / 2, game.viewport.height / 2, {
			image: loader.getImage("sensa_grass"),
		});

		// scale to fit with the viewport size
		backgroundImage.scale(game.viewport.width / backgroundImage.width, game.viewport.height / backgroundImage.height);
        backgroundImage.setOpacity(0.5);

		// there currently is a bug in melonjs where me.input.pointer is null if registerPointerEvent has not been called previously
		// here we are just telling melonjs we want to use pointer events, and setting the callback to a noop
		//if (typeof input.pointer === "undefined") input.registerPointerEvent("pointerdown", null, null);

		// add to the world container
		game.world.addChild(backgroundImage, 1);
		game.world.addChild(new TitleText(), 10);

		// change to play state on press Enter or click/tap
		input.bindKey(input.KEY.ENTER, "enter", true);
		input.bindPointer(input.pointer.LEFT, input.KEY.ENTER);

		this.handler = event.on(event.KEYDOWN, function (action, keyCode, edge) {
			if (action === "enter") {
				// play something on tap / enter
				// this will unlock audio on mobile devices
				console.log("NUMBER OF LEVELS: " + level.levelCount());
                console.log("  Current Level: " + level.getCurrentLevelId());
				state.change(state.READY);
			}
		});
	}

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent() {
		console.log("Title.OnExit()");
		input.unbindKey(input.KEY.ENTER);
		input.unbindPointer(input.pointer.LEFT);
		event.off(event.KEYDOWN, this.handler);
	}
}

export default TitleScreen;
