/******************************************************
* File: VertexBuffer.js
* Description: Geometry Subsystem
* Author: Jason McBride
* Date: Nov 7th 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
*******************************************************/
"use strict"	// Operate in Strict mode

var gEngine = gEngine || { };

// The VertexBuffer object
gEngine.VertexBuffer = (function() {
	
	// First: define the vertices for a square
	var verticesOfSquare = [
		0.5, 0.5, 0.0,
		-0.5, 0.5, 0.0,
		0.5, -0.5, 0.0,
		-0.5, -0.5, 0.0
	];
	
	// reference to the vertex positions for the square in gl context
	var mSquareVertexBuffer = null;
	
	// Accessor for vertex positions
	var getGLVertexRef = function() { return mSquareVertexBuffer; };
	
	var initialize = function() {
		var gl = gEngine.Core.getGL();
		
		// Step A: Create a buffer on gGL context for our vertex positions
		mSquareVertexBuffer = gl.createBuffer();
		
		// Step B: Activate vertexBuffer
		gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);
		
		// Step C: Loads verticesOfSquare into the vertexBuffer
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
	}
	
	var mPublic = {
		initialize: initialize,
		getGLVertexRef: getGLVertexRef
	};
	return mPublic;
}());
