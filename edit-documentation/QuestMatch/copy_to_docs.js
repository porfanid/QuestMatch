#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Define the source and destination directories

const top_level_path="../../";

const sourceDir = path.join(".", 'back_up_docs');
const destinationDir = path.join(top_level_path, 'docs');



// Empty the destination directory before copying the generated docs.
fs.readdirSync(destinationDir).forEach((file) => {
  fs.rmSync(path.join(destinationDir, file), { recursive: true, force: true });
});


// Copy the specified files from ./back_up_docs/ to ./docs
const copyFiles = ["README.md"];
copyFiles.forEach((file) => {
  const sourcePath = path.join(sourceDir, file);
  const destinationPath = path.join(destinationDir, file);
  fs.copyFileSync(sourcePath, destinationPath);
  console.log(`Copied ${file} to ${destinationPath}`);
});
// End of copying the specified files from ./back_up_docs/ to ./docs

// Copy all files from ./edit-documentation/QuestMatch/build to ./docs
const buildDir = path.join(top_level_path, 'edit-documentation', 'QuestMatch', 'build');
fs.readdirSync(buildDir).forEach((file) => {
  const sourcePath = path.join(buildDir, file);
  const destinationPath = path.join(destinationDir, file);
  fs.cpSync(sourcePath, destinationPath, { recursive: true });
  console.log(`Copied ${file} to ${destinationPath}`);
});
// End of Copy all files from ./edit-documentation/QuestMatch/build to ./docs
