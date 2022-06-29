import { BitmapText, game, Tween, Renderable } from "melonjs/dist/melonjs.module.js";

export default class TitleText extends Renderable {
	constructor() {
		super(0, 0, game.viewport.width, game.viewport.height);

		// font for the scrolling text
		this.font = new BitmapText(0, 0, { font: "PressStart2P" });

		this.scroller = "QUARKUS GRUMPYCAT. A GAME WRITTEN BY WANJA PERNATH, INSPIRED BY FAT CAT AND PAC MAN. THIS GAME IS USING A QUARKUS BACKEND TO LOAD AND STORE DATA FROM/TO        ";
		this.scrollerpos = 600;

		// a tween to animate the arrow
		this.scrollertween = new Tween(this).to({ scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
	}

	// some callback for the tween objects
	scrollover() {
		// reset to default value
		this.scrollerpos = 640;
		this.scrollertween.to({ scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
	}

	update(dt) {
		return true;
	}

	draw(renderer) {
		this.font.textAlign = "center";
		this.font.draw(renderer, "PRESS ENTER TO PLAY", game.viewport.width, game.viewport.height);
		this.font.textAlign = "left";
		this.font.draw(renderer, this.scroller, this.scrollerpos, 400);
	}

	onDestroyEvent() {
		//just in case
		this.scrollertween.stop();
	}
}