import { Stage, game, level, TMXTileMap, loader, pool } from 'melonjs/dist/melonjs.module.js';

class PlayScreen extends Stage {
    currentMap;

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
                                let player = pool.pull("player", x, y);
                                console.log("  player at (" + x + "/" + y + "): " + player);
                            }
                        }
                    }
                }
            }
        });    
    }
};

export default PlayScreen;
