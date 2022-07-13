import { Stage, game, input, Sprite, event, state, Body, collision, level, Tile, Rect, loader, Vector2d } from 'melonjs/dist/melonjs.module.js';
import TitleBackground from './title-back';
import GlobalGameState from '../global-game-state';
import TitleMenu from './title-menu';

class TitleScreen extends Stage {
	/**
	 *  action to perform on state change
	 */
	onResetEvent() {
		console.log("Title.OnEnter()");
		// Reset GlobalGameState
		GlobalGameState.reset();
		//GlobalGameState.currentLevel = 0;
		
		if( typeof this.background === "undefined") {
			this.background = new TitleBackground();
			this.menu = new TitleMenu();
		}
		game.world.addChild(this.background);
		game.world.addChild(this.menu);
	}

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent() {
		console.log("Title.OnExit()");
		game.world.removeChild(this.background);
		game.world.removeChild(this.menu);
	}
}

export default TitleScreen;
