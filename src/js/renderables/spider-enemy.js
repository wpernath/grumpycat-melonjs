import { collision } from "melonjs";
import { BaseEnemySprite } from "./base-enemy";
import GlobalGameState from "../global-game-state";

export class SpiderEnemy extends BaseEnemySprite {
	SPEED = 1;

	constructor(x, y) {
		super(x, y, 64, 64, "spider-red");

		this.addAnimation("stand-up", [0]);
		this.addAnimation("walk-up", [4, 5, 6, 7, 8, 9], 32);
        this.addAnimation("attack-up", [0,1,2,3], 32);

		this.addAnimation("stand-left", [10]);
		this.addAnimation("walk-left", [14, 15, 16, 17, 18, 19],32);
        this.addAnimation("attack-left", [10, 11, 12, 13],32);

		this.addAnimation("stand-down", [20]);
		this.addAnimation("walk-down", [24, 25, 26, 27, 28, 29],32);
        this.addAnimation("attack-down", [20, 21, 22, 23],32);

		this.addAnimation("stand-right", [30]);
		this.addAnimation("walk-right", [34, 35, 36, 37, 38, 39],32);
        this.addAnimation("attack-right", [30, 31, 32, 33],32);

        this.addAnimation("die", [40, 41, 42, 43],100);
        this.addAnimation("dead", [43]);
		this.setCurrentAnimation("stand-left");
	}

	update(dt) {
		if (!this.isStunned && !this.isDead) {
			if (!this.nextPositionFound) {
				this.calculateNextPosition();
			}
			if (this.nextPositionFound) {
				this.pos.x += this.nextPosition.dx;
				this.pos.y += this.nextPosition.dy;

				// change walking anim if changed
				if (this.nextPosition.last.dx != this.nextPosition.dx || this.nextPosition.last.dy != this.nextPosition.dy) {
					if (this.nextPosition.dx < 0) this.setCurrentAnimation("walk-left", "walk-left");
					else if (this.nextPosition.dx > 0) this.setCurrentAnimation("walk-right", "walk-right");

					if (this.nextPosition.dy < 0) this.setCurrentAnimation("walk-up", "walk-up");
					else if (this.nextPosition.dy > 0) this.setCurrentAnimation("walk-down", "walk-down");
				}
				let x = Math.floor(this.pos.x / 32);
				let y = Math.floor(this.pos.y / 32);
				if (x == this.nextPosition.x && y == this.nextPosition.y) {
					this.nextPositionFound = false;
				}
			} else {
				// no new position. enemy just stands still

				if (this.nextPosition.dx < 0) this.setCurrentAnimation("stand-left");
				else if (this.nextPosition.dx > 0) this.setCurrentAnimation("stand-right");

				if (this.nextPosition.dy < 0) this.setCurrentAnimation("stand-up");
				else if (this.nextPosition.dy > 0) this.setCurrentAnimation("stand-down");
			}
		}
		super.update(dt);
		return true;
	}

	onCollision(response, other) {
		if (other.body.collisionType === collision.types.PROJECTILE_OBJECT) {
			if (other.isExploding) {
				this.isStunned = true;
                this.setCurrentAnimation("die", () => {
                    this.isDead = true;
                    this.setCurrentAnimation("dead");
                })
			}
		}
        else if( other.body.collisionType === collision.types.PLAYER_OBJECT && !this.isDead && !this.isStunned) {
            if (this.nextPosition.dx < 0) this.setCurrentAnimation("attack-left", "attack-left");
            else if (this.nextPosition.dx > 0) this.setCurrentAnimation("attack-right", "attack-right");

            if (this.nextPosition.dy < 0) this.setCurrentAnimation("attack-up", "attack-up");
            else if (this.nextPosition.dy > 0) this.setCurrentAnimation("attack-down", "attack-down");
        }
		return false;
	}
}
export default SpiderEnemy;