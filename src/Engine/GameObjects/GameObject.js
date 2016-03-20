/*****************************************************************
* File: GameObject.js
* Description: Abstract Game Object Class
* Author: Jason McBride
* Date: March 13th 2016
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
******************************************************************/
"use strict"	// Operate in Strict mode

function GameObject(renderableObj) {
	this.mRenderComponent = renderableObj;
	this.mVisible = true;
	this.mCurrentFrontDir = vec2.fromValues(0, 1);
	this.mSpeed = 0;
}

GameObject.prototype.getXform = function() {
	return this.mRenderComponent.getXform();
};

GameObject.prototype.setVisibility = function(v) { this.mVisible = v; };

GameObject.prototype.isVisible = function() { return this.mVisible; };

GameObject.prototype.setSpeed = function(v) { this.mSpeed = v; };
GameObject.prototype.getSpeed = function() { return this.mSpeed; };
GameObject.prototype.incSpeedBy = function(delta) { this.mSpeed += delta; };

GameObject.prototype.setCurrentFronDir = function(v) { vec2.normalize(this.mCurrentFrontDir, v); };
GameObject.prototype.getCurrentFronDir = function() { return this.mCurrentFrontDir; };

GameObject.prototype.rotateObjPointTo = function(p, rate) {
	// Step A: determine if reach the destination position p
	var dir = [];
	vec2.sub(dir, p, this.getXform().getPosition());
	var len = vec2.length(dir);
	if(len < Number.MIN_VALUE)
		return; // we are there
	
	vec2.scale(dir, dir, 1 / len);
	
	// Step B: compute the angle to rotate
	var fdir = this.getCurrentFronDir();
	var cosTheta = vec2.dot(dir, fdir);
	if(cosTheta > 0.999999) // almost exactly the same direction
		return;
		
	// Step C: clamp the cosTheta to -1 to 1
	// in a perfect world, this would never happen!
	if(cosTheta > 1) 
		cosTheta = 1;
	else
		if(cosTheta < -1)
			cosTheta = -1;
			
	// Step D: compute whether to rotate clockwise, or counterclockwise
	var dir3d = vec3.fromValues(dir[0], dir[1], 0);
	var f3d = vec3.fromValues(fdir[0], fdir[1], 0);
	var r3d = [];
	vec3.cross(r3d, f3d, dir3d);
	
	var rad = Math.acos(cosTheta);	// radian to rotate
	
	// Step E: rotate the facing direction with the angle and rate
	rad *= rate;	// actual angl need to rotate from Obj's front
	vec2.rotate(this.getCurrentFronDir(), this.getCurrentFronDir(), rad);
	this.getXform().incRotationByRad(rad);
};

GameObject.prototype.update = function() {
	//simple default behavior
	var pos = this.getXform().getPosition();
	vec2.scaleAndAdd(pos, pos, this.getCurrentFronDir(), this.getSpeed());
}; // override

GameObject.prototype.getRenderable = function() {
	return this.mRenderComponent;
};

GameObject.prototype.draw = function(aCamera) {
	if(this.isVisible());
		this.mRenderComponent.draw(aCamera);
};