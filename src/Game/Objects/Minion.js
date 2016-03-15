/******************************************************
 * File: Minion.js
 * Description: Minion Game Object
 * Author: Jason McBride
 * Date: March 14th, 2016
 * Version: 1.0
 *
 * $History$
 * Version 1.0 - Initial
 *******************************************************/
"use strict" // Operate in Strict mode

function Minion(spriteTexture, atY) {
	this.kDelta = 0.2;
	this.mMinion = new SpriteAnimateRenderable(spriteTexture);
	this.mMinion.setColor([1, 1, 1, 0]);
	this.mMinion.getXform().setPosition(Math.random() * 100, atY);
	this.mMinion.getXform().setSize(12, 9.6);
	this.mMinion.setSpriteSequence(
		512, 0,		// first element pixel
		204, 164,	// widthxheight in pixcels
		5,			// number of elements
		0);			// horizontal padding in between
		
	this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
	this.mMinion.setAnimationSpeed(15);
	GameObject.call(this, this.mMinion);
}
gEngine.Core.inheritPrototype(Minion, GameObject);

Minion.prototype.update = function() {
	// remember to update this.mMinion's animation
	this.mMinion.updateAnimation();
	
	// move toward the left and wraps
	var xform = this.getXform();
	xform.incXPosBy(-this.kDelta);
	
	// if fly off to the left, re-appear at the right
	if(xform.getXPos() <0) {
		xform.setXPos(100);
		xform.setYPos(65 * Math.random());
	}
};