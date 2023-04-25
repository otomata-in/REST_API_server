//const fs = require("fs");
import * as fs from 'fs';
import Jobsposted_table from '../models/jobsposted.js';
//import { filenameofimage } from './midilewareupload.js';
import multer from "multer";
var filenameofimage;

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};
var filenameofimage;
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    filenameofimage=`${Date.now()}-jobposted-${file.originalname}`;
    console.log("name"+filenameofimage);
    cb(null, filenameofimage);
  },
});



var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
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
export { uploadFile };
