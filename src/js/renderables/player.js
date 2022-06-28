import { Entity, game, input, Sprite, Body } from 'melonjs/dist/melonjs.module.js';


class PlayerEntity extends Entity {

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
        super(x*32, y*32 , settings);

        this.body.setMaxVelocity(3, 3);
        this.body.setFriction(0, 0);
        this.body.ignoreGravity = true;

        //this.body.
        // set the display to follow our position on both axis
        game.viewport.follow(this.pos, game.viewport.AXIS.BOTH, 0.4);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;
        this.alive = true;

    }

    /**
     * update the entity
     */
    update(dt) {
        // change body force based on inputs
        this.body.force.x = 0;
        this.body.force.y = 0;
        if (input.isKeyPressed("left")) {
            console.log("left pressed");
            this.renderable.flipX(true);
            this.pos.x -= 16;
            if(this.pos.x <= 0 ) this.pos.x = 0;
        } 
        else if (input.isKeyPressed("right")) {
            this.renderable.flipX(false);
            this.pos.x += 16;
            if( this.pos.x > screen.width ) this.pos.x = screen.width;
        } 
        else if (input.isKeyPressed("up")) {
            this.renderable.flipY(true);
            this.body.force.y = -this.body.maxVel.y;
        } 
        else if (input.isKeyPressed("down")) {
            this.renderable.flipY(false);
            this.body.force.y = this.body.maxVel.y;
        }
        else {
            this.body.force.x = 0; 
            this.body.force.y = 0;
        }
        console.log("  position: " + this.pos.x + " / " + this.pos.y);
        // call the parent method
        return super.update(dt);
    }

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        // Make all other objects solid
        return true;
    }
};

export default PlayerEntity;
