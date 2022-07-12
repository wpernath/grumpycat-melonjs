import { Container, Sprite, Text, game, loader, Vector2d, BitmapText, Tween } from "melonjs";


class TextScroller extends BitmapText {
    constructor(text) {
        super(game.viewport.width, game.viewport.height, {font: "PressStart2P", textAlign: "left", fillStyle: "white"});
        this.scroller = text;
        this.scrollerpos = game.viewport.width;

        this.scrollertween = new Tween(this)
            .to({ scrollerpos: -10000, repeat: 1000 }, 10000)
            .onComplete(() => {
                this.scrollerpos = game.viewport.width;
            })
            .start();
    }

    update(dt) {
        return true;
    }

    draw(renderer) {
        console.log("draw(" + this.scrollerpos, + ", " + (this.pos.y + 40));
		super.draw(renderer, this.scroller, this.scrollerpos, game.viewport.height - 40);
    }
}

export default class TitleBackground extends Container {
    constructor() {
			super();

			// persistent across level change
			this.isPersistent = true;

			// make sure we use screen coordinates
			this.floating = true;

			// always on toppest
			this.z = 100;

			this.setOpacity(1.0);

			// give a name
			this.name = "TitleBack";

			// a tween to animate the text
			// new sprite for the title screen, position at the center of the game viewport
			let backgroundImage = new Sprite(game.viewport.width / 2, game.viewport.height / 2, {
				image: loader.getImage("sensa_grass"),
			});

			// scale to fit with the viewport size
			backgroundImage.scale(game.viewport.width / backgroundImage.width, game.viewport.height / backgroundImage.height);
			backgroundImage.setOpacity(0.25);

			let catLeftImage = new Sprite(5, game.viewport.height - 300, {
				image: loader.getImage("grumpy_cat_right"),
				anchorPoint: new Vector2d(0, 0),
			});
			let catRightImage = new Sprite(game.viewport.width - 180, game.viewport.height - 300, {
				image: loader.getImage("grumpy_cat_left"),
				anchorPoint: new Vector2d(0, 0),
			});

			// add to the world container
			game.world.addChild(backgroundImage, 0);
			game.world.addChild(catLeftImage, 5);
			game.world.addChild(catRightImage, 5);

			game.world.addChild(
				new Text(game.viewport.width / 2 - 200, 20, {
					font: "Arial",
					size: "56",
					fillStyle: "white",
					text: "Quarkus GrumpyCat",
					textAlign: "center",
					offScreenCanvas: true,
				})
			);

			game.world.addChild(
				new Text(game.viewport.width / 2 - 100, 80, {
					font: "Arial",
					size: "16",
					fillStyle: "white",
					textAlign: "center",
					text: "A MelonJS client. Written by Wanja Pernath",
					offScreenCanvas: true,
				})
			);

			game.world.addChild( new TextScroller(
                "QUARKUS GRUMPYCAT. A GAME WRITTEN BY WANJA PERNATH, INSPIRED BY FAT CAT AND PAC MAN. THIS GAME IS USING A QUARKUS BACKEND TO LOAD AND STORE DATA FROM/TO A SERVER.                                                           "
            ));
		}

}