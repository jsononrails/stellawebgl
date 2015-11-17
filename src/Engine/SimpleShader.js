/******************************************************
* File: SimpleShader.js
* Description: Simple Shader Class
* Author: Jason McBride
* Date: Nov 9th 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
*******************************************************/
"use strict"	// Operate in Strict mode

function SimpleShader(vertexShaderID, fragmentShaderID) {
	// instance variables (Convention: all instance variables: mVariables)
	this.mPixelColor= null;		 	// reference to pixelColor uniform in fragment shader
	this.mModelTransform = null;	// reference to uModelTransform uniform in vetex shader
	this.mViewProjTransform = null;	//	reference to view-projection transform operator in SimpleVS.glsl
	this.mCompiledShader = null; 	// reference to the compiled shader in webgl context
	this.mShaderVertexPositionAttribute = null; // reference to SquareVertexPosition in shader
	
	var gl = gEngine.Core.getGL();
	
	// start of constructor code
	// 
	// Step A: load and compile vertex and fragment shaders
	var vertexShader = this._loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
	var fragmentShader = this._loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);
	
	// Step B: Create and link the shaders into a program.
	this.mCompiledShader = gl.createProgram();
	gl.attachShader(this.mCompiledShader, vertexShader);
	gl.attachShader(this.mCompiledShader, fragmentShader);
	gl.linkProgram(this.mCompiledShader);
	
	// Step C: check for error
	if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
		alert("Error linking shader");
		return null;
	}
	
	// Step D: Gets a reference to the aSquareVertexPosition attribute
	this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, "aSquareVertexPosition");
	
	// Step E: Activates the vertex buffer loaded in Engine.Core_VertexBuffer
	gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
	
	// Step F: Describe the characteristic of the vertex position attribute
	gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
		3,				// each element is 3-float (x,y,z)
		gl.FLOAT,		// data type is FLOAT
		false,			// if the content is normalized vectors
		0,				// number of bytes to skip in between elements
		0				// offsets to the first element
	);
	
	// Step G: Gets a reference to the uniform variables:
	//		   uPixelColor and uModelTransform
	this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
	this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
	this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
}

// Returns a compiled shader from a shader in the dom.
// The id is the id of the script in the html tag.
SimpleShader.prototype._loadAndCompileShader = function(filePath, shaderType) {
	var shaderText, shaderSource, compiledShader;
	var gl = gEngine.Core.getGL();
	
	// Step A: Get the shader source
	var xmlReq = new XMLHttpRequest();
	xmlReq.open('GET', filePath, false);
	try {
		xmlReq.send();
	} catch (error) {
		alert("Failed to load shader: " + filePath);
		return null;
	}
	shaderSource = xmlReq.responseText;
	
	if (shaderSource === null) {
		alert("WARNING: Loading of:" + filePath + " Failed!");
		return null;
	}
	
	// Step B: Create the shader based on teh shader type: vertex or fragment
	compiledShader = gl.createShader(shaderType);
	
	// Step C: Compile the created shader
	gl.shaderSource(compiledShader, shaderSource);
	gl.compileShader(compiledShader);
	
	// Setp D: check for errors and return results (null if error)
	// The log info is how shader compilation errors are typically displayed.
	// This is useful for debugging shaders.
	if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
		alert("A shader compiling error occured: " + gl.getShaderInfoLog(compiledShader));
	}
	return compiledShader;
};

// Loads per-object model transform to the vertex shader
SimpleShader.prototype.loadObjectTransform = function(modelTransform) {
	var gl = gEngine.Core.getGL();
	gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};

SimpleShader.prototype.activateShader = function(pixelColor, vpMatrix) {
	var gl = gEngine.Core.getGL();
	gl.useProgram(this.mCompiledShader);
	gl.uniformMatrix4fv(this.mViewProjTransform, false, vpMatrix);
	gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
	gl.uniform4fv(this.mPixelColor, pixelColor);
};

// Accessor to the compiled shader program
SimpleShader.prototype.getShader = function() { return this.mCompiledShader; };