import express from 'express';
//const express = require("express");
//import multer from 'multer';


//import { signup, login, isAuth } from '../controllers/auth.js';
import { Profession_insert ,Profession_retrive,Profession_bulkinsert } from '../controllers/professiontable.js';
import { Usertable_insert,Usertable_registertoken,Usertable_update,User_otpgenerate } from '../controllers/usertable.js';
import { Eventrating_insert } from '../controllers/eventrating.js';
import { Userrating_retrive } from '../controllers/userrating.js';

import { homepagedata1,following_add,homepagedataforprofile } from '../controllers/homepagedata.js';

import { Imagesend } from '../controllers/imagesend.js';
import { Jobsposted_insert,Jobsposted_retrive, Jobsposted_retrive2,Jobsposted_retrivenearbyjob,Jobsposted_retrive24hourjob,Jobsposted_retriveschedulejob } from '../controllers/jobspostedtable.js';
//import { Jobsposted_retrive1 } from '../controllers/jobspostedtable.js';
import { uploadFile } from '../controllers/uploadimage.js';
import { Userrating_insert } from '../controllers/userratinginsert.js';
import { workerpostedjobs_insert,workerpostedjobs_retrive24hourjob } from '../controllers/workerpostedjobs.js';
import { UserprofileVerificationStatus,Userprofiledeletelanguagesknown,Userprofiledeleteexperience,Userprofiledeleteedcucation,Userlanguageknown_updatechange,Userexperience_updatechange,Userprofileinsertlanguagesknown,Userprofileinsertexperience,Userprofileinsertedcucation,Userprofileretrivelanguagesknown,Userprofileretriveexperience,Userprofileretriveedcucation,Usereducation_updatechange  } from '../controllers/userprofile.js';
//import { uploadFile } from '../controllers/midilewareupload.js';
import { chattable_insert,chattablehome_retrive } from '../controllers/chattablepage.js';

const router = express.Router();

var filenameofimage;
//var uploadFile;
//var uploadFiles;

//controllers/auth
//router.post('/login', login);

//router.post('/signup', signup);

//router.get('/private', isAuth);


//controllers/chattable
router.post('/chattablehome_retrive', chattablehome_retrive);
router.post('/chattable_insert', chattable_insert);
//router.post('/Usertable_update', Usertable_update);
//router.post('/Userrating_insert', Userrating_insert);


//homepagedata
router.post('/homepagedata1', homepagedata1);
router.post('/homepagedataforprofile', homepagedataforprofile);

router.post('/following_add', following_add);




//controllers/usertable
router.post('/Usertable_registertoken', Usertable_registertoken);
router.post('/usertable_insertuser', Usertable_insert);
router.post('/Usertable_update', Usertable_update);
router.post('/Userrating_insert', Userrating_insert);
router.post('/User_otpgenerate', User_otpgenerate);



//controllers/userrating
router.post('/eventrating_insert', Eventrating_insert);


//controllers/userrating-retrive
router.post('/userrating_retrive', Userrating_retrive);
router.post('/Userprofileinsertlanguagesknown', Userprofileinsertlanguagesknown);
router.post('/Userprofileinsertexperience', Userprofileinsertexperience);
router.post('/Userprofileinsertedcucation', Userprofileinsertedcucation);

router.post('/Userprofileretrivelanguagesknown', Userprofileretrivelanguagesknown);
router.post('/Userprofileretriveexperience', Userprofileretriveexperience);
router.post('/Userprofileretriveedcucation', Userprofileretriveedcucation);

router.post('/Usereducation_updatechange', Usereducation_updatechange);
router.post('/Userexperience_updatechange', Userexperience_updatechange);
router.post('/Userlanguageknown_updatechange', Userlanguageknown_updatechange);

router.post('/Userprofiledeleteedcucation', Userprofiledeleteedcucation);
router.post('/Userprofiledeleteexperience', Userprofiledeleteexperience);
router.post('/Userprofiledeletelanguagesknown', Userprofiledeletelanguagesknown);
//UserprofileVerificationStatus
router.post('/UserprofileSetVerificationStatus', UserprofileVerificationStatus);
//router.post('/Userprofileinsertlanguagesknown', Userprofileinsertlanguagesknown);





//controllers/Professiontable
router.post('/professiontable_insert', Profession_insert);
router.post('/Profession_bulkinsert', Profession_bulkinsert);
router.post('/Profession_retrive', Profession_retrive);





//controllers/Jobpostedtable
router.post('/jobsposted_insert', Jobsposted_insert);
router.post('/Jobsposted_retrive', Jobsposted_retrive);
router.post('/Jobsposted_retrive2', Jobsposted_retrive2);
router.post('/Jobsposted_retrivenearbyjob', Jobsposted_retrivenearbyjob);
router.post('/Jobsposted_retrive24hourjob', Jobsposted_retrive24hourjob);
router.post('/Jobsposted_retriveschedulejob', Jobsposted_retriveschedulejob);





//workerpostedjobs
router.post('/workerpostedjobs_insert', workerpostedjobs_insert);

router.post('/workerpostedjobs_retrive24hourjob', workerpostedjobs_retrive24hourjob);





























//router.post("/upload", uploadFile.single("file"), uploadFiles);
router.post("/uploadimage", uploadFile.single("file"), (req, res) => {

    res.status(200).json({
        success: 1,
        profile_url: `${req.file.filename}`
    })
})








//image uploadc
router.post('/Imagedownloadmodule', Imagesend);

















router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

export default router;