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
	
	this.mTexture = myTexture;		// the object's texture, cannot be null;
};

// inherit Renderable base class functions
gEngine.Core.inheritPrototype(TextureRenderable, Renderable);

// override base class functions
TextureRenderable.prototype.draw = function(vpMatrix) {
	// activate the texture
	gEngine.Textures.activateTexture(this.mTexture);
	Renderable.prototype.draw.call(this, vpMatrix);
};

// getter/setters
TextureRenderable.prototype.getTexture = function() { return this.mTexture; };
TextureRenderable.prototype.setTexture = function(texture) { this.mTexture = texture; };