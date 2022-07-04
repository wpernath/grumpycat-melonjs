import { Stage, game, level, Container } from "melonjs/dist/melonjs.module.js";
import { ScoreItem } from "./score-item";
import { EnergyItem } from "./energy-item";
import { BombItem } from "./bomb-item";

export default class HUDContainer extends Container {
	constructor() {
		super();

		// persistent across level change
		this.isPersistent = true;

		// make sure we use screen coordinates
		this.floating = true;

		// always on toppest
		this.z = Infinity;

		this.setOpacity(0.5);

		// give a name
		this.name = "HUD";
		
		// add our child score object at the top left corner
		this.addChild(new ScoreItem(5, 5));
        this.addChild(new EnergyItem(5, 5));
        this.addChild(new BombItem(5,5));
	}
}
