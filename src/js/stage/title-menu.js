import { BitmapText, input, timer, game, Container, Vector2d, Text, RoundRect, state } from "melonjs/dist/melonjs.module.js";
import GlobalGameState from "../global-game-state";

class BaseTextButton extends Text {
	constructor(x, y, settings) {
		settings.font = settings.font || "Arial";
		settings.size = settings.size || 12;
		settings.text = settings.text || "Press me";
		settings.offScreenCanvas = settings.offScreenCanvas || true;
		settings.fillStyle = settings.fillStyle || "white";
		settings.lineWidth = settings.lineWidth || 2;

		super(x, y, settings);

		this.dimensions = this.measureText();
		settings.borderWidth = settings.borderWidth || this.dimensions.width + 16;
		settings.borderHeight = settings.borderHeight || this.dimensions.height + 16;

		this.border = new RoundRect(this.pos.x - 8, this.pos.y - 8, settings.borderWidth, settings.borderHeight);

		this.pos.x = (this.border.width - this.dimensions.width) / 2 + this.pos.x;

		/**
		 * object can be clicked or not
		 * @public
		 * @type {boolean}
		 * @default true
		 * @name GUI_Object#isClickable
		 */
		this.isClickable = true;

		/**
		 * Tap and hold threshold timeout in ms
		 * @type {number}
		 * @default 250
		 * @name GUI_Object#holdThreshold
		 */
		this.holdThreshold = 250;

		/**
		 * object can be tap and hold
		 * @public
		 * @type {boolean}
		 * @default false
		 * @name GUI_Object#isHoldable
		 */
		this.isHoldable = false;

		/**
		 * true if the pointer is over the object
		 * @public
		 * @type {boolean}
		 * @default false
		 * @name GUI_Object#hover
		 */
		this.hover = false;

		// object has been updated (clicked,etc..)
		this.holdTimeout = null;
		this.released = true;

		// GUI items use screen coordinates
		this.floating = true;

		// enable event detection
		this.isKinematic = false;
	}

	draw(renderer) {
		renderer.setGlobalAlpha(0.5);
		if( !this.hover ) {
			renderer.setColor("#00aa00");
		}
		else {
			renderer.setColor("#00ff00");
		}

		renderer.fill(this.border);
		renderer.setGlobalAlpha(1);
		renderer.setColor("#000000");
		renderer.stroke(this.border);
		super.draw(renderer);
	}

	/**
	 * function callback for the pointerdown event
	 * @ignore
	 */
	clicked(event) {
		// Check if left mouse button is pressed
		if (event.button === 0 && this.isClickable) {
			this.dirty = true;
			this.released = false;
			if (this.isHoldable) {
				if (this.holdTimeout !== null) {
					timer.clearTimeout(this.holdTimeout);
				}
				this.holdTimeout = timer.setTimeout(this.hold.bind(this), this.holdThreshold, false);
				this.released = false;
			}
			return this.onClick(event);
		}
	}

	/**
	 * function called when the object is pressed (to be extended)
	 * @name onClick
	 * @memberof GUI_Object
	 * @public
	 * @param {Pointer} event the event object
	 * @returns {boolean} return false if we need to stop propagating the event
	 */
	onClick(event) {
		// eslint-disable-line no-unused-vars
		return false;
	}

	/**
	 * function callback for the pointerEnter event
	 * @ignore
	 */
	enter(event) {
		this.hover = true;
		this.dirty = true;
		return this.onOver(event);
	}

	/**
	 * function called when the pointer is over the object
	 * @name onOver
	 * @memberof GUI_Object
	 * @public
	 * @param {Pointer} event the event object
	 */
	onOver(event) {
		// eslint-disable-line no-unused-vars
		// to be extended
	}

	/**
	 * function callback for the pointerLeave event
	 * @ignore
	 */
	leave(event) {
		this.hover = false;
		this.dirty = true;
		this.release(event);
		return this.onOut(event);
	}

	/**
	 * function called when the pointer is leaving the object area
	 * @name onOut
	 * @memberof GUI_Object
	 * @public
	 * @param {Pointer} event the event object
	 */
	onOut(event) {
		// eslint-disable-line no-unused-vars
		// to be extended
	}

	/**
	 * function callback for the pointerup event
	 * @ignore
	 */
	release(event) {
		if (this.released === false) {
			this.released = true;
			this.dirty = true;
			timer.clearTimeout(this.holdTimeout);
			return this.onRelease(event);
		}
	}

	/**
	 * function called when the object is pressed and released (to be extended)
	 * @name onRelease
	 * @memberof GUI_Object
	 * @public
	 * @returns {boolean} return false if we need to stop propagating the event
	 */
	onRelease() {
		return false;
	}

	/**
	 * function callback for the tap and hold timer event
	 * @ignore
	 */
	hold() {
		timer.clearTimeout(this.holdTimeout);
		this.dirty = true;
		if (!this.released) {
			this.onHold();
		}
	}

	/**
	 * function called when the object is pressed and held<br>
	 * to be extended <br>
	 * @name onHold
	 * @memberof GUI_Object
	 * @public
	 */
	onHold() {}

	/**
	 * function called when added to the game world or a container
	 * @ignore
	 */
	onActivateEvent() {
		// register pointer events
		input.registerPointerEvent("pointerdown", this, this.clicked.bind(this));
		input.registerPointerEvent("pointerup", this, this.release.bind(this));
		input.registerPointerEvent("pointercancel", this, this.release.bind(this));
		input.registerPointerEvent("pointerenter", this, this.enter.bind(this));
		input.registerPointerEvent("pointerleave", this, this.leave.bind(this));
	}

	/**
	 * function called when removed from the game world or a container
	 * @ignore
	 */
	onDeactivateEvent() {
		// release pointer events
		input.releasePointerEvent("pointerdown", this);
		input.releasePointerEvent("pointerup", this);
		input.releasePointerEvent("pointercancel", this);
		input.releasePointerEvent("pointerenter", this);
		input.releasePointerEvent("pointerleave", this);
		timer.clearTimeout(this.holdTimeout);
	}
}


class PlayButton extends BaseTextButton {
	constructor(x, y, ) {
		super(x, y, {
			text: 'Play',
			size: 24,
			borderWidth: 250
		});		
	}

	onClick(event) {
		state.change(state.READY);
	}
}

class ReplayButton extends BaseTextButton {
	constructor(x, y) {
		super(x, y, {
			text: "Replay",
			size: 24,
			borderWidth: 250,
		});
	}

	onClick(event) {
		state.change(state.READY);
	}
}

class HighscoreButton extends BaseTextButton {
	constructor(x, y) {
		super(x, y, {
			text: "Highscores",
			size: 24,
			borderWidth: 250,
		});
	}

	onClick(event) {
		state.change(state.SCORE);
	}
}

export default class TitleMenu extends Container {
	constructor() {
		super();

		// persistent across level change
		this.isPersistent = true;

		// make sure we use screen coordinates
		this.floating = true;

		// always on toppest
		this.z = 100;

		this.setOpacity(1.0);

		// give a name
		this.name = "TitleMenu";

		this.addChild(new PlayButton((1024 - 250) / 2, 300));
		this.addChild(new ReplayButton((1024 - 250) / 2, 360));
		this.addChild(new HighscoreButton((1024 - 250) / 2, 420));
	}
}
