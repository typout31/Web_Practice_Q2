/*
 * Project: Practice Final Question 2
 * File Name: main.js
 * Description: main file that runs iohandler
 *
 * Created Date: Nov 29
 * Author: Nicholas Chu
 * 
 *
 */

const { unzip } = require("unzipper");

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

IOhandler.unzip(zipFilePath, pathUnzipped)
  .then((msg) => console.log(msg))
  .then((data) => IOhandler.readDir(pathUnzipped))
  .then((data) => data.forEach(image => {
    IOhandler.grayScale(`${pathUnzipped}/${image}`, pathProcessed)
  .catch((err) => console.log(err))
}))

