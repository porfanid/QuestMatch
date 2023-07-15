#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Define the source and destination directories

const top_level_path="../../";

const sourceDir = path.join(top_level_path, '.github');
const destinationDir = path.join(top_level_path, 'docs');



/**
 * Emptying directory
 */
fs.readdir(destinationDir, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(destinationDir, file), (err) => {
      if (err){
        console.log("you will have to manually delete everything in the docs folder in the git top level directory and run the command:");
        console.log("node copy_to_docs.js");
        throw err;
        
        }
    });
  }
});


// Copy all files from ./edit-documentation/QuestMatch/build to ./docs
const buildDir = path.join(top_level_path, 'edit-documentation', 'QuestMatch', 'build');
fs.readdirSync(buildDir).forEach((file) => {
  const sourcePath = path.join(buildDir, file);
  const destinationPath = path.join(destinationDir, file);
  fs.cp(sourcePath, destinationPath, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      }
    });
  console.log(`Copied ${file} to ${destinationPath}`);
});

