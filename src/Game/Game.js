function Game(htmlCanvasID) {
	
	// variables of constant color shader
	this.mConstantColorShader = null;
	
	// variables for the squares
	this.mWhiteSq = null/
	this.mRedSq = null;
	
	// The Camera to view the scene
	this.mCamera = null;
	
	// Initialize the webGL context
	gEngine.Core.initializeWebGL(htmlCanvasID);
	
	// Initialize the game
	this.initialize();
}

Game.prototype.initialize = function() {
	// Step A: set up the cameras
	this.mCamera = new Camera(
		vec2.fromValues(20, 60),		// position of the camera
		20,								// width of the camera
		[20, 40, 600, 300],				// viewport (orgX, orgY, width, height)
	);
	
	this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);	// set background to dark grey
	
	// Step B: create the shader
	this.mConstantColorShader = new SimpleShader(
		
	);
};