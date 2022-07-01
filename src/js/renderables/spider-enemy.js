import { BaseEnemySprite } from "./base-enemy";
import GlobalGameState from "../global-game-state";

export class SpiderEnemy extends BaseEnemySprite {
	SPEED = 1;
    stunned = false;

    constructor(x, y) {
        super(x, y, 64, 64, "spider-red");

        this.addAnimation("stand-up", [0]);
        this.addAnimation("walk-up", [4, 5, 6, 7, 8, 9]);

        this.addAnimation("stand-left", [10]);
        this.addAnimation("walk-left", [14, 15, 16, 17, 18, 19]);
        
        this.addAnimation("stand-down", [20]);
        this.addAnimation("walk-down", [24, 25, 26, 27, 28, 29]);

        this.addAnimation("stand-right", [30]);
        this.addAnimation("walk-right", [34, 35, 36, 37, 38, 39]);

        this.setCurrentAnimation("stand-left", () => {});
    }

    update(dt) {
        if (!this.stunned) {
            if (!this.nextPositionFound) {
                this.calculateNextPosition();
            }
            if (this.nextPositionFound) {                
                this.pos.x += this.nextPosition.dx;
                this.pos.y += this.nextPosition.dy;

                if( this.nextPosition.dx < 0 ) this.setCurrentAnimation("walk-left", "walk-left");
                else if( this.nextPosition.dx > 0 ) this.setCurrentAnimation("walk-right", "walk-right");

                if (this.nextPosition.dy < 0) this.setCurrentAnimation("walk-up", "walk-up");
                else if (this.nextPosition.dy > 0) this.setCurrentAnimation("walk-down", "walk-down");

                let x = Math.floor(this.pos.x / 32);
                let y = Math.floor(this.pos.y / 32);
                if (x == this.nextPosition.x && y == this.nextPosition.y) {
                    this.nextPositionFound = false;
                }
            }
            else {
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
}
export default SpiderEnemy;