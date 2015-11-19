/******************************************************
* File: Engine_ResourceMaps.js
* Description: Game Resource Map Class
* Author: Jason McBride
* Date: Nov 19th 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
*******************************************************/
"use strict" // Operate in Strict mode

var gEngine = gEngine || {};

var MapEntry = function (rName) {
    this.mAsset = rName;
};

gEngine.Resourcemap = (function () {
    // resource storage
    var mResourceMap = {};

    // number of outstanding load operations
    var mNumOutstandingLoads = 0;

    // callback function when all textures are loaded
    var mLoadCompleteCallback = null;

    var _checkForAllLoadCompleted = function () {
        if ((mNumOutstandingLoads === 0) && (mLoadCompleteCallback !== null)) {
            // ensures the load complete call back will only be called once
            var funToCall = mLoadCompleteCallback;
            mLoadCompleteCallback = null;
            funToCall();
        }
    };

    // make sure to set the callback _AFTER_ all load commands are issued
    var setLoadCompleteCallback = function (funct) {
        mLoadCompleteCallback = funct;
        // in case all loading are done
        _checkForAllLoadCompleted();
    };

    var asyncLoadRequested = function (rName) {
        mResourceMap[rName] = new MapEntry(rName);
        // place holder for the resource to be loaded
        ++mNumOutstandingLoads;
    };

    var asyncLoadCompleted = function (rName, loadedAsset) {
        if (!isAssetLoaded(rName))
            alert("gEngine.asyncLoadCompleted: [" + rName + "] not in map!");

        mResourceMap[rName].mAsset = loadedAsset;
        --mNumOutstandingLoads;
        _checkForAllLoadCompleted();
    };

    var isAssetLoaded = function (rName) {
        return (rName in mResourceMap);
    };

    var retrieveAsset = function (rName) {
        var r = null;
        if (rName in mResourceMap)
            r = mResourceMap[rName].mAsset;
        return r;
    };

    var unloadAsset = function (rName) {
        if (rName in mResourceMap)
            delete mResourceMap[rName];
    };

    // public interface for this object
    var mPublic = {
        // asynchronous resource loading support
        asyncLoadRequested: asyncLoadRequested,
        asyncLoadCompleted: asyncLoadCompleted,
        setLoadCompleteCallback: setLoadCompleteCallback,

        // resource storage
        retrieveAsset: retrieveAsset,
        unloadAsset: unloadAsset,
        isAssetLoaded: isAssetLoaded
    };

    return mPublic;
}());