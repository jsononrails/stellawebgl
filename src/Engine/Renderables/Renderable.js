/******************************************************
* File: Renderable.js
* Description: Base Class for Drawing Renderable Objects
* Author: Jason McBride
* Date: Nov 10th 2015
* Version: 1.2
*
* $History$
* Version 1.0 - Initial
*
* Version 1.1
* Nov 22nd 2015 - Jason McBride
* 		Update: added is null check to draw function
*				to avoid drawing if shader hasn't loaded yet
*
* Version 1.2
* Dec 3rd 2015 - Jason McBride
*		Update: converting to be a base class for 
*				other renderables
*
* Version 1.3
* March 13, 2016 - Jason McBride
*		Update: implementing camera
*
*******************************************************/
"use strict"	// Operate in Strict mode

function Renderable() {
	this.mShader = gEngine.DefaultResources.getConstColorShader();
	this.mColor = [1, 1, 1, 1];		// Color for the fragment shader
	this.mXform = new Transform();	// transform operator for the object
}

Renderable.prototype.draw = function (aCamera) {
	if(this.mShader !== null) { // shaders haven't loaded yet
		var gl = gEngine.Core.getGL();
		this.mShader.activateShader(this.mColor, aCamera);	// always activate the shader first
		this.mShader.loadObjectTransform(this.mXform.getXform());
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
};

// protected function to be modified by subclasses
Renderable.prototype._setShader = function(shader) { this.mShader = shader; };

// Accessors
Renderable.prototype.setColor = function(color) { this.mColor = color; };
Renderable.prototype.getColor = function() { return this.mColor; };
Renderable.prototype.getXform = function() { return this.mXform; };

