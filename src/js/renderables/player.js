import { Entity, game, input, Sprite, Body, collision, level, Tile, Rect, state } from 'melonjs/dist/melonjs.module.js';
import BombEntity from './bomb';
import ExplosionEntity from './explosion';
import GlobalGameState from '../global-game-state';

class PlayerEntity extends Entity {
    SPEED=8;
    borderLayer;
    bonusLayer;
    groundLayer;
    xInMap;
    yInMap;
    mapWidth;
    mapHeight;
    collectedBonusTiles = 0;
    numberOfBonusTiles = 0;

    /**
     * constructor
     */
    constructor(x, y) {
        // call the parent constructor
        let settings = {
            width: 32,
            height: 32,
            image: "player"
        };
        super(x*32+16, y*32+16 , settings);
        this.xInMap = x;
        this.yInMap = y;

        //this.body = new Body(this);
        this.body.ignoreGravity = true;
		this.body.collisionType = collision.types.PLAYER_OBJECT;
		this.body.setCollisionMask(collision.types.ENEMY_OBJECT);

        // set the display to follow our position on both axis
        game.viewport.follow(this.pos, game.viewport.AXIS.BOTH, 0.4);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;
        this.mapHeight = level.getCurrentLevel().rows;
        this.mapWidth  = level.getCurrentLevel().cols;

        let layers = level.getCurrentLevel().getLayers();
        layers.forEach(l => {
            if(l.name === "Bonus") this.bonusLayer = l;
            else if( l.name === "Frame") this.borderLayer = l;    
            else if( l.name === "Ground") this.groundLayer = l;    
        });
        //this.body.addShape(new Rect(0,0,this.width, this.height));

        for( let x=0; x < this.mapWidth; x++) {
            for( let y=0; y < this.mapHeight; y++) {
                let tile = this.bonusLayer.cellAt(x,y);
                if( tile !== null ) this.numberOfBonusTiles++;
            }
        }
    }

    isWalkable(x, y) {
        let realX = Math.floor(x/32);
        let realY = Math.floor(y/32);
        let tile  = this.borderLayer.cellAt(realX, realY);
        if( tile !== null && tile != undefined ) return false;
        else return true;
    }

    collectBonusTile(x,y) {
        let realX = Math.floor(x / 32);
		let realY = Math.floor(y / 32);
		let tile = this.bonusLayer.cellAt(realX, realY);
		if (tile !== null && tile != undefined) {
            this.bonusLayer.clearTile(realX, realY);
            return tile.tileId;
        }
        return 0;
    }

    /**
     * update the entity
     */
    update(dt) {
        // change body force based on inputs
        let dx = 0,
            dy = 0;

        if( input.isKeyPressed("barrier")) {
            let mapX = Math.floor(this.pos.x/32);
            let mapY = Math.floor(this.pos.y/32);
            
            if( input.isKeyPressed("left")) {
                dx =-1;
            }
            else if( input.isKeyPressed("right")) {
                dx =+1;
            }
            if( input.isKeyPressed("up")) {
                dy =-1;
            }
            else if( input.isKeyPressed("down")){
                dy =+1;
            }

            if( dx != 0 || dy != 0) {
                // place a new barrier tile in borderLayer
                // only if there is no border tile at that pos
                if( this.borderLayer.cellAt(mapX+dx, mapY+dy) == null ) {
                    let tile = this.borderLayer.getTileById(184, mapX+dx, mapY+dy);
                    this.borderLayer.setTile(tile, mapX + dx, mapY+dy);
                    GlobalGameState.placedBarriers++;
                }
            }
        }
        else {
            if( input.isKeyPressed("bomb")) {
                game.world.addChild(new BombEntity(this.pos.x, this.pos.y));   
                GlobalGameState.usedBombs++;         
            }
            if( input.isKeyPressed("explode")) {
                game.world.addChild(new ExplosionEntity(this.pos.x, this.pos.y));            
            }

            if (input.isKeyPressed("left")) {            
                this.renderable.flipX(true);
                dx = -this.SPEED;
            } 
            if (input.isKeyPressed("right")) {
                this.renderable.flipX(false);
                dx = +this.SPEED;
            } 
            if (input.isKeyPressed("up")) {
                dy = -this.SPEED;
            } 
            if (input.isKeyPressed("down")) {
                dy = +this.SPEED;
            }

            if (this.isWalkable(this.pos.x + dx, this.pos.y + dy)) {
                this.pos.x += dx;
                this.pos.y += dy;

                let bonus = this.collectBonusTile(this.pos.x, this.pos.y);
                if( bonus !== 0 ) {
                    this.collectedBonusTiles++;
                    GlobalGameState.score += 10;

                    if( bonus === 961 ) {
                        console.log("  bomb collected")
                        GlobalGameState.bombs += 5;
                    }

                    if( this.collectedBonusTiles >= this.numberOfBonusTiles ) {
                        // level won! next level
        		      	GlobalGameState.currentLevel++;

						if (GlobalGameState.currentLevel >= GlobalGameState.levels.length) {
							GlobalGameState.currentLevel = 0;
						}
                        state.change(state.READY);
                    }
                }

                if (this.pos.x <= 0) this.pos.x -= dx;
                if (this.pos.x > this.mapWidth * 32) this.pos.x = this.mapWidth * 32;
                if (this.pos.y <= 0) this.pos.y -= dy;
                if (this.pos.y > this.mapHeight * 32) this.pos.y = this.mapHeight * 32;
            }
        }
        // call the parent method
        return super.update(dt);
    }

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        if( GlobalGameState.invincible ) return false;
        if( other.body.collisionType === collision.types.ENEMY_OBJECT && !other.stunned) {
            GlobalGameState.energy -= 10;
            console.log("  energy: " + GlobalGameState.energy + "/" + 100);
            if( GlobalGameState.energy <= 0 ) {
                console.log("GAME OVER!");
                state.change(state.GAMEOVER);
            }
            else {
                GlobalGameState.invincible = true;
                this.renderable.flicker(GlobalGameState.playerInvincibleTime, () => {
                    GlobalGameState.invincible = false;
                });
            }
        }
        return false;
    }
};

export default PlayerEntity;
