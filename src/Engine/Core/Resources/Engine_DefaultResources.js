/******************************************************
* File: Engine_DefaultResources.js
* Description: Class for Loading and Sharing Resources
* Author: Jason McBride
* Date: Nov 20th 2015
* Version: 1.1
*
* $History$
* Version 1.0 - Initial
*
* Version 1.1 Jason McBride Dec 3rd, 2015
*		Updated: Added support for texture shader
*******************************************************/
"use strict" // Operate in Strict mode

var gEngine = gEngine || { };

gEngine.DefaultResources = (function() {
	
	// Simple Shader GLSL Shader File paths
	var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";		// path to VertexShader
	var kSimpleFS = "src/GlSLShaders/SimpleFS.glsl";		// path to FragmentShader
	var mConstantColorShader = null; 		// variable for the SimpleShader object
	var getConstColorShader = function() { return mConstantColorShader; }; // accessor

	// Texture Shader
	var kTextureVS = "src/GLSLShaders/TextureVS.glsl";		// path to VertexShader
	var kTextureFS = "src/GLSLShaders/TextureFS.glsl";		// path to FragmentShader
	var mTextureShader = null;
	var getTextureShader = function() { return mTextureShader; }; // accessor
	var mSpriteShader = null;
	var getSpriteShader = function() { return mSpriteShader; }
	
	// callback function after loadings are done
	var _createShaders = function(callBackFunction) {
		gEngine.ResourceMap.setLoadCompleteCallback(null);
		mConstantColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
		mTextureShader = new TextureShader(kTextureVS, kTextureFS);
		mSpriteShader = new SpriteShader(kTextureVS, kTextureFS);
		callBackFunction();
	};
	
	// initiate asynchronous loading of GLSL Shader Files
	var _initialize = function(callBackFunction) {
		// constant color shader: SimpleVS, and SimpleFS
		gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
		gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
		
		// texture shader:
		gEngine.TextFileLoader.loadTextFile(kTextureVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
		gEngine.TextFileLoader.loadTextFile(kTextureFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
		
		gEngine.ResourceMap.setLoadCompleteCallback(function() { _createShaders(callBackFunction); });
	};
	
	var mPublic = {
		initialize: _initialize,
		getConstColorShader: getConstColorShader,
		getTextureShader: getTextureShader,
		getSpriteShader: getSpriteShader
	};
	return mPublic;
}());