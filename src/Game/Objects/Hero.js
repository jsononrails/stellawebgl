/******************************************************
 * File: Hero.js
 * Description: Hero Game Object
 * Author: Jason McBride
 * Date: March 14th, 2016
 * Version: 1.0
 *
 * $History$
 * Version 1.0 - Initial
 *******************************************************/
"use strict" // Operate in Strict mode

function Hero(spriteTexture) {
	this.kDelta = 0.3;
	this.mDye = new SpriteRenderable(spriteTexture);
	this.mDye.setColor([1, 1, 1, 0]);
	this.mDye.getXform().setPosition(35, 50);
	this.mDye.getXform().setSize(9, 12);
	this.mDye.setElementPixelPosition(0, 12, 0, 180);
	GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function() {
	// control by WASD
	var xform = this.getXform();
	if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
		xform.incYPosBy(this.kDelta);
	if(gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
		xform.incYPosBy(-this.kDelta);
	if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
		xform.incXPosBy(-this.kDelta);
	if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
		xform.incXPosBy(this.kDelta);
};