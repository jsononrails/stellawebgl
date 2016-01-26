/******************************************************
* File: SpriteAnimateRenderable.js
* Description: Class for Drawing Sprite Sheet Animated Renderable Objects
* Author: Jason McBride
* Date: Jan 24th, 2016
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
*******************************************************/
"use strict"	// Operate in Strict mode

// Assumption: the first sprite in an animation is always the lef-most element.

// Animation types enum
SpriteAnimateRenderable.eAnimationType = Object.freeze({
	eAnimateRight: 0,		// Animate from left to right, then restart to left
	eAnimateLeft: 1, 		// Animate right to left, then restart to right
	eAnimateSwing: 2		// Animate first left to right, then animate backwards
});

// constructor
function SpriteAnimateRenderable(myTexture) {
	SpriteRenderable.call(this, myTexture);
	Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getSpriteShader());
	
	// All coordinates are in texture coordinate (UV between 0 to 1)
	
	// Information on the sprite element
	this.mFirstElmLeft = 0.0; 		// 0.0 is left corner of image
	this.mElmTop = 1.0;				// 1.0 is top corner of image
	this.mElmWidth = 1.0;			// default sprite element size is the entire image
	this.mElmHeiht = 1.0;
	this.mWidthPadding = 0.0;
	this.mNumElems = 1;				// number of elements in an animation
	
	// per animation settings
	this.mAnimationType = SpriteAnimateRenderable.eAnimationType.eAnimateRight;
	this.mUpdateInterval = 1;		// how often to advance
	
	// current animation state
	this.mCurrentAnimAdvance = -1;
	this.mCurrentElm = 0;
	
	this._initAnimation();
};

// inherit SpriteRenderable
gEngine.Core.inheritPrototype(SpriteAnimateRenderable, SpriteAnimateRenderable);
