/******************************************************
* File: TextureShader.js
* Description: Texture Shader Class
* Author: Jason McBride
* Date: Dec 3rd, 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
*******************************************************/
"use strict"	// Operate in Strict mode

// constructor
function TextureShader(vertexShaderPath, fragmentShaderPath) {
	// Call super class constructor
	SimpleShader.call(this, vertexShaderPath, fragmentShaderPath);
	
	// reference to aTextureCoordinate within the shader
	this.mShaderTexturCoordAttribute = null;
	
	// get the reference of aTextureCoordinate from the shader
	var gl = gEngine.Core.getGL();
	this.mShaderTexturCoordAttribute = gl.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");
};

// get all the prototype functions from SimpleShader
gEngine.Core.inheritPrototype(TextureShader, SimpleShader);

// overriding the Activation of the shader for rendering
TextureShader.prototype.activateShader = function(pixelColor, vpMatrix) {
	// first call the super class's activate
	SimpleShader.prototype.activateShader.call(this, pixelColor, vpMatrix);
	
	// now our own functionality: enable texture coordinate array
	var gl = gEngine.Core.getGL();
	gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLTexCoordRef());
	gl.enableVertexAttribArray(this.mShaderTexturCoordAttribute);
	gl.vertexAttribPointer(this.mShaderTexturCoordAttribute, 2, gl.FLOAT, false, 0, 0);
};