function MyGame() {

    // scene file name
    this.kSceneFile = "src/Assets/scene.xml";

    // all squares
    this.mSqSet = new Array(); // these are the renderable objects

    // The Camera to view the scene
    this.mCamera = null;

    // Initialize the game
    //this.initialize();
};

MyGame.prototype.loadScene = function () {
	gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

MyGame.prototype.unloadScene = function () {
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
};

MyGame.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);

    // Step A: set up the cameras
    this.mCamera = sceneParser.parseCamera();

    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);	// set background to dark grey

    // Step B: create the shader
    sceneParser.parseSquares(this.mSqSet);

    // Step F: Start the game loop running
    //gEngine.GameLoop.start(this);
};

// The update funciton, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    // For this very simple gam, lets move the white square and pulse the red
    var whiteXform = this.mSqSet[0].getXform();
    var delta = 0.05;

    // Step A: test for white square movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (whiteXform.getXPos() > 30) // this is right-bound of the window
            whiteXform.setPosition(10, 60);
        whiteXform.incXPosBy(delta);
    }

    // Step B: test for white square rotation
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        whiteXform.incRotationByDegree(25);
    }

    // Step C: pulse the red square
    var redXform = this.mSqSet[1].getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (redXform.getWidth() > 5)
            redXform.setSize(2, 2);
        redXform.incSizeby(delta);
    }
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