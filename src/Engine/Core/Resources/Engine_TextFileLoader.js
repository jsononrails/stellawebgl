/******************************************************
* File: Engine_TextFileLoader.js
* Description: Text File Loader Class
* Author: Jason McBride
* Date: Nov 19th 2015
* Version: 1.0
*
* $History$
* Version 1.0 - Initial
*******************************************************/
"use strict" // Operate in Strict mode

var gEngine = gEngine || {};

gEngine.TextFileLoader = (function () {

    // enum file types
    var eTextFileType = Object.freeze({
        eXMLFile: 0,
        eTextFile: 1
    });

    var loadTextFile = function (fileName, fileType, callbackFunction) {
        if (!(gEngine.ResourceMap.isAssetLoaded(fileName))) {
            // Update resources in load counter.
            gEngine.ResourceMap.asyncLoadRequested(fileName);

            // Asynchronously request the data from the server
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if ((req.readyState === 4) && (req.status !== 200)) {
                    alert(fileName + ": loading failed! [Hint: you cannot double click index.html to run this project. " + "The index.html file must be loaded by a web-server");
                }
            };
            req.open('GET', fileName, true);
            req.setRequestHeader('Content-Type', 'text/xml');

            // left off at req.onload = function() { ... etc.
        }
    };

    var mPublic = {};
    return mPublic;
}());