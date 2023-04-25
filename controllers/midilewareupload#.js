//const multer = require("multer");
import multer from "multer";

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
//module.exports = uploadFile;
//module.exports = {
//  uploadFile,
//};
export { uploadFile };
