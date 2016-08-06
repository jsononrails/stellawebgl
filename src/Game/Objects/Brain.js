/******************************************************
 * File: Brain.js
 * Description: Brain Game Object
 * Author: Jason McBride
 * Date: Aug 5th, 2016
 * Version: 1.0
 *
 * $History$
 * Version 1.0 - Initial
 *******************************************************/
"use strict" // Operate in Strict mode

function Brain(spriteTexture) {
    this.kDeltaDegree = 1;
    this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
    this.kDeltaSpeed = 0.01;
    this.mBrain = new SpriteRenderable(spriteTexture);
    this.mBrain.setColor([1, 1, 1, 0]);
    this.mBrain.getXform().setPosition(50, 10);
    this.mBrain.getXform().setSize(3, 5.4);
    this.mBrain.setElementPixelPosition(600, 700, 0, 180);
    GameObject.call(this, this.mBrain);
    this.setSpeed(0.05);
}

gEngine.Core.inheritPrototype(Brain, GameObject);

Brain.prototype.update = function() {
    GameObject.prototype.update.call(this); // default moving forward
    var xf = this.getXform();
    var fdir = this.getCurrentFrontDir();
    
    // left
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xf.incRotationByDegree(this.kDeltaDegree);
        vec2.rotate(fdir, fdir, this.kDeltaRad);
    }

    // right
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        xf.incRotationByDegree(-this.kDeltaDegree);
        vec2.rotate(fdir, fdir, -this.kDeltaRad);
    }

    // up
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Up))
        this.incSpeedBy(this.kDeltaSpeed)
    
    // down
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Down))
        this.incSpeedBy(-this.kDeltaSpeed)
}