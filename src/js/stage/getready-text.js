import { BitmapText, game, Tween, Renderable } from "melonjs/dist/melonjs.module.js";

export default class GetReadyText extends Renderable {
	constructor() {
		super(0, 0, game.viewport.width, game.viewport.height);

		// font for the scrolling text
		this.font = new BitmapText(0, 0, { font: "PressStart2P" });
	}

	update(dt) {
		return true;
	}

	draw(renderer) {
		this.font.textAlign = "center";
		this.font.draw(renderer, "GET READY", game.viewport.width, 400);
		this.font.draw(renderer, "PRESS ENTER TO PLAY NEXT LEVEL", game.viewport.width, game.viewport.height);
		this.font.textAlign = "left";
	}

	onDestroyEvent() {
	}
}
