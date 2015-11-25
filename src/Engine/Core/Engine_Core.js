/******************************************************
* File: Engine_Core.js
* Description: Core of WebGL Game Engine
* Author: Jason McBride
* Date: Nov 7th 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
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
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

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

        // Inites DefaultResources, when done, invoke startScene(myGame).
        gEngine.DefaultResources.initialize(function (myGame) {
            myGame.loadScene.call(myGame);          // Called in this way to keep correct context
            myGame.GameLoop.start(myGame);          // call initialize() only after async loading is done
        });

    };

    var startScene = function (Game) {
        Game.initialize.call(Game);		// Called this way to keep correct context
        gEngine.GameLoop.start(Game);	// start the game loop after initialization
    };

    // Clears the draw area and draws one square
    var clearCanvas = function (color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]); // set the color to be cleared
        mGL.clear(mGL.COLOR_BUFFER_BIT);	// clear to the color previously set
    }

    // Contains the functions and variables that will be accessible.
    var mPublic = {
        getGL: getGL,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas
    };

    return mPublic;
}());