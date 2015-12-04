/******************************************************
* File: Engine_Texture.js
* Description: Game Texture Class
* Author: Jason McBride
* Date: Dec 3rd 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
*******************************************************/
"use strict" // Operate in Strict mode

function TextureInfo(name, w, h, id) {
	this.mName = name;
	this.mWidth = w;
	this.mHeight = h;
	this.mGLTexID = id;
};

var gEngine = gEngine || { };

gEngine.Textures = (function() {
	
	// Loads a Texture so that it can be drawn
	// if already in the map, wil do nothing.
	var loadTexture = function(textureName) {
		if(!(gEngine.ResourceMap.isAssetLoaded(textureName))) {
			var img = new Image();
			
			// update resources in loading counter.
			gEngine.ResourceMap.asyncLoadRequested(textureName);
			
			// when the texture loads, convert it to the WebGL format then put
			// it back into the mTextureMap
			img.onload = function() {
				_processLoadedImage(textureName, img);
			};
			img.src = textureName;
		} else {
			gEngine.ResourceMap.incAssetRefCount(textureName);
		}
	};
	
	// Remove the reference to allow associated memory
	// be available for subsequent garbage collection
	var unloadTexture = function(textureName) {
		var gl = gEngine.Core.getGL();
		var texInfo = gEngine.ResourceMap.retrieveAsset(textureName);
		gl.deleteTexture(texInfo.mGLTexID);
		gEngine.ResourceMap.unloadAsset(textureName);
	};
	
	var _processLoadedImage = function(textureName, image) {
		var gl = gEngine.Core.getGL();
		
		// create a WebGL texture object
		var textureID = gl.createTexture();
		
		// bind texture with the current texture functionality in webGL
		gl.bindTexture(gl.TEXTURE_2D, textureID);
		
		// load the texture ino the texture data structure with descriptive info
		// Parameters:
		// 1: which "binding point" or target the texture is being loaded to.
		// 2: level of detail. Used for mipmapping. 0 is base texture level.
		// 3: internal format. The composition of each element. i.e. pixels.
		// 4: Format of texel data. Must match internal format
		// 5: The data type of the texel data
		// 6: texture data.
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			gl.RGBA,
			gl.RGBA,
			gl.UNSIGNED_BYTE,
			image
		);
		
		// creates a mipmap for this texture
		gl.generateMipMap(gl.TEXTURE_2D);
		
		// tells webGL we are done manipulating data at the mGL.TEXTURE_2D target.
		gl.bindTexture(gl.TEXTURE_2D, null);
		
		var texInfo = new TextureInfo(
			textureName,
			image.naturalWidth,
			image.naturalHeight,
			textureID
		);
		
		gEngine.ResourceMap.asyncloadCompleted(textureName, texInfo);
	};
	
	var activateTexture = function(textureName) {
		var gl = gEngine.Core.getGL();
		var texInfo = gEngine.ResourceMap.retrieveAsset(textureName);
		
		// binds our texture reference to the current webGL texture functionality
		gl.bindTexture(gl.TEXTURE_2D, texInfo.mGLTexID);
		
		// to prevent texture wrappings
		g.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		g.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		
		// handles how magnification and minimization filters work
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_MAG_FILTER, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		
		// for pixel-graphics where you want the texture to look "sharp"
		// do the following:
		//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		//gl.texParameteri(gl.TEXTURE_MAG_FILTER, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	};
	
	var deactivateTexture = function() {
		var gl = gEngine.Core.getGL();
		gl.bindTexture(gl.TEXTURE_2D, null);
	};
	
	// getters
	var getTextureInfo = function(textureName) {
		return gEngine.ResourceMap.retrieveAsset(textureName);
	};
	
	var mPublic = { 
		loadTexture: loadTexture,
		unloadTexture: unloadTexture,
		activateTexture: activateTexture,
		deactivateTexture: deactivateTexture,
		getTextureInfo: getTextureInfo
	};
	
	return mPublic;
}());