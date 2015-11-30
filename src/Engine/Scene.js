/*****************************************************************
* File: Scene.js
* Description: Abstract Scene Class
* Author: Jason McBride
* Date: Nov 30th 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
******************************************************************/
"use strict"	// Operate in Strict mode

function Scene() {
	// constructor
}

Scene.prototype.initialize = function() {
	// Called from the GameLoop, after loading is done
};

Scene.prototype.loadScene = function() {
	// Called from EngineCore.startScene()
};
Scene.prototype.unloadScene = function() {};
Scene.prototype.update = function() {};
Scene.prototype.draw = function() {};