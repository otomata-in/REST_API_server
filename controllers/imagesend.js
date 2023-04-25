//const fs = require("fs");
import * as fs from 'fs';
//import * as fs from 'fs';
//import { exists } from fs;
//import Jobsposted_table from '../models/jobsposted.js';
//import { filenameofimage } from './midilewareupload.js';
//import multer from "multer";
//import * as http from 'http';
import * as path from 'path';
//import * as url from 'url';
//import * as fs from 'fs';
//const http = require("http");
//const fs = require("fs");
//const path = require("path");
//const url = require("url");
//var filenameofimage;
const Imagesend = (req, res, next) => {
  //var request = url.parse(req.url, true);
  
    // Extracting the path of file
    var action = req.body.image;
  
    // Path Refinements
    var filePath = path.join("./uploads", 
            action).split("%20").join(" ");
        console.log(filePath);
    // Checking if the path exists
    fs.exists(filePath, function (exists) {
  
        if (!exists) {
            res.writeHead(404, { 
                "Content-Type": "text/plain" });
            res.end("404 Not Founded");
            return;
        }
  
        // Extracting file extension
        var ext = path.extname(action);
  
        // Setting default Content-Type
        var contentType = "text/plain";
  
        // Checking if the extention of 
        // image is '.png'
        if (ext === ".png") {
            contentType = "image/jpeg";
        }
  
        // Setting the headers
        res.writeHead(200, { 
            "Content-Type": contentType });
  
        // Reading the file
        fs.readFile(filePath, 
            function (err, content) {
                // Serving the image
                res.end(content);
            });
    });


};

export { Imagesend };
//-----

//-----

//-----

//-----

/*




const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    return Jobsposted_table.create(({
      reporterid: req.body.reporterid,
      position: req.body.position,
      aboutjob: req.body.aboutjob,
      localarea: req.body.localarea,
      address: req.body.address,
      mapcoordinates: req.body.mapcoordinates,
      image: req.body.image,
      providefood: req.body.providefood,
      contractorwork: req.body.contractorwork,
      date: req.body.date,
     
      
  }))
  .then(() => {
      res.status(200).json({message: "job post created"});
  })
  .catch(err => {
      console.log(err);
      res.status(502).json({message: "error while creating the job post"});
  });


  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};
*/

//module.exports = {
//  uploadFiles,
//};

