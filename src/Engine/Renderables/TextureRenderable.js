/******************************************************
* File: TextureRenderable.js
* Description: Class for Drawing Textured Renderable Objects
* Author: Jason McBride
* Date: Dec 3 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
*******************************************************/
"use strict"	// Operate in Strict mode

// constructor and object definition
function TextureRenderable(myTexture) {
	Renderable.call(this);
	Renderable.prototype.setColor(this, [1, 1, 1, 0]);
	// Alpha 0: switch off tinting
	Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getTextureShader());

	// these two instance variables are to cache texture information
	// for supporitng per-pixel accurate collision detection
	this.mTextureInfo = null;
	this.mColorArray = null;

	// defined for subclass to override
	this.mTexWidth = 0;
	this.mTexHeight = 0;
	this.mTexLeftIndex = 0;
	this.mTexBottomIndex = 0;
	this.setTexture(myTexture);

};

// inherit Renderable base class functions
gEngine.Core.inheritPrototype(TextureRenderable, Renderable);

// override base class functions
TextureRenderable.prototype.draw = function(aCamera) {
	// activate the texture
	gEngine.Textures.activateTexture(this.mTexture);
	Renderable.prototype.draw.call(this, aCamera);
};

// getter/setters
TextureRenderable.prototype.getTexture = function() { return this.mTexture; };
TextureRenderable.prototype.setTexture = function(newTexture) {
	this.mTexture = newTexture;
	this.mTextureInfo = gEngine.Textures.getTextureInfo(newTexture);
	this.mColorArray = null;
	this.mTexWidth = this.mTextureInfo.mWidth;
	this.mTexHeight = this.mTextureInfo.mHeight;
	this.mTexLeftIndex = 0;
	this.mTexBottomIndex = 0;
};