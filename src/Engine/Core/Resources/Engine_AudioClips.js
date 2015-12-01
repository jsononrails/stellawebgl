/******************************************************
* File: Engine_AudioClips.js
* Description: Audio Clips Resource Class
* Author: Jason McBride
* Date: Nov 30th 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
*******************************************************/
"use strict" // Operate in Strict mode

var gEngine = gEngine || { };
gEngine.AudioClips = (function() {
	
	var mAudioContext = null;
	var mBgAudioNode = null;
	
	var InitAudioContext = function() {
		try {
			var AudioContext = window.AudioContext || window.webkitAudioContext;
			mAudioContext = new AudioContext();
		}
		catch(e) { alert("Web Audio is not supported."); }
	};
	
	var loadAudio = function(clipName) {
		if(!(gEngine.ResourceMap.isAssetLoaded(clipName))) {
			// update resources in load counter
			gEngine.ResourceMap.asyncLoadRequested(clipName);
			
			// asynchronously request the data from server
			var req = new XMLHttpRequest();
			req.onreadystatechange = function() {
				if((req.readyState === 4) && (req.status !== 200)) {
					alert(clipName + ": loading failed!");
				}
			};
			
			req.open('GET', clipNam, true);
			// specify that the request retrieves binary data
			req.responseType = 'arrayBuffer';
			
			req.onload = function() {
				// asynchronously decode, then call the function in parameter
				mAudioContext.decodeAudioData(req.response, function(buffer) {
					gEngine.ResourceMap.asyncLoadCompleted(clipName, buffer);
				});
			};
			req.send();
		} else {
			gEngine.ResourceMap.inAssetRefCount(clipName);
		}
	};
	
	var unloadAUdio = function(clipName) {
		gEngine.ResourceMap.unloadAsset(clipName);
	};
	
	var playACue = funciton(clipName) {
		var clipInfo = gEngine.ResourceMap.retrieveAsset(clipName);
		if(clipInfo != null) {
			// SourceNodes are one use only
			var sourceNode = mAudioContext.createBufferSource();
			sourceNode.buffer = clipInfo;
			sourceNode.connect(mAudioContext.destination);
			sourceNode.start(0);
		}
	};
	
	var playBackgroundAudio = function(clipName) {
		// TODO
	};
	
	var mPublic = { 
	};
	
	return mPublic;
}());