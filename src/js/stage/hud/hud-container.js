import { Renderable, BitmapText, game, event, Container, Text, Vector2d, Renderer, renderer } from "melonjs/dist/melonjs.module.js";
import GlobalGameState from "../../global-game-state";

const FONT_SIZE = 22;

class ScoreItem extends Text {
	/**
	 *
	 * @param x
	 * @param y
	 */
	constructor(x, y) {
		super(game.viewport.width + x, y, {
			font: "Arial",
			size: FONT_SIZE,
			fillStyle: "white",
			strokeStyle: "black",
			textAlign: "right",
			lineWidth: 2,
			textBaseline: "top",
			text: "Score: 999999",
			//offScreenCanvas: true		 // this has impact on positioning
		});

		this.bold(true);
		this.relative = new Vector2d(x, y);
		this.score = -1;
		event.on(
			event.CANVAS_ONRESIZE,
			function (w, h) {
				this.pos.set(w, h, 0).add(this.relative);
			}.bind(this)
		);
	}

	/**
	 *
	 * @returns {boolean}
	 */
	update(dt) {
		if (this.score != GlobalGameState.score) {
			this.score = GlobalGameState.score;
			this.isDirty = true;
			this.setText("Score: " + this.score.toString().padStart(6, "0"));
			return true;
		}
		return false;
	}

}

class EnergyItem extends Text {
	/**
	 *
	 * @param x
	 * @param y
	 */
	constructor(x, y) {
		super(x, y, {
			font: "Arial",
			size: FONT_SIZE,
			fillStyle: "white",
			strokeStyle: "black",
			textAlign: "left",
			lineWidth: 2,
			textBaseline: "top",
			text: "Energy: 999",
			//offScreenCanvas: true		 // this has impact on positioning
		});

		this.bold(true);
		this.relative = new Vector2d(x, y);
		this.energy = -1;
		event.on(
			event.CANVAS_ONRESIZE,
			function (w, h) {
				this.pos.set(w, h, 0).add(this.relative);
			}.bind(this)
		);
	}

	/**
	 *
	 * @returns {boolean}
	 */
	update(dt) {
		if (this.energy != GlobalGameState.energy) {
			this.energy = GlobalGameState.energy;
			this.isDirty = true;
			this.setText("Energy: " + this.energy);
			return true;
		}
		return false;
	}
}

class BombItem extends Text {
	/**
	 *
	 * @param x
	 * @param y
	 */
	constructor(x, y) {
		
		super(((game.viewport.width)/2) + x, y, {
			font: "Arial",
			size: FONT_SIZE,
			fillStyle: "white",
			strokeStyle: "black",
			textAlign: "left",
			lineWidth: 2,
			textBaseline: "top",
			text: "Energy: 999",
			//offScreenCanvas: true		 // this has impact on positioning
		});
		
		this.bold(true);
		this.relative = new Vector2d(x, y);
		this.bombs = -1;

		let width = this.measureText(renderer).width;
		this.pos.x = ((game.viewport.width - width) / 2);
		event.on(
			event.CANVAS_ONRESIZE,
			function (w, h) {
				this.pos.set(w, h, 0).add(this.relative);
			}.bind(this)
		);

	}

	/**
	 *
	 * @returns {boolean}
	 */
	update(dt) {
		if (this.bombs != GlobalGameState.bombs) {
			this.bombs = GlobalGameState.bombs;
			this.isDirty = true;
			this.setText("Bombs: " + this.bombs.toString().padStart(3, "0"));
			return true;
		}
		return false;
	}

}

export default class HUDContainer extends Container {
	constructor() {
		super();

		// persistent across level change
		this.isPersistent = true;

		// make sure we use screen coordinates
		this.floating = true;

		// always on toppest
		this.z = 100;

		this.setOpacity(0.5);

		// give a name
		this.name = "HUD";

		// add our child score object at the top left corner
		this.addChild(new ScoreItem(-5, 5));
		this.addChild(new EnergyItem(5, 5));
		this.addChild(new BombItem(0,5));
	}
}
