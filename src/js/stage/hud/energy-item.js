import { Renderable, BitmapText, game } from "melonjs";
import GlobalGameState from "../../global-game-state";
/**
 * Code to draw the score to the HUD
 */

export class EnergyItem extends Renderable {
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
		this.font.draw(
			renderer, 
			"ENERGY: " + GlobalGameState.energy, 
			this.pos.x + 4, 
			this.pos.y +2
		);
	}
}
EnergyItem = EnergyItem;
