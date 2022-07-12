import { BitmapText, game, Tween, Renderable } from "melonjs/dist/melonjs.module.js";

export default class TitleText extends Renderable {
	constructor() {
		super(0, 0, game.viewport.width, game.viewport.height);

		// font for the scrolling text
		this.font = new BitmapText(0, 0, { font: "PressStart2P" });

		this.scroller = "QUARKUS GRUMPYCAT. A GAME WRITTEN BY WANJA PERNATH, INSPIRED BY FAT CAT AND PAC MAN. THIS GAME IS USING A QUARKUS BACKEND TO LOAD AND STORE DATA FROM/TO A SERVER.                                                           ";
		this.scrollerpos = game.viewport.width;

		// a tween to animate the text
		this.scrollertween = new Tween(this).to({ scrollerpos: -10000 }, 10000).onComplete(this.scrollover.bind(this)).start();
	}

	// some callback for the tween objects
	scrollover() {
		// reset to default value
		this.scrollerpos = game.viewport.width;
		this.scrollertween.to({ scrollerpos: -10000 }, 10000).onComplete(this.scrollover.bind(this)).start();
	}

	update(dt) {
		return true;
	}

	draw(renderer) {
		this.font.textAlign = "center";
		this.font.draw(renderer, "PRESS ENTER TO PLAY", game.viewport.width, game.viewport.height);
		this.font.textAlign = "left";
		this.font.draw(renderer, this.scroller, this.scrollerpos, game.viewport.height - 40);
	}

	onDestroyEvent() {
		this.scrollertween.stop();
	}
}
