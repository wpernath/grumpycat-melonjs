import { Stage, game, input, Sprite, event, state, Body, collision, level, Tile, Rect, loader, Vector2d } from 'melonjs/dist/melonjs.module.js';
import TitleBackground from './title-back';
import GlobalGameState from '../global-game-state';
import TitleMenu from './title-menu';

export default class TitleScreen extends Stage {

	/**
	 *  action to perform on state change
	 */
	onResetEvent() {
		console.log("Title.OnEnter()");
		
		// Reset GlobalGameState
		GlobalGameState.reset();
		
		this.background = new TitleBackground();
		this.menu = new TitleMenu();
		game.world.addChild(this.background);
		game.world.addChild(this.menu);

        this.handler = event.on(event.KEYDOWN, function (action, keyCode, edge) {
			if (!state.isCurrent(state.MENU)) return;
			if (action === "pause") {
				if (!state.isPaused()) {
					state.pause();
				} else {
					state.resume();
				}
			}
			if (action === "bomb") {
				state.change(state.READY);
			}
		});
	}

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent() {
		console.log("Title.OnExit()");
		game.world.removeChild(this.background);
		game.world.removeChild(this.menu);
		event.off(event.KEYDOWN, this.handler);
		
	}
}
