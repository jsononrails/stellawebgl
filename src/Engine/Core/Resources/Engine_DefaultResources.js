/******************************************************
* File: Engine_DefaultResources.js
* Description: Class for Loading and Sharing Resources
* Author: Jason McBride
* Date: Nov 20th 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
*******************************************************/
"use strict" // Operate in Strict mode

var gEngine = gEngine || { };

gEngine.DefaultResources = (function() {
	
	// Simple Shader GLSL Shader File paths
	var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";		// path to VertexShader
	var kSimpleFS = "src/GlSLShaders/SimpleFS.glsl";		// path to FragmentShader
	
	var mConstantColorShader = null; 		// variable for the SimpleShader object
	var _getConstColorShader = function() { return mConstantColorShader; }; // accessor
	
	// callback function after loadings are done
	var _createShaders = function(callBackFunction) {
		mConstantColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
		callBackFunction();
	};
	
	// initiate asynchronous loading of GLSL Shader Files
	var _initialize = function(callBackFunction) {
		// constant color shader: SimpleVS, and SimpleFS
		gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
		gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
		gEngine.ResourceMap.setLoadCompleteCallback(function() { _createShaders(callBackFunction); });
	};
	
	var mPublic = {
		initialize: _initialize,
		getConstColorShader: _getConstColorShader
	};
	return mPublic;
}());