/*****************************************************************
* File: GameObjectSets.js
* Description: Utility Class to Manage Game Objects
* Author: Jason McBride
* Date: March 13th 2016
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
******************************************************************/
"use strict"	// Operate in Strict mode

function GameObjectSet() {
	this.mSet = [];
}

GameObjectSet.prototype.size = function() { return this.mSet.length; };

GameObjectSet.prototype.getObjectAt = function(index) {
	return this.mSet[index];
};