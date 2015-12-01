/******************************************************
 * File: BlueLevel.js
 * Description: Game Blue Level Class
 * Author: Jason McBride
 * Date: Nov 30th 2015
 * Version: 1.0
 *
 * $History$
 * Version 1.0 - Initial
 *******************************************************/
"use strict" // Operate in Strict mode

function BlueLevel() {
	// scene file name
	this.kSceneFile = "src/assets/BlueLevel.xml";

    // audio clips: supports both mp3 and wav formats
    this.kBgClip = "src/assets/sounds/BGClip.mp3";
    this.kCue = "src/assets/sounds/BlueLevel_cue.wav";

	// all squares
	this.mSqSet = [];		// these are renderable objects
	// the camera to view the scene
	this.mCamera = null;
}

// inherit Scene Abstract Class
gEngine.Core.inheritPrototype(BlueLevel, Scene);

// overried methods
BlueLevel.prototype.loadScene = function() {
	gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);

    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
};

BlueLevel.prototype.initialize = function() {
	 var sceneParser = new SceneFileParser(this.kSceneFile);

    // Step A: set up the cameras
    this.mCamera = sceneParser.parseCamera();

    // Step B: create the shader
    sceneParser.parseSquares(this.mSqSet);

    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

BlueLevel.prototype.draw = function() {
	// Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step C draw all the squares
    for (var i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
};

BlueLevel.prototype.update = function() {
	 // For this very simple gam, lets move the white square and pulse the red
    var xform = this.mSqSet[0].getXform();
    var delta = 0.05;

    // Step A: test for white square movement
    
    // Left
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        gEngine.AudioClips.playACue(this.kCue);
		xform.incXPosBy(-delta);
		if (xform.getXPos() < 11) { // this is the left-boundary
			gEngine.GameLoop.stop();
		}
	}

    // Right
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        gEngine.AudioClips.playACue(this.kCue);
        if (xform.getXPos() > 30) // this is right-bound of the window
            xform.setPosition(10, 60);
        xform.incXPosBy(delta);
    }

    // Step B: test for white square rotation
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        xform.incRotationByDegree(25);
    }

    // Step C: pulse the red square
    var redXform = this.mSqSet[1].getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (redXform.getWidth() > 5)
            redXform.setSize(2, 3);
        redXform.incSizeby(delta);
    }
};

BlueLevel.prototype.unloadScene = function() {
    // stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kCue);

	// unload the scene file
	gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);

	var nextLevel = new MyGame();	// the next level
	gEngine.Core.startScene(nextLevel);
};
