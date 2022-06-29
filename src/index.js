import {
    audio,
    loader,
    state,
    device,
    video,
    utils,
    plugin,
    pool,
    input
} from 'melonjs/dist/melonjs.module.js';

import 'index.css';

import TitleScreen from 'js/stage/title.js';
import PlayScreen from 'js/stage/play.js';
import GetReadyScreen from './js/stage/get-ready';

import PlayerEntity from 'js/renderables/player.js';
import EnemyEntity from "js/renderables/enemy.js";
import BombEntity from './js/renderables/bomb';
import DataManifest from 'manifest.js';


device.onReady(() => {

    // initialize the display canvas once the device/browser is ready
    if (!video.init(1024, 768, {parent : "screen", scale : "auto"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // initialize the debug plugin in development mode.
    if (process.env.NODE_ENV === 'development') {
        import('js/plugin/debug/debugPanel.js').then((debugPlugin) => {
            // automatically register the debug panel
            utils.function.defer(plugin.register, this, debugPlugin.DebugPanelPlugin, "debugPanel");
        });

    }

    // Initialize the audio.
    audio.init("mp3,ogg");

    // allow cross-origin for image/texture loading
    //loader.setBaseURL("tmx", "http://localhost:8080/");

    loader.crossOrigin = "anonymous";

    // set and load all resources.
    loader.preload(DataManifest, function() {
        // set the user defined game stages
        state.set(state.MENU, new TitleScreen());
        state.set(state.PLAY, new PlayScreen());
        state.set(state.READY, new GetReadyScreen());

        // add our player entity in the entity pool
        pool.register("player", PlayerEntity, true);
        pool.register("enemy", EnemyEntity, false);
        pool.register("bomb", BombEntity, false);

        input.bindKey(input.KEY.LEFT, "left");
        input.bindKey(input.KEY.RIGHT, "right");
        input.bindKey(input.KEY.UP, "up");
        input.bindKey(input.KEY.DOWN, "down");
        input.bindKey(input.KEY.SPACE, "bomb");
        //input.bindKey()
        
        // Start the game.
        state.change(state.MENU);
    });
});
