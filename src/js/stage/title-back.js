import { Container, Sprite, Text, game, loader, Vector2d, BitmapText, Tween } from "melonjs";


class TextScroller extends BitmapText {
    constructor(text) {
        super(0, game.viewport.height - 40, {
			font: "ArialFancy", 
			textAlign: "left", 
			fillStyle: "white",
			size: 1.5,
			text: text
		});

		this.textWidth = this.measureText().width;
        this.scrollingText = text;
        this.scrollerpos = game.viewport.width;

        this.scrollertween = new Tween(this)
            .to({ scrollerpos: -this.textWidth }, 20000)
            //.onComplete(this.repeatScrolling.bind(this)) 
			//.yoyo(true)
			.repeat(Infinity)
            .start();
    }

	repeatScrolling() {
		this.scrollerpos = game.viewport.width;
		this.scrollertween.to({ scrollerpos: -this.textWidth }, 0).onComplete(this.repeatScrolling.bind(this)).start();	}

    update(dt) {
		this.pos.x = Math.round(this.scrollerpos);
        return true;
    }

}

export default class TitleBackground extends Container {
    constructor() {
			super(0, 0, game.viewport.width, game.viewport.height);

			// persistent across level change
			this.isPersistent = true;

			// make sure we use screen coordinates
			this.floating = true;

			// always on toppest
			this.z = 10;

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
			backgroundImage.setOpacity(0.3);

			let catLeftImage = new Sprite(5, game.viewport.height - 300, {
				image: loader.getImage("grumpy_cat_right"),
				anchorPoint: new Vector2d(0, 0),
			});
			let catRightImage = new Sprite(game.viewport.width - 180, game.viewport.height - 300, {
				image: loader.getImage("grumpy_cat_left"),
				anchorPoint: new Vector2d(0, 0),
			});

			// add to the world container
			this.addChild(backgroundImage, 0);
			this.addChild(catLeftImage, 5);
			this.addChild(catRightImage, 5);

			this.addChild(
				new Text(game.viewport.width / 2 - 200, 20, {
					font: "Arial",
					size: "56",
					fillStyle: "white",
					text: "Quarkus GrumpyCat",
					textAlign: "center",
					offScreenCanvas: false,
				})
			);

			this.addChild(
				new Text(game.viewport.width / 2 - 100, 80, {
					font: "Arial",
					size: "16",
					fillStyle: "white",
					textAlign: "center",
					text: "A MelonJS client. Written by Wanja Pernath",
					offScreenCanvas: false,
				})
			);

			this.addChild( new TextScroller(
                "QUARKUS GRUMPYCAT. A GAME WRITTEN BY WANJA PERNATH, INSPIRED BY FAT CAT AND PAC MAN. THIS GAME IS USING A QUARKUS BACKEND TO LOAD AND STORE DATA FROM/TO A SERVER................................"
            ));
		}

}