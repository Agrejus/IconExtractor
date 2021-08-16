"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIcon = void 0;
var path = require("path");
var os = require("os");
var child_process_1 = require("child_process");
var getPlatformIconProcess = function () {
    if (os.type() == 'Windows_NT') {
        return path.join(__dirname, '../bin/IconExtractor.exe');
        //Do stuff here to get the icon that doesn't have the shortcut thing on it
    }
    else {
        throw ('This platform (' + os.type() + ') is unsupported =(');
    }
};
var getIcon = function (fileNameAndPath) {
    return new Promise(function (resolve, reject) {
        var exe = getPlatformIconProcess();
        var command = child_process_1.exec(exe + " --path=\"" + fileNameAndPath + "\"");
        command.stdout.on("data", function (e) {
            resolve(e);
        });
        command.stderr.on("data", function (e) {
            reject(e);
        });
        command.on("error", function (e) {
            reject(e);
        });
    });
};
exports.getIcon = getIcon;
