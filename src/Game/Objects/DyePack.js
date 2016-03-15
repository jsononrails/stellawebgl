/******************************************************
 * File: DyePack.js
 * Description: Dye Pack Game Object
 * Author: Jason McBride
 * Date: March 14th, 2016
 * Version: 1.0
 *
 * $History$
 * Version 1.0 - Initial
 *******************************************************/
"use strict" // Operate in Strict mode

function DyePack(spriteTexture) {
	this.kRefWidth = 80;
	this.kRefHeight = 130;
	
	this.mDyePack = new SpriteRenderable(spriteTexture);
	this.mDyePack.setColor([1, 1, 1, 0.1]);
	this.mDyePack.getXform().setPosition(50, 33);
	this.mDyePack.getXform().setSize(this.kRefWidth / 50, this.kRefHeight / 50);
	this.mDyePack.setElementPixelPosition(510, 595, 23, 153);
	GameObject.call(this, this.mDyePack);
};

gEngine.Core.inheritPrototype(DyePack, GameObject);