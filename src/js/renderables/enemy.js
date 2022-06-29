import { collision, Sprite, level } from "melonjs/dist/melonjs.module.js";

class Direction {
	constructor(dx, dy) {
		this.dx = dx;
		this.dy = dy;
	}
}

class Node {
	constructor(x, y, dir) {
		this.x = x;
		this.y = y;
		this.initialDir = dir;
	}
}

class Queue {
	constructor() {
		this.elements = {};
		this.head = 0;
		this.tail = 0;
	}
	enqueue(element) {
		this.elements[this.tail] = element;
		this.tail++;
	}
	dequeue() {
		const item = this.elements[this.head];
		delete this.elements[this.head];
		this.head++;
		return item;
	}
	peek() {
		return this.elements[this.head];
	}
	get length() {
		return this.tail - this.head;
	}
	get isEmpty() {
		return this.length === 0;
	}
}

class EnemyEntity extends Sprite {
	borderLayer;
	discoveredPlaces;

	/**
	 * constructor
	 */
	constructor(x, y) {
		// call the parent constructor
		super(x * 32, y * 32, {
			width: 32,
			height: 32,
			image: "cat_left",
		});

		let layers = level.getCurrentLevel().getLayers();
		layers.forEach((l) => {
			if (l.name === "Frame") this.borderLayer = l;
		});
		// allocate an array of booleans for the path finder
		this.discovered = new Array(this.borderLayer.height);

		for (let y = 0; y < this.borderLayer.height; y++) {
			this.discovered[y] = new Array(this.borderLayer.width);
			for (let x = 0; x < this.borderLayer.width; x++) {
				this.discovered[y][x] = false;
			}
		}
	}

	isWalkable(x, y) {
		let realX = Math.floor(x / 32);
		let realY = Math.floor(y / 32);
		let tile = this.borderLayer.cellAt(realX, realY);
		if (tile !== null && tile != undefined) return false;
		else return true;
	}

	/**
	 * update the entity
	 */
	update(dt) {
        
		return super.update(dt);
	}

	/**
	 * colision handler
	 * (called when colliding with other objects)
	 */
	onCollision(response, other) {
		// Make all other objects solid
		console.log("ayaayayayay");
		return true;
	}
}

export default EnemyEntity;
