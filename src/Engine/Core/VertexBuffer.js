/******************************************************
* File: VertexBuffer.js
* Description: Geometry Subsystem
* Author: Jason McBride
* Date: Nov 7th 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
*
* Version 1.1 - Jason McBride Dec 3rd, 2015
* 		Updated to support texture coordinates
*******************************************************/
"use strict"	// Operate in Strict mode

var gEngine = gEngine || { };

// The VertexBuffer object
gEngine.VertexBuffer = (function() {
	
	// reference to the vertex positions for the square in gl context
	var mSquareVertexBuffer = null;
	
	// reference to the texture positions for the sqaure vertices in gl context
	var mTextureCoordBuffer = null;
	
	// First: define the vertices for a square
	var verticesOfSquare = [
		0.5, 0.5, 0.0,
		-0.5, 0.5, 0.0,
		0.5, -0.5, 0.0,
		-0.5, -0.5, 0.0
	];
	
	// Second: define the corresponding texture coordinates
	var textureCoordinates = [
		1.0, 1.0,
		0.0, 1.0,
		1.0, 0.0,
		0.0, 0.0
	];
	
	// Accessor for vertex positions
	var getGLVertexRef = function() { return mSquareVertexBuffer; };
	
	// Accessor for texture coordinates
	var getGLTexCoordRef = function() { return mTextureCoordBuffer; };
	
	var initialize = function() {
		var gl = gEngine.Core.getGL();
		
		// Step A: Allocate and store vertex positions into the webGL context
		// Create a buffer on gGL context for our vertex positions
		mSquareVertexBuffer = gl.createBuffer();
		
		// Activate vertexBuffer
		gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);
		
		// Loads verticesOfSquare into the vertexBuffer
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
		
		// Step B: Allocate and store texture coordinates
		// Create a buffer on the gGL context for our texture coordinates
		mTextureCoordBuffer = gl.createBuffer();
		
		// Activate textureBuffer
		gl.bindBuffer(gl.ARRAY_BUFFER, mTextureCoordBuffer);
		
		// Loads the coordinates into the textureBuffer
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
	}
	
	var mPublic = {
		initialize: initialize,
		getGLVertexRef: getGLVertexRef,
		getGLTexCoordRef: getGLTexCoordRef
	};
	
	return mPublic;
}());
