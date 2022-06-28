import { Stage, game, level } from 'melonjs/dist/melonjs.module.js';
import EnemyEntity from '../renderables/enemy.js';
import PlayerEntity from "../renderables/player.js";

class PlayScreen extends Stage {
    currentMap;
    player;
    enemy= [];
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        level.load("level1");
        let layers = level.getCurrentLevel().getLayers();
        layers.forEach((l) => {
            console.log(l.name);
            if (l.name === "Persons") {
                console.log("  should be not visible");
                for (let y = 0; y < l.height; y++) {
                    for (let x = 0; x < l.width; x++) {
                        let tile = l.cellAt(x, y);
                        if( tile !== null && tile !== undefined ) {
                            if (tile.tileId === 993 ) { // player
                                this.player = new PlayerEntity(x, y);
                                console.log("  player at (" + x + "/" + y + "): " + this.player);
                                game.world.addChild(this.player);
                            }
                            else if (tile.tileId === 992) {
                                let enemy=0;// = new EnemyEntity(x, y);
                                this.enemies.push(enemy);
                                console.log("  enemy at (" + x + "/" + y + "): " + enemy);
                            }
                        }
                    }
                }
            }
        });    
    }
};

export default PlayScreen;
