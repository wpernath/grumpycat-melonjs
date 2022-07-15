import { Stage, event, loader, game, state, Vector2d, Text, Container, Renderable, Rect, Sprite } from "melonjs/dist/melonjs.module.js";
import GlobalGameState from "../global-game-state";
import CONFIG from "../../config";

class HighscoreEntry extends Container {
    font;
    scoreEntry;
    nameText;
    dateText;
    scoreText;

    constructor(score, x,y, w) {
        super(x,y, w, 32);
        this.scoreEntry = score;

        this.nameFont = new Text(x, y, {
            font: "Arial",
            size: 16,
            fillStyle: "#ffffff",
            text: "@@@@",
            anchorPoint: new Vector2d(0,0)
        });

        this.dateFont = new Text(x + 200, y, {
					font: "Arial",
					size: 16,
					fillStyle: "#ffffff",
					text: this.scoreEntry.time,
					anchorPoint: new Vector2d(0, 0),
				});

        this.scoreFont = new Text(x + 350, y, {
					font: "Arial",
					size: 16,
					fillStyle: "#ffffff",
					text: this.scoreEntry.score,
                    textAlign: "left",
					anchorPoint: new Vector2d(0, 0),
				});
        
        this.fontSize = this.nameFont.measureText();
        super.setShape(x, y, w, this.fontSize.height + 16);
        this.border = new Rect(x, y, w, this.fontSize.height + 16);
        
        this.nameFont.pos.x += 8;
        this.nameFont.pos.y += 8;
        
        this.dateFont.pos.x += 30;
        this.dateFont.pos.y += 8;

        this.scoreFont.pos.x += 100;
        this.scoreFont.pos.y += 8;

        this.setName("Wanja Pernath");
        this.setTime(this.scoreEntry.time);
        this.setScore(this.scoreEntry.score);
        console.log("(" + x + ", " + y + ", " + w + ", " + (this.fontSize.height + 16) + ")");
    }


    draw(renderer) {
        renderer.setGlobalAlpha(0.5);
        renderer.setColor("#008800");
        renderer.fill(this.border);

        renderer.setGlobalAlpha(1);
        renderer.setColor("#000000");
        renderer.stroke(this.border);
        
        renderer.setColor("#ffffff");
        this.nameFont.draw(renderer, this.nameText);
        this.dateFont.draw(renderer, this.dateText);
        this.scoreFont.draw(renderer, this.scoreText);

    }

    setName(text) {
        this.nameText = text;
        this.isDirty  = true;
    }

    setTime(time) {
        this.dateText = new Date(time).toLocaleDateString();
        this.isDirty = true;
    }

    setScore(score) {
        this.scoreText = score.toString().padStart(7, "0");
        this.isDirty = true;
    }

    updateScoreEntry(score) {
        this.scoreEntry = score;
        this.setName(score.name);
        this.setTime(score.time);
        this.setScore(score.score);
    }
}

class HighscoreComponent extends Container {
	highscoreComponent = [];
	highscores = [
		{ name: "Wanja", playerId: 1, gameId: 2, score: 100000, time: new Date(Date.now()) },
		{ name: "Wanja", playerId: 1, gameId: 2, score: 90000, time: new Date(Date.now()) },
		{ name: "Wanja", playerId: 1, gameId: 2, score: 80000, time: new Date(Date.now()) },
		{ name: "Wanja", playerId: 1, gameId: 2, score: 70000, time: new Date(Date.now()) },
		{ name: "Wanja", playerId: 1, gameId: 2, score: 60000, time: new Date(Date.now()) },
		{ name: "Wanja", playerId: 1, gameId: 2, score: 50000, time: new Date(Date.now()) },
		{ name: "Wanja", playerId: 1, gameId: 2, score: 40000, time: new Date(Date.now()) },
		{ name: "Wanja", playerId: 1, gameId: 2, score: 30000, time: new Date(Date.now()) },
		{ name: "Wanja", playerId: 1, gameId: 2, score: 20000, time: new Date(Date.now()) },
		{ name: "Wanja", playerId: 1, gameId: 2, score: 10000, time: new Date(Date.now()) },
	];

	constructor() {
		super();
		// persistent across level change
		this.isPersistent = true;

		// make sure we use screen coordinates
		this.floating = true;

		// always on toppest
		this.z = 10;

		this.setOpacity(1.0);

		// give a name
		this.name = "TitleBack";

		// add elements
		this.backgroundImage = new Sprite(game.viewport.width / 2, game.viewport.height / 2, {
			image: loader.getImage("sensa_grass"),
		});

		// scale to fit with the viewport size
		this.backgroundImage.scale(game.viewport.width / this.backgroundImage.width, game.viewport.height / this.backgroundImage.height);
		this.backgroundImage.setOpacity(0.3);
		this.addChild(this.backgroundImage);

		// title and subtitle
		this.titleText = new Sprite(86, -10, {
			image: loader.getImage("title"),
			anchorPoint: new Vector2d(0, 0),
		});

		this.subTitleText = new Text(126, 160, {
			font: "Arial",
			size: "16",
			fillStyle: "white",
			textAlign: "left",
			text: "HIGHSCORES",
			offScreenCanvas: false,
		});

		this.addChild(this.titleText);
		this.addChild(this.subTitleText);

		// write the highest 10 scores
		for (let i = 0; i < this.highscores.length; i++) {
			let comp = new HighscoreEntry(this.highscores[i], 50, 250 + 42 * i, game.viewport.width - 100, 36);
			this.highscoreComponent.push(comp);
			this.addChild(comp);
		}
	}

	updateHighscores(scores) {
		if (scores == null || scores.length == 0) {
			scores = this.highscores;
		}

		for (let i = 0; i < scores.length; i++) {
			let score = scores[i];
			this.highscoreComponent[i].updateScoreEntry(score);
		}

		console.log(scores);
	}
}

export default class HighscoreScreen extends Stage {
    onResetEvent() {

        this.highscore = new HighscoreComponent();
        game.world.addChild(this.highscore);

        this.handler = event.on(event.KEYDOWN, function (action, keyCode, edge) {
            if (!state.isCurrent(state.SCORE)) return;
            if (action === "exit") {
                state.change(state.MENU);
            }
        });

        fetch(CONFIG.readHighscoreURL)
					.then((res) => res.json())
					.then((out) => this.highscore.updateHighscores(out))
					.catch((err) => console.log(err));
    }

    onDestroyEvent() {
        event.off(event.KEYDOWN, this.handler);
        game.world.removeChild(this.highscore);
    }
}