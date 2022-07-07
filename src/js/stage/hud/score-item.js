import { Renderable, BitmapText, game } from "melonjs";
import GlobalGameState from "../../global-game-state";
/**
 * Code to draw the score to the HUD
 */

export class ScoreItem extends Renderable {
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
		let text = "Score: 999999";
		let dims = this.font.measureText(text);

		text = GlobalGameState.score.toString().padStart(6, "0");
		this.font.draw(
			renderer, "SCORE: " + text, 
			game.viewport.width + this.pos.x - dims.width, 
			this.pos.y + 2 
		);
	}
}
ScoreItem = ScoreItem;
