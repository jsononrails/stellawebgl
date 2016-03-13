/******************************************************
* File: Engine_Core.js
* Description: Core of WebGL Game Engine
* Author: Jason McBride
* Date: Nov 7th 2015
* Version: 1.1
*
* $History$
* Version 1.0 - Initial
*
* Version 1.1
* Dec 3rd 2015 - Jason McBride
* 		Update: added Texture support
*
*******************************************************/
"use strict" // Operate in Strict mode

var gEngine = gEngine || {};	// initialize the variable while ensuring it is not redefined

gEngine.Core = (function () {
    // instance variable: the graphical context for drawing
    var mGL = null;

    // Accessor of webgl context
    var getGL = function () { return mGL; }

    // Initialize the WebGL, the vertex buffer and compile the shaders
    var _initializeWebGL = function (htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);

        // Get teh standard or experimental webgl and binds to the Cancas area
        // store the results to the instance variable mGL
        mGL = canvas.getContext("webgl", {alpha:false}) || canvas.getContext("experimental-webgl", {alpha:false});

		// allows transparency with textures.
		mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
		mGL.enable(mGL.BLEND);
		
		// Set images to flip the y axis to match the texture coordinate space.
		mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true);
		
        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
        }
    };

    // initialize all of the EngineCore components
    var initializeEngineCore = function (htmlCanvasID, myGame) {

        // initialize WebGL
        _initializeWebGL(htmlCanvasID);

        // initialize the VertexBuffer
        gEngine.VertexBuffer.initialize();

        // initialize input
        gEngine.Input.initialize();

        // initialize audio
        gEngine.AudioClips.InitAudioContext();
        
        // Initiates DefaultResources, when done, invoke startScene(myGame).
        gEngine.DefaultResources.initialize(function() { startScene(myGame); } );

    };

    var startScene = function (myGame) {
        myGame.loadScene.call(myGame);		// Called this way to keep correct context
        gEngine.GameLoop.start(myGame);	// start the game loop after initialization
    };

    // Clears the draw area and draws one square
    var clearCanvas = function (color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]); // set the color to be cleared
        mGL.clear(mGL.COLOR_BUFFER_BIT);	// clear to the color previously set
    }

    var inheritPrototype = function(subClass, superClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
    }
	
	var cleanUp = function() {
		gEngine.VertexBuffer.cleanUp();
		gEngine.DefaultResources.cleanUp();
	};
	
    // Contains the functions and variables that will be accessible.
    var mPublic = {
        getGL: getGL,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas,
        inheritPrototype: inheritPrototype,
		startScene: startScene,
		cleanUp: cleanUp
    };

    return mPublic;
}());