import { Stage, game, level } from 'melonjs/dist/melonjs.module.js';

class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        level.load("level1");
        let layers = level.getCurrentLevel().getLayers();
        layers.forEach(l => {
            console.log(l.name);
            if( l.name === 'Persons') {
                console.log("  should be not visible");
                for( let y = 0; y < l.height; y++ ) {
                    for( let x = 0; x < l.width; x++ ) {
                        let tile = l.cellAt(x, y );
                        if( tile != 0 && tile !== undefined && tile != null ) {
                            console.log("  Tile " + tile.tileId + " at (" + x + "/" + y + ")");
                        }
                    }
                }
            }
            
        });
    }
};

export default PlayScreen;
