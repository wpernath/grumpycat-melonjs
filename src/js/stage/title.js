import { Stage, game, input, Sprite, event, state, Body, collision, level, Tile, Rect, loader, Vector2d } from 'melonjs/dist/melonjs.module.js';
import TitleBackground from './title-back';
import GlobalGameState from '../global-game-state';

class TitleScreen extends Stage {
	/**
	 *  action to perform on state change
	 */
	onResetEvent() {
		console.log("Title.OnEnter()");
		// Reset GlobalGameState
		GlobalGameState.reset();
		//GlobalGameState.currentLevel = 0;
		

		// there currently is a bug in melonjs where me.input.pointer is null if registerPointerEvent has not been called previously
		// here we are just telling melonjs we want to use pointer events, and setting the callback to a noop
		if (typeof input.pointer === "undefined") input.registerPointerEvent("pointerdown", null, null);


		if( typeof this.background === "undefined") {
			this.background = new TitleBackground();
		}
		game.world.addChild(this.background);

		// change to play state on press Enter or click/tap
		input.bindKey(input.KEY.ENTER, "enter", true);
		input.bindPointer(input.pointer.LEFT, input.KEY.ENTER);

		this.handler = event.on(event.KEYDOWN, function (action, keyCode, edge) {
			if( !state.isCurrent( state.MENU )) return;
			console.log("Title.EventHandler()");
			if (action === "enter" || action === 'bomb') {
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
