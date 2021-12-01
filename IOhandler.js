/*
 * Project:
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const { dir } = require("console");
const { resolve } = require("path");
const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  if (fs.existsSync(pathOut)) {
    console.log("File Path Exists");
  } else {
    console.log("create")
    return new Promise((resolve, reject) => {
      fs.createReadStream(`${pathIn}`)
      .pipe(unzipper.Extract({ path: `${pathOut}` }))
      .on("finish", function () {
        resolve("Extraction operation complete")})
      .on("error", function() {
        resolve("Extraction operation complete")
      })
    })
}};

// unzip("myfile.zip", "unzipped");

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    const png = []
    fs.readdir(dir, function(err, images) {
      if (err) {
        reject(err);
      } else {
        for (let image of images) {
          if (path.extname(image) === ".png") {
            png.push(`${image}`)
          }
        }
        console.log(png)
        resolve(png)
      }
    })
  });
};

readDir("./unzipped");

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */

const grayScale = (image, pathOut) => {
  var fs = require("fs"),
    PNG = require("pngjs").PNG;
  
  fs.createReadStream(`${image}`)
    .pipe(
    new PNG()
    )
    .on("parsed", function () {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {  
          var idx = (this.width * y + x) << 2;        
          var gray = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
          // grayscale
          this.data[idx] = gray;
          this.data[idx + 1] = gray;
          this.data[idx + 2] = gray;
        }
      }
      this.pack().pipe(fs.createWriteStream(`./${pathOut}/grayscaled${x}.png`))
    })
};

grayScale("./unzipped/in.png", "./grayscaled");

module.exports = {
  unzip,
  readDir,
  grayScale,
};
