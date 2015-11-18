/*****************************************************************
* File: Transform.js
* Description: Class for handling matrix math for transformations
* Author: Jason McBride
* Date: Nov 10th 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
******************************************************************/
"use strict"	// Operate in Strict mode

function Transform() {
	this.mPosition = vec2.fromValues(0, 0);			// translation operator
	this.mScale = vec2.fromValues(1, 1);			// scaling operator
	this.mRotationInRad = 0.0;						// rotation in radians
};

// Position setters and getters
Transform.prototype.setPosition = function(xPos, yPos) { this.setXPos(xPos); this.setYPos(yPos); };
Transform.prototype.setXPos = function(xPos) { this.mPosition[0] = xPos; };
Transform.prototype.setYPos = function(yPos) { this.mPosition[1] = yPos; };
Transform.prototype.getPosition = function() { return this.mPosition; };
Transform.prototype.getXPos = function() { return this.mPosition[0]; };
Transform.prototype.getYPos = function() { return this.mPosition[1]; };

// Size setters and getters
Transform.prototype.setSize = function(width, height) { this.setWidth(width); this.setHeight(height); };
Transform.prototype.setWidth = function(width) { this.mScale[0] = width; };
Transform.prototype.setHeight = function(height) { this.mScale[1] = height; };
Transform.prototype.getSize = function() { return this.mScale; };
Transform.prototype.getWidth = function() { return this.mScale[0]; };
Transform.prototype.getHeight = function() { return this.mScale[1]; };

// Rotation setters and getters
Transform.prototype.setRotationInRad = function(rotationInRadians) {
	this.mRotationInRad = rotationInRadians;
	while(this.mRotationInRad > (2*Math.PI))
		this.mRotationInRad -= (2*Math.PI);
};
Transform.prototype.getRotationInRad = function() { return this.mRotationInRad; };

Transform.prototype.setRotationInDegree = function(rotationInDegree) {
	this.setRotationInRad(rotationInDegree * Math.PI/180.0);
};
Transform.prototype.getRotationInDegree = function() { return this.mRotationInRad * 180 / Math.PI; };

Transform.prototype.incXPosBy = function (delta) {
    var newX = this.getXPos() + delta;
    this.setXPos(newX);
};

Transform.prototype.incRotationByDegree = function (degree) {
    var newDegree = this.getRotationInDegree() + degree;
    this.setRotationInDegree(newDegree);
};

Transform.prototype.incSizeby = function (delta) {
    this.setSize((this.getWidth() + delta), (this.getHeight() + delta));
};

Transform.prototype.getXform = function() {
	// Creates a blank identity matrix
	var matrix = mat4.create();
	
	// Step 1: compute the translation, for now z is always 0.0
	mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0.0));
	
	// Step 2: concatenate with rotation
	mat4.rotateZ(matrix, matrix, this.getRotationInRad());
	
	// Step 3: concatenate with scaling
	mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));
	return matrix;
};