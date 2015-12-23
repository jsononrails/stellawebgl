function MyGame() {

    // scene file name
    this.kSceneFile = "src/Assets/scene.xml";

	// textures (note: supports png transparency)
	this.kMinionSprite = "src/assets/minion_sprite.png";
	this.kFontImage = "src/assets/Consolas-72.png";
	
	// sounds
    this.kBgClip = "src/assets/sounds/BGClip.mp3";
    this.kCue = "src/assets/sounds/BlueLevel_cue.wav";

    // The Camera to view the scene
    this.mCamera = null;

	// the hero and the support objects
	this.mPortal = null;
	this.mMinion = null;
	this.mHero = null;
	this.mCollector = null;
	this.mFontImage = null;

};

// inherit from Scene abstract class
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
	gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    
	// loads the textures
	gEngine.Textures.loadTexture(this.kMinionSprite);
	gEngine.Textures.loadTexture(this.kFontImage);
	
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
	
	// Step B: Create the support objects
	this.mPortal = new SpriteRenderable(this.kMinionSprite);
	this.mPortal.setColor([1, 0, 0, 0.2]);	// tints red
	this.mPortal.getXform().setPosition(25, 60);
	this.mPortal.getXform().setSize(3, 3);
	this.mPortal.setElementPixelPositions(130, 310, 0, 180);
	
	this.mCollector = new SpriteRenderable(this.kMinionSprite);
	this.mCollector.setColor([0, 0, 0, 0]); // no tinting
	this.mCollector.getXform().setPosition(15, 60);
	this.mCollector.getXform().setSize(3, 3);
	this.mCollector.setElementPixelPositions(315, 495, 0, 180);
	
	// Step C: Create the font and minion images using sprite
	this.mFontImage = new SpriteRenderable(this.kFontImage);
	this.mFontImage.setColor([1, 1, 1, 0]);
	this.mFontImage.getXform().setPosition(13, 62);
	this.mFontImage.getXform().setSize(4, 4);
	
	this.mMinion = new SpriteRenderable(this.kMinionSprite);
	this.mMinion.setColor([1, 1, 1, 0]);
	this.mMinion.getXform().setPosition(26, 56);
	this.mMinion.getXform().setSize(5, 2.5);
	
	// Step D: Create the hero object with texture from lower-left corner
	this.mHero = new SpriteRenderable(this.kMinionSprite);
	this.mHero.setColor([1, 1, 1, 0]);
	this.mHero.getXform().setPosition(20, 60);
	this.mHero.getXform().setSize(2, 3);
	this.mHero.setElementPixelPositions(0, 120, 0, 180);
	
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
            xform.setXPos(20);
        }
    }

    // continously change texture tinting
    var c = this.mPortal.getColor();
    var ca = c[3] + deltaX;
    if (ca > 1) {
        ca = 0;
    }
    c[3] = ca;

	// new update code for changing the sub-texture regions being shown
	var deltaT = 0.001;
	
	// the font image
	// zoom into the texture by updating texture coordinate
	// for font: zoom to upper left corner by changing the bottom right
	var texCoord = this.mFontImage.getElementUVCoordinateArray();
	// the 8 elements
	// 		mTexRight, 	mTexTop		// x, y  of top-right
	//		mTexLeft,	mTexTop
	//		mTexRight,	mTexBottom
	//		mTexLeft,	mTexBottom
	var b = texCoord[SpriteRenderable.eTexCoordArray.eBottom] + deltaT;
	var r = texCoord[SpriteRenderable.eTexCoordArray.eRight] + deltaT;
	
	if (b > 1.0) b = 0;
	if (r < 0) r = 1.0;
	this.mFontImage.setElementUVCoordinate(
		texCoord[SpriteRenderable.eTexCoordArray.eLeft], r,
		b, texCoord[SpriteRenderable.eTexCoordArray.eTop]
	);
	
	// the minion image
	// for minon: zoom to bottom right corner by changing top left
	var texCoord = this.mMinion.getElementUVCoordinateArray();
	// the 8 elements
	// 		mTexRight, 	mTexTop		// x, y  of top-right
	//		mTexLeft,	mTexTop
	//		mTexRight,	mTexBottom
	//		mTexLeft,	mTexBottom
	var t = texCoord[SpriteRenderable.eTexCoordArray.eTop] - deltaT;
	var l = texCoord[SpriteRenderable.eTexCoordArray.eLeft] + deltaT;
	
	if (l > 0.5) l = 0;
	if (t < 0.5) t= 1.0;
	
	this.mMinion.setElementUVCoordinate(
		l, texCoord[SpriteRenderable.eTexCoordArray.eRight],
		texCoord[SpriteRenderable.eTexCoordArray.eBottom], t
	);
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