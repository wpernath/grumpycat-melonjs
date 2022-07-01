import { collision, Entity, level, Body, Rect } from "melonjs/dist/melonjs.module.js";
import GlobalGameState from "../global-game-state";

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
	clear() {
		this.elements={};
		this.head = 0;
		this.tail = 0;
	}
}

class EnemyEntity extends Entity {
	SPEED = 2;
	updateTime = 0;
	borderLayer;
	discoveredPlaces=[];
	player;
	nextPositionFound = false;
	stunned = false;
	mapWidth;
	mapHeight;

	nextPosition = {
		x: -1,
		y: -1,
		dx: 0,
		dy: 0
	};

	/**
	 * constructor
	 */
	constructor(x, y) {
		// call the parent constructor
		super(x * 32 - 16, y * 32 - 16, {
			width: 32,
			height: 32,
			image: "cat_left",
		});

		let layers = level.getCurrentLevel().getLayers();
		this.mapWidth = level.getCurrentLevel().cols;
		this.mapHeight= level.getCurrentLevel().rows;

		layers.forEach((l) => {
			if (l.name === "Frame") this.borderLayer = l;
		});
		// allocate an array of booleans for the path finder
		this.discoveredPlaces = new Array(this.mapHeight);

		for (let y = 0; y < this.mapHeight; y++) {
			this.discoveredPlaces[y] = new Array(this.mapWidth);
			for (let x = 0; x < this.mapWidth; x++) {
				this.discoveredPlaces[y][x] = false;
			}
		}

		this.alwaysUpdate = true;
		//this.body = new Body(this);
		this.body.addShape(new Rect(0, 0, this.width, this.height));
		this.body.ignoreGravity = true;
		this.body.collisionType = collision.types.ENEMY_OBJECT;
        this.body.setCollisionMask(collision.types.PLAYER_OBJECT | collision.types.PROJECTILE_OBJECT);

	}

	setPlayer(player) {
		this.player = player;
	}

	isWalkable(x, y) {
		let tile = this.borderLayer.cellAt(x, y);
		if( tile !== null ) return false;
		else return true;
	}

	transformPosition(x,y) {
		return {
			x: Math.floor(x / 32),
			y: Math.floor(y / 32)
		}
	}
	/**
	 * update the entity
	 */
	update(dt) {	
		this.updateTime += dt;
		if( this.updateTime < 32 ) {
			super.update(dt);
			return false;
		}
		else {
			this.updateTime = 0;
		}

		if( !this.nextPositionFound) {
			//console.log("UpdateEnemy()");
			let mouse = this.transformPosition(this.player.pos.x, this.player.pos.y);
			let mouseX = mouse.x;
			let mouseY = mouse.y;
			let cat = this.transformPosition(this.pos.x, this.pos.y);
			let catX = cat.x;
			let catY = cat.y;

			let dirs = [
				new Direction(-1, 0),
				new Direction(0, -1),
				new Direction(0, +1),
				new Direction(+1, 0),
				new Direction(-1, -1),
				new Direction(+1, +1),
				new Direction(+1, -1),
				new Direction(-1, +1),
			];

			if (!this.stunned) {
				let queue = new Queue();
				let discovered = this.discoveredPlaces;
				// prepare discovered places				
				for (let y = 0; y < this.mapHeight; y++) {
					for (let x = 0; x < this.mapWidth; x++) {
						discovered[y][x] = false;
					}
				}
				// mark the current pos as visited
				discovered[catY][catX] = true;

				queue.enqueue(new Node(catX, catY, null));
				while (!queue.isEmpty) {
					let node = queue.dequeue();

					for (let d = 0; d < dirs.length; d++) {
						let dir = dirs[d];
						let newX = node.x + dir.dx;
						let newY = node.y + dir.dy;
						let newDir = (node.initialDir == null ) ? dir : node.initialDir;

						// found mouse
						if (newX == mouseX && newY == mouseY) {
							catX = catX + newDir.dx;
							catY = catY + newDir.dy;

							this.catX = catX;
							this.catY = catY;
							if (newDir.dx < 0) this.renderable.flipX(false);
							else if (newDir.dx > 0) this.renderable.flipX(true);

							queue.clear();
							this.nextPositionFound = true;
							this.nextPosition.x = this.catX;
							this.nextPosition.y = this.catY;
							this.nextPosition.dx= newDir.dx * this.SPEED;
							this.nextPosition.dy= newDir.dy * this.SPEED;		
							break;
						}

						if( newX <0 || newX >= this.mapWidth || newY <0 || newY >= this.mapHeight) continue;

						if (this.isWalkable(newX, newY) && !discovered[newY][newX]) {
							discovered[newY][newX] = true;
							queue.enqueue(new Node(newX, newY, newDir));
						}
					}					
				}
			}
		}
		else if( this.nextPositionFound ) {
			this.pos.x += this.nextPosition.dx;
			this.pos.y += this.nextPosition.dy;

			let x = Math.floor(this.pos.x / 32);
			let y = Math.floor(this.pos.y / 32);
			if( x == this.nextPosition.x && y == this.nextPosition.y) {
				this.nextPositionFound = false;
			}
		}        
		super.update(dt);
		return true;
	}

	/**
	 * colision handler
	 * (called when colliding with other objects)
	 */
	onCollision(response, other) {
		if( other.body.collisionType === collision.types.PROJECTILE_OBJECT ) {
			console.log("colliding with: " + other.isExploding);
			if( other.isExploding ) {
				this.stunned = true;
				this.renderable.flicker(GlobalGameState.enemyStunnedTime, () => {
					this.stunned = false;
				});
			}
		}
		return false;
	}
}

export default EnemyEntity;
