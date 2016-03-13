/******************************************************
* File: FontRenderable.js
* Description: Class for Drawing Bitmap Font Renderable Objects
* Author: Jason McBride
* Date: March 11th, 2016
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
*******************************************************/
"use strict"	// Operate in Strict mode

function FontRenderable(aString) {
	this.mFont = gEngine.DefaultResources.getDefaultFont();
	this.mOneChar = new SpriteRenderable(this.mFont + ".png");
	this.mXform = new Transform(); // transform that moves this object around
	this.mText = aString;
};

FontRenderable.prototype.draw = function(vpMatrix) {
	var widthOfOneChar = this.mXform.getWidth() / this.mText.length;
	var heightOfOneChar = this.mXform.getHeight();
	var yPos = this.mXform.getYPos();
	
	// center position of the first char
	var xPos = this.mXform.getXPos() - (widthOfOneChar / 2) + (widthOfOneChar * 0.5);
	var charIndex, aChar, charInfo, xSize, ySize, xOffset, yOffset;
	
	for(charIndex = 0; charIndex < this.mText.length; charIndex++) {
		aChar = this.mText.charCodeAt(charIndex);
		charInfo = gEngine.Fonts.getCharInfo(this.mFont, aChar);
		
		// set the texture coordinate
		this.mOneChar.setElementUVCoordinate(charInfo.mTexCoordLeft, 
			charInfo.mTexCoordRight,
			charInfo.mTexCoordBottom,
			charInfo.mTexCoordTop);
			
			// now the size of the char
			xSize = widthOfOneChar * charInfo.mCharWidth;
			ySize = heightOfOneChar * charInfo.mCharHeight;
			this.mOneChar.getXform().setSize(xSize, ySize);
			
			// how much to offest from center
			xOffset = widthOfOneChar * charInfo.mCharWidthOffset * 0.5;
			yOffset = heightOfOneChar * charInfo.mCharHeightOffset * 0.5;
			
			this.mOneChar.getXform().setPosition(xPos - xOffset, yPos - yOffset);
			
			this.mOneChar.draw(vpMatrix);
			
			xPos += widthOfOneChar;
	}
};

FontRenderable.prototype.getXform = function() { return this.mXform; };
FontRenderable.prototype.getText = function() { return this.mText; };
FontRenderable.prototype.setText = function(t) {
	this.mText = t;
	this.setTextHeight(this.getXform().getHeight());
};

FontRenderable.prototype.getFont = function() { return this.mFont; };
FontRenderable.prototype.setFont = function(f) {
	this.mFont = f;
	this.mOneChar.setTexture(this.mFont + ".png");
};

FontRenderable.prototype.setColor = function(c) {
	this.mOneChar.setColor(c);
};
FontRenderable.prototype.getColor = function() {
	return this.mOneChar.getColor();
};

FontRenderable.prototype.setTextHeight = function(h) {
	// this is for "A"
	var charInfo = gEngine.Fonts.getCharInfo(this.mFont, "A".charCodeAt(0));
	var w = h * charInfo.mCharAspectRatio;
	this.getXform().setSize(w * this.mText.length, h);
};