#!/usr/bin/env node

"use strict";

var fs = require("fs");

var path = require("path");

var args = require("minimist")(process.argv.slice(2),{
	boolean: ["help","in",],
	string: ["file",],
});





// If you pass in 2 args:
if (args.help || process.argv.length <= 2) {
	error(null,/*showHelp=*/true);
}
// If you only pass in 1 arg, it must be "file"
else if (args.file) {
  processFile(path.resolve(args.file))
} else {
    error("Usage incorrect.",/*showHelp=*/true);
  }


  function printHelp() {
    console.log("index.js usage:");
    console.log("");
    console.log("--help                      print this help");
    console.log("-, --in                     read file from stdin");
    console.log("--file={FILENAME}           read file from {FILENAME}");
    console.log("");
    console.log("");
  }

  function error(err,showHelp = false) {
    process.exitCode = 1;
    console.error(err);
    if (showHelp) {
      console.log("");
      printHelp();
    }
  }


  function processFile(filepath) {
    var contents = fs.readFileSync(filepath);
    process.stdout.write(contents)

  }
console.log(args)
