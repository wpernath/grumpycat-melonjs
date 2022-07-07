import { Renderable, BitmapText, game, video } from "melonjs";
import GlobalGameState from "../../global-game-state";
/**
 * Code to draw the score to the HUD
 */

export class BombItem extends Renderable {
	/**
	 *
	 * @param x
	 * @param y
	 */
	constructor(x, y) {
		super(x, y, 10, 10);

		// create the font object
		this.font = new BitmapText(0, 0, { font: "PressStart2P" });

		// font alignment to right, bottom
		this.font.textAlign = "left";
		this.font.textBaseline = "top";

	}

	/**
	 *
	 * @returns {boolean}
	 */
	update() {
		return true;
	}

	/**
	 * draw the score
	 */
	draw(renderer) {
		let text = "BOMBS: @@@";
		let dims = this.font.measureText(text);
		this.font.draw(
			renderer, 
			"BOMBS: " + GlobalGameState.bombs, 
			(game.viewport.width - dims.width)/2, 
			this.pos.y +2
		);
	}
}

