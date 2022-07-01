import { Stage, game, level, TSXTileSet } from 'melonjs/dist/melonjs.module.js';
import CatEnemy from '../renderables/enemy.js';
import { SpiderEnemy } from '../renderables/spider-enemy.js';
import PlayerEntity from "../renderables/player.js";
import GlobalGameState from '../global-game-state.js';
import HUDContainer from './hud/hud-container.js';
class PlayScreen extends Stage {
    player;
    enemies= [];
    hudContainer;

    /**
     *  action to perform on state change
     */
    onResetEvent() {
        console.log("Play.OnEnter()");
        this.player = null;
        this.enemies = [];
      
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
                                let enemy=new SpiderEnemy(x, y);
                                enemy.name = "CatEnemy" + (enemynum++);
                                game.world.addChild(enemy);
                                this.enemies.push(enemy);
                                console.log("  enemy at (" + x + "/" + y + "): " + enemy);
                            }
                        }
                    }
                }

                // make sure, all enemies know the player
                this.enemies.forEach(e => e.setPlayer(this.player));
                this.hudContainer = new HUDContainer();
                game.world.addChild(this.hudContainer);

            }
        });    
    }

    onDestroyEvent() {
      console.log("Play.OnExit()");  
      game.world.removeChild(this.hudContainer);
    }
};

export default PlayScreen;
