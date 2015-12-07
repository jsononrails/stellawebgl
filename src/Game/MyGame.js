function MyGame() {

    // scene file name
    this.kSceneFile = "src/Assets/scene.xml";

	// textures (note: supports png transparency)
	this.kPortal = "src/assets/minion_portal.png";
	this.kCollector = "src/assets/minion_collector.png";
	
	// sounds
    this.kBgClip = "src/assets/sounds/BGClip.mp3";
    this.kCue = "src/assets/sounds/BlueLevel_cue.wav";

    // The Camera to view the scene
    this.mCamera = null;

	// the hero and the support objects
	this.mHero = null;
	this.mPortal = null;
	this.mCollector = null;

	
};

// inherit from Scene abstract class
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
	gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    
	// loads the textures
	gEngine.Textures.loadTexture(this.kPortal);
	gEngine.Textures.loadTexture(this.kCollector);
	
    // load audio 
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
	this.mCamera = new Camera(
	vec2.fromValues(20, 60), // position of the camera
	20, // width of camera
	[20, 40, 600, 300] // viewport (orgX, orgY, width, height)
	);
	this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
	// sets the background to gray
	// Step B: Create the game objects
	this.mPortal = new TextureRenderable(this.kPortal);
	this.mPortal.setColor([1, 0, 0, 0.2]); // tints red
	this.mPortal.getXform().setPosition(25, 60);
	this.mPortal.getXform().setSize(3, 3);
	this.mCollector = new TextureRenderable(this.kCollector);
	this.mCollector.setColor([0, 0, 0, 0]); // No tinting
	this.mCollector.getXform().setPosition(15, 60);
	this.mCollector.getXform().setSize(3, 3);
	// Step C: Create the hero object in blue
	this.mHero = new Renderable();
	this.mHero.setColor([0, 0, 1, 1]);
	this.mHero.getXform().setPosition(20, 60);
	this.mHero.getXform().setSize(2, 3);

};

// The update funciton, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    // let's only allow the movement of hero, 
    // and if hero moves too far off, this level ends, we will
    // load the next level
    var deltaX = 0.05;
    var xform = this.mHero.getXform();

    // Support hero movements
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        xform.incXPosBy(deltaX);
        if (xform.getXPos() > 30) { // this is the right-bound of the window
            xform.setPosition(12, 60);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xform.incXPosBy(-deltaX);
        if (xform.getXPos() < 11) {  // this is the left-bound of the window
            gEngine.GameLoop.stop();
        }
    }

    // continously change texture tinting
    var c = this.mPortal.getColor();
    var ca = c[3] + deltaX;
    if (ca > 1) {
        ca = 0;
    }
    c[3] = ca;
};

MyGame.prototype.unloadScene = function() {
     // stop background audio before unloading it
    gEngine.AudioClips.stopBackgroundAudio();

    // unload the scene resources
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kCue);

	// unload textures
	gEngine.Textures.unloadTexture(this.kPortal);
	gEngine.Textures.unloadTexture(this.kCollector);
	
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

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mPortal.draw(this.mCamera.getVPMatrix());
    this.mHero.draw(this.mCamera.getVPMatrix());
    this.mCollector.draw(this.mCamera.getVPMatrix());
   
};