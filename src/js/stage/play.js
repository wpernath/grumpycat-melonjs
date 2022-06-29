import { Stage, game, level, TSXTileSet } from 'melonjs/dist/melonjs.module.js';
import EnemyEntity from '../renderables/enemy.js';
import PlayerEntity from "../renderables/player.js";

class PlayScreen extends Stage {
    player;
    enemies= [];
    

    /**
     *  action to perform on state change
     */
    onResetEvent() {
        this.player = null;
        this.enemies = [];
        level.reload(level.getCurrentLevelId());
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
                                let enemy=new EnemyEntity(x, y);
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
            }
        });    
    }
};

export default PlayScreen;
