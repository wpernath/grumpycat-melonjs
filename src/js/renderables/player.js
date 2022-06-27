import { Entity, game, input, Sprite } from 'melonjs/dist/melonjs.module.js';


class PlayerEntity extends Entity {

    /**
     * constructor
     */
    constructor(x, y) {
        // call the parent constructor
        let settings = {
            width: 32,
            height: 32,
            image: "sensa_jaa"
        };
        super(x*32, y*32 , settings);

        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.4, 0);

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
        if (input.isKeyPressed("left")) {
            console.log("left pressed");
            this.renderable.flipX(true);
            this.body.force.x = -this.body.maxVel.x;
        } 
        else if (input.isKeyPressed("right")) {
            this.renderable.flipX(false);
            this.body.force.x = this.body.maxVel.x;
        } 
        else if (input.isKeyPressed("up")) {
            this.renderable.flipY(true);
            this.body.force.y = -this.body.maxVel.y;
        } 
        else if (input.isKeyPressed("down")) {
            this.renderable.flipY(false);
            this.body.force.y = this.body.maxVel.y;
        }

        // call the parent method
        return super.update(dt);
    }

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        // Make all other objects solid
        return false;
    }
};

export default PlayerEntity;
