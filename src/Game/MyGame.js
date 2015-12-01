function MyGame() {

    // scene file name
    this.kSceneFile = "src/Assets/scene.xml";

    this.kBgClip = "src/assets/sounds/BGClip.mp3";
    this.kCue = "src/assets/sounds/BlueLevel_cue.wav";

    // all squares
    this.mSqSet = new Array(); // these are the renderable objects

    // The Camera to view the scene
    this.mCamera = null;

    // Initialize the game
    //this.initialize();
};

// inherit from Scene abstract class
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
	gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    
    // load audio 
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
};

MyGame.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);

    // Step A: set up the cameras
    this.mCamera = sceneParser.parseCamera();

    // Step B: create the shader
    sceneParser.parseSquares(this.mSqSet);

    // start background music
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);

    // Step F: Start the game loop running
    //gEngine.GameLoop.start(this);
};

// The update funciton, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
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
            redXform.setSize(2, 2);
        redXform.incSizeby(delta);
    }
};

MyGame.prototype.unloadScene = function() {
     // stop background audio before unloading it
    gEngine.AudioClips.stopBackgroundAudio();

    // unload the scene resources
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kCue);

	// unload the scene file
	gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
	
    var nextLevel = new BlueLevel();        // next Level to be loaded
    gEngine.Core.startScene(nextLevel);
};

// This is the draw function, make sure to setup proper drawing environment,
// and more importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step C draw all the squares
    for (var i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
};