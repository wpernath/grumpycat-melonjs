import { Entity, game, input, Sprite, Body, collision, level, Tile, Rect, state } from 'melonjs/dist/melonjs.module.js';
import BombEntity from './bomb';
import ExplosionEntity from './explosion';
import GlobalGameState from '../global-game-state';
import { ENEMY_TYPES } from './base-enemy';
import CONFIG from '../../config';
import { LevelManager } from '../util/level';

const BARRIER_TILE = {
    light : 182,
    mid : 183,
    dark: 184
};

const BONUS_TILE = {
    bomb : 961,
    cactus : 963,
    meat : 966,
    cheese : 967
};
class PlayerEntity extends Sprite {
    SPEED=4;
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
            framewidth: 32,
            frameheight: 32,
            image: "player"
        };
        super(x*32+16, y*32+16 , settings);
        this.xInMap = x;
        this.yInMap = y;

        this.body = new Body(this);
        this.body.ignoreGravity = true;
        this.body.addShape(new Rect(0, 0, this.width, this.height));
		this.body.collisionType = collision.types.PLAYER_OBJECT;
		this.body.setCollisionMask(collision.types.ENEMY_OBJECT);

        // set the display to follow our position on both axis
        game.viewport.follow(this.pos, game.viewport.AXIS.BOTH, 0.1);

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

    async writeHighscore() {
        // store another entry in Hightscores
        let score = {
            playerId: GlobalGameState.globalServerGame.player.id,
            gameId: GlobalGameState.globalServerGame.id,
            score: GlobalGameState.score,
            level: LevelManager.getInstance().getCurrentLevelIndex() + 1,
            name: GlobalGameState.globalServerGame.player.name,
        };

        fetch(CONFIG.writeScoreURL, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(score),
        });
	}

    async writePlayerAction(action) {
        fetch(CONFIG.writePlayerMovementURL, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(action),
        });
    }

    /**
     * update the entity
     */
    update(dt) {
        let mapX = Math.floor(this.pos.x / 32);
        let mapY = Math.floor(this.pos.y / 32);
        let dx = 0,
            dy = 0;

        // this is the data to be stored on the server
        const action = {
            playerId: GlobalGameState.globalServerGame.player.id,
            gameId: GlobalGameState.globalServerGame.id,
            dx: 0,
            dy: 0,
            x: mapX,
            y: mapY,
            bombPlaced: false,
            gutterThrown: false,
            gameOver: false,
            gameWon: false,
            score: GlobalGameState.score,
            time: performance.now(),
        };

        if( input.isKeyPressed("barrier")) {
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
                let bX = mapX + dx;
                let bY = mapY + dy;
                if( this.borderLayer.cellAt(bX, bY) == null ) {
                    let newBorderId = 184;
                    let ground = this.groundLayer.cellAt(bX,bY);
                    if( ground !== null ) {
                        let gId = ground.tileId;
//                        switch(gId) {
//                            case: 
//                        }
                    }
                    let tile = this.borderLayer.getTileById(newBorderId, bX, bY);
                    this.borderLayer.setTile(tile, bX, bY);
                    GlobalGameState.placedBarriers++;

                    action.dx = dx;
                    action.dy = dy;
                    action.gutterThrown = true;

                    this.writePlayerAction(action)
                        .then(function (res) {
                            console.log("update send to server");
                        })
                        .catch(function (err) {
                            console.error(err);
                        });                    
                }
            }
        }
        else {
            if( input.isKeyPressed("bomb")) {
                if( GlobalGameState.bombs > 0 ) {
                    game.world.addChild(new BombEntity(this.pos.x, this.pos.y));   
                    GlobalGameState.usedBombs++;         
                    GlobalGameState.bombs--;
                    action.bombPlaced = true;
                }
            }
            if( input.isKeyPressed("explode")) {
                game.world.addChild(new ExplosionEntity(this.pos.x, this.pos.y));            
            }

            if (input.isKeyPressed("left")) {            
                this.flipX(true);
                dx = -this.SPEED;
            } 
            if (input.isKeyPressed("right")) {
                this.flipX(false);
                dx = +this.SPEED;
            } 
            if (input.isKeyPressed("up")) {
                dy = -this.SPEED;
            } 
            if (input.isKeyPressed("down")) {
                dy = +this.SPEED;
            }

            if ((dx != 0 || dy != 0) && this.isWalkable(this.pos.x + dx, this.pos.y + dy)) {
                this.pos.x += dx;
                this.pos.y += dy;

                action.dx = dx;
                action.dy = dy;

                let bonus = this.collectBonusTile(this.pos.x, this.pos.y);
                if( bonus !== 0 ) {
                    this.collectedBonusTiles++;
                    
                    if( bonus === BONUS_TILE.bomb ) { // bomb                        
                        GlobalGameState.bombs += GlobalGameState.bombsForBombBonus;
                        GlobalGameState.score += GlobalGameState.scoreForBombs;
                    }
                    else if( bonus === BONUS_TILE.cactus) { // cactus
                        GlobalGameState.score += GlobalGameState.scoreForPills;
                    }
                    else if( bonus === BONUS_TILE.meat) { // meat
                        GlobalGameState.energy+= GlobalGameState.energyForMeat;
                        GlobalGameState.score += GlobalGameState.scoreForMeat;
                    }
                    else if( bonus === BONUS_TILE.cheese) { // cheese
                        GlobalGameState.energy+= GlobalGameState.energyForCheese;
                        GlobalGameState.score += GlobalGameState.scoreForCheese;
                    }

                    if( this.collectedBonusTiles >= this.numberOfBonusTiles ) {
                        action.gameWon = true;
                        // level won! next level        		      	
                        this.writeHighscore()
                            .then(function() {
                                LevelManager.getInstance().next();
                                state.change(state.READY);
                            });

                    }
                }

                if (this.pos.x < 0) this.pos.x -= dx;
                if (this.pos.x > this.mapWidth * 32) this.pos.x = this.mapWidth * 32;
                if (this.pos.y < 0) this.pos.y -= dy;
                if (this.pos.y > this.mapHeight * 32) this.pos.y = this.mapHeight * 32;

                this.writePlayerAction(action)
                    .then(function (res) {
                        console.log("update send to server");
                    })
                    .catch(function (err) {
                        console.error(err);
                    });                    

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
        if( other.body.collisionType === collision.types.ENEMY_OBJECT && !other.isStunned && !other.isDead && !GlobalGameState.isGameOver) {
            if( other.enemyType === ENEMY_TYPES.cat ) {
                GlobalGameState.catchedByCats++;
                GlobalGameState.energy -= GlobalGameState.energyLostByCat;
            }
            else if( other.enemyType === ENEMY_TYPES.spider) {
                GlobalGameState.bittenBySpiders++;
                GlobalGameState.energy -= GlobalGameState.energyLostBySpider;
            }

            console.log("  energy: " + GlobalGameState.energy + "/" + 100);
            if( GlobalGameState.energy <= 0 ) {
                console.log("GAME OVER!");
                GlobalGameState.isGameOver = true;

                this.writeHighscore()
                .then(function() {
                    state.change(state.GAMEOVER);
                });                
            }
            else {
                GlobalGameState.invincible = true;
                this.flicker(GlobalGameState.playerInvincibleTime, () => {
                    GlobalGameState.invincible = false;
                });
            }
        }
        return false;
    }
};

export default PlayerEntity;
