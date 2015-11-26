/******************************************************
* File: Engine_GameLoop.js
* Description: Game Loop Class
* Author: Jason McBride
* Date: Nov 16th 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
*******************************************************/
"use strict" // Operate in Strict mode

var gEngine = gEngine || {};

// Instance variable
var kFPS = 60;				// Frames per second
var kMPF = 1000 / kFPS;		// Milleseconds per frame.

// Variables for timing gameloop.
var mPreviousTime;
var mLagTime;
var mCurrentTIme;
var mElapsedTime;

// The current loop state (running or should stop) 
var mIsLoopRunning = false;

// Reference to game logic
var mMyGame = null;

// This function assumes it is sub-classed from Game
var _runLoop = function () {
    if (mIsLoopRunning) {

        // Step A: set up for next call to _runLoop and update input!
        requestAnimationFrame(function () { _runLoop.call(mGame); });

        // Step B: compute elapsed time since last RunLoop was executed
        mCurrentTIme = Date.now();
        mElapsedTime = mCurrentTIme - mPreviousTime;
        mPreviousTime = mCurrentTIme;
        mLagTime += mElapsedTime;

        // Setp C: update the game the appropriate number of times
        // 		   Update only ever Milliseconds per frame.
        //		   If lag larger than update frames, update until caught up
        while ((mLagTime >= kMPF) && mIsLoopRunning) {
            gEngine.Input.update();
            this.update();		// call Game.update();
            mLagTime -= kMPF;
        }

        // Step D: now let's draw
        this.draw();		// Call Game.draw()
    }
};

var _startLoop = function () {
    // Step A: reset frame time
    mPreviousTime = Date.now();
    mLagTime = 0.0;
    // Step B: remember that loop is now running
    mIsLoopRunning = true;
    // Step C: request _runLoop to start when loading is done
    requestAnimationFrame(function () { _runLoop.call(mMyGame); });
};

var start = function (myGame) {
    mMyGame = myGame;
    gEngine.ResourceMap.setLoadCompletedCallback(
        function () {
            mMyGame.initialize();
            _startLoop();
        });
};

gEngine.GameLoop = (function () {
    var mPublic = {
        start: start
    };
    return mPublic;
}());