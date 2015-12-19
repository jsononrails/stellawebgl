/******************************************************
* File: SpriteShader.js
* Description: Sprite Sheet Shader Class
* Author: Jason McBride
* Date: Dec 19th, 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
*******************************************************/
"use strict"	// Operate in Strict mode

// constructor
function SpriteShader(vertexShaderPath, fragmentShaderPath) {
	// call super class constructor
	TextureShader.call(this, vertexShaderPath, fragmentShaderPath);
	
	this.mTexCoordBuffer = null; // gl buffer containing texture coordinate
	var initTexCoord = [
		1.0, 1.0,
		0.0, 1.0,
		1.0, 0.0,
		0.0, 0.0
	];
	
	var gl = gEngine.Core.getGL();
	this.mTexCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initTexCoord), gl.DYNAMIC_DRAW);
};

// get all the prototype functions from SimpleShader
gEngine.Core.inheritPrototype(SpriteShader, TextureShader);

// extended class methods
SpriteShader.prototype.setTextureCoordinate = function(texCoord) {
	var gl = gEngine.Core.getGL();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(texCoord));
};

// override superclass activation method
SpriteShader.prototype.activeShader = function(pixelColor, vpMatrix) {
	// first call the super class's activate
	SimpleShader.prototype.activeShader.call(this, pixelColor);
	
	// now binds the proper texture coordinate buffer
	var gl = gEngine.Core.getGL();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
	gl.vertexAttribPointer(this.mShaderTextureCoordAttribute, false, 0, 0);
	gl.enableVertexAttribArray(this.mShaderTextureCoordAttribute);
};