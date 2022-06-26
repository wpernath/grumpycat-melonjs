import { Entity } from "melonjs/dist/melonjs.module.js";

class EnemyEntity extends Entity {
	/**
	 * constructor
	 */
	constructor(x, y, settings) {
		// call the parent constructor
		super(x, y, settings);
	}

	/**
	 * update the entity
	 */
	update(dt) {
		// change body force based on inputs
		//....
		// call the parent method
		return super.update(dt);
	}

	/**
	 * colision handler
	 * (called when colliding with other objects)
	 */
	onCollision(response, other) {
		// Make all other objects solid
		return true;
	}
}

export default EnemyEntity;
