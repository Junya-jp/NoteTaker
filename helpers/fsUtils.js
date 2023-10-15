const fs = require('fs');
const util = require('util');
const path = require('path');
/*
// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
/*
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
/*
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
*/
// helpers/fsUtils.js

function readFromFile(filepath) {
    try {
        const fileContents = fs.readFileSync(filepath, 'utf8');
        return JSON.parse(fileContents) || [];
    } catch (error) {
        console.error('Error reading file:', error);
        return [];
    }
}

function readAndAppend(data, filepath) {
    try {
        const fileContents = readFromFile(filepath);
        fileContents.push(data);
        fs.writeFileSync(filepath, JSON.stringify(fileContents, null, 2), 'utf8');
    } catch (error) {
        console.error('Error appending to file:', error);
    }
}
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

module.exports = { readFromFile, readAndAppend, writeToFile };
