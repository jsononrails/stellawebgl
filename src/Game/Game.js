function Game(htmlCanvasID) {

    // variables of constant color shader
    this.mConstantColorShader = null;

    // variables for the squares
    this.mWhiteSq = null;
    this.mRedSq = null;

    // The Camera to view the scene
    this.mCamera = null;

    // Initialize the webGL context
    gEngine.Core.initializeEngineCore(htmlCanvasID);

    // Initialize the game
    this.initialize();
}

Game.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
		vec2.fromValues(20, 60),		// position of the camera
		20,								// width of the camera
		[20, 40, 600, 300]				// viewport (orgX, orgY, width, height)
	);

    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);	// set background to dark grey

    // Step B: create the shader
    this.mConstantColorShader = new SimpleShader(
	    "src/GLSLShaders/SimpleVS.glsl",    // Path to Vertexshader
        "src/GLSLShaders/SimpleFS.glsl"     // Path to FragmentShader
	);

    // Step C: Create the renderable objects:
    this.mWhiteSq = new Renderable(this.mConstantColorShader);
    this.mWhiteSq.setColor([1, 1, 1, 1]);
    this.mRedSq = new Renderable(this.mConstantColorShader);
    this.mRedSq.setColor([1, 0, 0, 1]);

    // Step D: Initialize the white renderable object: centered, 5x5, rotated
    this.mWhiteSq.getXform().setPosition(20, 60);
    this.mWhiteSq.getXform().setRotationInRad(0.2);     // In Radian
    this.mWhiteSq.getXform().setSize(5, 5);

    // Step E: Initialize the red renderable object: centered 2x2
    this.mRedSq.getXform().setPosition(20, 60);
    this.mRedSq.getXform().setSize(2, 2);

    // Step F: Start the game loop running
    gEngine.GameLoop.start(this);
};

// The update funciton, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Game.prototype.update = function () {
    // For this very simple gam, lets move the white square and pulse the red
    var whiteXform = this.mWhiteSq.getXform();
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
    var redXform = this.mRedSq.getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (redXform.getWidth() > 5)
            redXform.setSize(2, 2);
        redXform.incSizeby(delta);
    }
};

// This is the draw function, make sure to setup proper drawing environment,
// and more importantly, make sure to _NOT_ change any state.
Game.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step C: Activate the white shader to draw
    this.mWhiteSq.draw(this.mCamera.getVPMatrix());

    // Step D: Activate the red shader to draw
    this.mRedSq.draw(this.mCamera.getVPMatrix());
};