import { Renderable, BitmapText, game } from "melonjs";
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
		this.font.textAlign = "center";
		this.font.textBaseline = "bottom";
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
		this.font.draw(renderer, "BOMBS: " + GlobalGameState.bombs, 400, game.viewport.height + this.pos.y - 4);
	}
}

