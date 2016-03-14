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
}

GameObject.prototype.getXform = function() {
	return this.mRenderComponent.getXform();
};

GameObject.prototype.update = function() {}; // override

GameObject.prototype.getRenderable = function() {
	return this.mRenderComponent;
};

GameObject.prototype.draw = function(aCamera) {
	this.mRenderComponent.draw(aCamera);
};