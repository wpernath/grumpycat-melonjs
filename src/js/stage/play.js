import { Stage, game, level, TSXTileSet } from 'melonjs/dist/melonjs.module.js';
import CatEnemy from '../renderables/cat-enemy.js';
import { SpiderEnemy } from '../renderables/spider-enemy.js';
import PlayerEntity from "../renderables/player.js";
import GlobalGameState from '../global-game-state.js';
import HUDContainer from './hud/hud-container.js';



class PlayScreen extends Stage {
    player;
    enemies= [];
    hudContainer;
    enemyEmitter = {
        isActive: false,
        emitAt: {
            x:0,
            y:0,
        },
        emitEvery: 5000, // ms
        emitTime: 5000,
        emitCount: 10
    };
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        console.log("Play.OnEnter()");
        this.player = null;
        this.enemies = [];
        this.enemyEmitter.isActive = false;

		level.load(GlobalGameState.levels[GlobalGameState.currentLevel]);
        console.log("PLAYING: " + level.getCurrentLevelId());        

        let layers = level.getCurrentLevel().getLayers();
        layers.forEach((l) => {
            console.log(l.name);
            if (l.name === "Persons") {
                console.log("  should be not visible");
                let enemynum = 0;
                for (let y = 0; y < l.height; y++) {
                    for (let x = 0; x < l.width; x++) {
                        let tile = l.cellAt(x, y);
                        if( tile !== null && tile !== undefined ) {
                            if (tile.tileId === 993 ) { // player
                                this.player = new PlayerEntity(x, y);
                                this.player.name = "Player";
                                console.log("  player at (" + x + "/" + y + "): " + this.player);
                                game.world.addChild(this.player);
                            }
                            else if (tile.tileId === 994) {
                                let enemy=new CatEnemy(x, y);
                                enemy.name = "CatEnemy" + (enemynum++);
                                game.world.addChild(enemy);
                                this.enemies.push(enemy);
                                console.log("  enemy at (" + x + "/" + y + "): " + enemy);
                            }
                            else if( tile.tileId === 995 ) {
                                // create a spider emitter, which emits up to X spiders every 
                                // 10 seconds
                                this.enemyEmitter.isActive = true;
                                this.enemyEmitter.emitAt.x = x;
                                this.enemyEmitter.emitAt.y = y;
                                this.enemyEmitter.emitCount=l.enemyNumEmitting;
                                this.enemyEmitter.emitEvery=l.enemyTimeEmitting;
                                
                                
                                //game.world.addChild(enemy);
                                //this.enemies.push(enemy);
                                console.log("  enemyEmitter at (" + x + "/" + y + "): ");
                            }
                        }
                    }
                }

                // make sure, all enemies know the player
                this.enemies.forEach(e => e.setPlayer(this.player));
                this.hudContainer = new HUDContainer(0,0);
                game.world.addChild(this.hudContainer);

            }
        });    
    }

    onDestroyEvent() {
      console.log("Play.OnExit()");  
      game.world.removeChild(this.hudContainer);
    }

    update(dt) {
        if( this.enemyEmitter.isActive && this.enemyEmitter.emitEvery <=0 && this.enemyEmitter.emitCount >0) {
            // emit a new spider
            this.enemyEmitter.emitCount--;
            this.enemyEmitter.emitEvery = this.enemyEmitter.emitTime;
            let spider = new SpiderEnemy(this.enemyEmitter.emitAt.x, this.enemyEmitter.emitAt.y);
            spider.name = "SpiderX";
            this.enemies.push(spider);
            game.world.addChild(spider);
            spider.setPlayer(this.player);
        }
        
        this.enemyEmitter.emitEvery -= dt;
        let dirty = super.update(dt);
        return dirty;
    }
};

export default PlayScreen;
