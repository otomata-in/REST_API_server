//import bcrypt from 'bcryptjs';

//import jwt from 'jsonwebtoken';

//complete user profle handling
import User from '../models/user.js';
import Userrating from '../models/userrating.js';
import Usereducation from '../models/usereducation.js';
import Userexperience from '../models/userexperience.js';
import userVerificationStatus from '../models/userVerificationStatus.js';
import Userlanguageknown from '../models/userlanguageknown.js';
import {  Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';






const UserprofileVerificationStatus = (req, res, next) => {
  
  // checks if email already exists
  sequelize.query(
     // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
      //"SELECT * FROM (SELECT  jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate , ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate not between :startdate and :enddate) AND (position IN (SELECT professions FROM profession_tables WHERE mobileno=:mobileno))",
     // "SELECT * FROM `userlanguageknown` WHERE tokenid=:tokenid",
      "UPDATE `userverificationstatuses` SET `verificationstatus`=:status WHERE userid=:userid",
      // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
       {
       replacements: { 
           
         userid: req.body.userid,status: req.body.status,},
         type: Sequelize.QueryTypes.UPDATE
       }
     )
     .then(dbUser1 => {
      res.json(dbUser1).status(200);
/*
       if (dbUser1=='') {
         return res.status(409).json({message: "there is no userrating record for this user"});
         
       } 
       else {
         res.json(dbUser1).status(200);
         
         //return res.status(200).json({message: dbUser1});
       };
       */
   })
     //.then((result1) =>  res.status(200).json(result1))
     .catch((error) =>  res.status(404).json({errorInfo: error}));  
};







const Userprofile_retrive = (req, res, next) => {
     // checks if email already exists
     sequelize.query(
        // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
         "SELECT * FROM (SELECT  jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate , ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate between :startdate and :enddate) AND (position IN (SELECT professions FROM profession_tables WHERE tokenid=:tokenid))",
         // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
          {
          replacements: { 
              status1: req.body.latitude,
              status2: req.body.longitude,
              startdate: req.body.startdate,
              enddate: req.body.enddate,
              tokenid: req.body.tokenid},
            type: Sequelize.QueryTypes.SELECT
          }
        )
        .then(result => {
          if (!result) {
              return res.status(404).json({message: "user not found"});
          } else {
  
            
             res.json(result);
             
          };
      })
        //.then((result1) =>  res.status(200).json(result1))
        .catch((error) =>  res.status(404).json({errorInfo: error}));
};


const Userprofileinsertlanguagesknown = (req, res, next) => {
    // checks if email already exists
    const insertdriver = req.body;
    //const insertpainter = req.body.painter;
    //const insertkulli = req.body.kulli;
    //const insertcontractor = req.body.contractor;
    //const insertdriver = req.body.driver;
   
    //res.status(200).json({message: authHeader});
    Userlanguageknown.bulkCreate((insertdriver))
    .then(() => {
        res.status(200).json({message: "userlanguages updated"});
    })
    .catch(err => {
        console.log(err);
        res.status(502).json({message: "error while creating the user"});

    });
};




const Userprofileinsertexperience = (req, res, next) => {
    // checks if email already exists
    const insertdriver = req.body;
    //const insertpainter = req.body.painter;
    //const insertkulli = req.body.kulli;
    //const insertcontractor = req.body.contractor;
    //const insertdriver = req.body.driver;
   
    //res.status(200).json({message: authHeader});
    Userexperience.bulkCreate((insertdriver))
    .then(() => {
        res.status(200).json({message: "user experience updated"});
    })
    .catch(err => {
        console.log(err);
        res.status(502).json({message: "error while adding experience"});
    });
};




const Userprofileinsertedcucation = (req, res, next) => {
    // checks if email already exists
    const insertdriver = req.body;
    //const insertpainter = req.body.painter;
    //const insertkulli = req.body.kulli;
    //const insertcontractor = req.body.contractor;
    //const insertdriver = req.body.driver;
   
    //res.status(200).json({message: authHeader});
    Usereducation.bulkCreate((insertdriver))
    .then(() => {
        res.status(200).json({message: "user-b edcucation updated"});
    })
    .catch(err => {
        console.log(err);
        res.status(502).json({message: "error while adcding edcucation"});
    });
};




const Userprofileretrivelanguagesknown = (req, res, next) => {
  
        // checks if email already exists
        sequelize.query(
           // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
            //"SELECT * FROM (SELECT  jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate , ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate not between :startdate and :enddate) AND (position IN (SELECT professions FROM profession_tables WHERE mobileno=:mobileno))",
            "SELECT * FROM `userlanguageknown` WHERE userid=:userid",
            // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
             {
             replacements: { 
                 
               userid: req.body.userid,},
               type: Sequelize.QueryTypes.SELECT
             }
           )
           .then(dbUser1 => {
             if (dbUser1=='') {
               return res.status(409).json({message: "there is no userrating record for this user"});
               
             } 
             else {
               res.json(dbUser1).status(200);
               
               //return res.status(200).json({message: dbUser1});
             };
         })
           //.then((result1) =>  res.status(200).json(result1))
           .catch((error) =>  res.status(404).json({errorInfo: error}));  
   };





const Userprofileretriveexperience = (req, res, next) => {
   
        // checks if email already exists
        sequelize.query(
           // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
            //"SELECT * FROM (SELECT  jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate , ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate not between :startdate and :enddate) AND (position IN (SELECT professions FROM profession_tables WHERE mobileno=:mobileno))",
            "SELECT * FROM `userexperience` WHERE userid=:userid",
            // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
             {
             replacements: { 
                 
               userid: req.body.userid,},
               type: Sequelize.QueryTypes.SELECT
             }
           )
           .then(dbUser1 => {
             if (dbUser1=='') {
               return res.status(409).json({message: "there is no userrating record for this user"});
               
             } 
             else {
               res.json(dbUser1).status(200);
               
               //return res.status(200).json({message: dbUser1});
             };
         })
           //.then((result1) =>  res.status(200).json(result1))
           .catch((error) =>  res.status(404).json({errorInfo: error}));  

};






const Userprofileretriveedcucation = (req, res, next) => {
 
        // checks if email already exists
        sequelize.query(
           // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
            //"SELECT * FROM (SELECT  jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate , ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate not between :startdate and :enddate) AND (position IN (SELECT professions FROM profession_tables WHERE mobileno=:mobileno))",
            "SELECT * FROM `usereducation` WHERE userid=:userid",
            // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
             {
             replacements: { 
                 
               userid: req.body.userid,},
               type: Sequelize.QueryTypes.SELECT
             }
           )
           .then(dbUser1 => {
             if (dbUser1=='') {
               return res.status(409).json({message: "there is no userrating record for this user"});
               
             } 
             else {
               res.json(dbUser1).status(200);
               
               //return res.status(200).json({message: dbUser1});
             };
         })
           //.then((result1) =>  res.status(200).json(result1))
           .catch((error) =>  res.status(404).json({errorInfo: error}));  

};









const Usereducation_updatechange = (req, res, next) => {

    Usereducation.findOne({ where : {
        userid: req.body.userid,
    }})
    .then(dbUser => {
       if(dbUser!=null)
       {
  // res.json(req.body[1]).status(200);
        Usereducation.update({ 
            education: req.body.education,
            },
            {where: { userid: req.body.userid,education: req.body.oldeducation}
            })

            .then(function (result) {
                var obj = JSON.parse(result);
                res.json({"message": obj}).status();
            })
            
            .catch(function (err) {
                res.json({"error": err}).status(502);
            });
       }
    else{
        res.status(400).json({"message": null});
       }
  
     })
 .catch(err => {
     console.log('error', err);
     res.status(1000).json({message: "error exception"}); 
 });
};







const Userexperience_updatechange = (req, res, next) => {

    Userexperience.findOne({ where : {
        userid: req.body.userid,
    }})
    .then(dbUser => {
       if(dbUser!=null)
       {
  // res.json(req.body[1]).status(200);
        Userexperience.update({ 
            experience: req.body.experience,
            yearofexperience: req.body.yearofexperience,
            },
            {where: { userid: req.body.userid,experience: req.body.experience}
            })

            .then(function (result) {
                var obj = JSON.parse(result);
                res.json({"message": obj}).status();
            })
            
            .catch(function (err) {
                res.json({"error": err}).status(502);
            });
       }
    else{
        res.status(400).json({"message": null});
       }
  
     })
 .catch(err => {
     console.log('error', err);
     res.status(1000).json({message: "error exception"}); 
 });
};




const Userlanguageknown_updatechange = (req, res, next) => {

    Userlanguageknown.findOne({ where : {
        userid: req.body.userid,
    }})
    .then(dbUser => {
       if(dbUser!=null)
       {
  // res.json(req.body[1]).status(200);
        Userlanguageknown.update({ 
            languages: req.body.languages,
            },
            {where: { userid: req.body.userid,languages: req.body.languages}
            })

            .then(function (result) {
                var obj = JSON.parse(result);
                res.json({"message": obj}).status();
            })
            
            .catch(function (err) {
                res.json({"error": err}).status(502);
            });
       }
    else{
        res.status(400).json({"message": null});
       }
  
     })
 .catch(err => {
     console.log('error', err);
     res.status(1000).json({message: "error exception"}); 
 });
};


const Userprofiledeleteedcucation = (req, res, next) => {
 
    // checks if email already exists
    sequelize.query(
       // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
        //"SELECT * FROM (SELECT  jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate , ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate not between :startdate and :enddate) AND (position IN (SELECT professions FROM profession_tables WHERE mobileno=:mobileno))",
        "Delete FROM `usereducation` WHERE userid=:userid and education=:education",
        // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
         {
         replacements: { 
             
           userid: req.body.userid,education: req.body.education,},
           type: Sequelize.QueryTypes.SELECT
         }
       )
       .then(dbUser1 => {
         if (dbUser1=='') {
           return res.status(409).json({message: "there is no userrating record for this user"});
           
         } 
         else {
           res.json(dbUser1).status(200);
           
           //return res.status(200).json({message: dbUser1});
         };
     })
       //.then((result1) =>  res.status(200).json(result1))
       .catch((error) =>  res.status(404).json({errorInfo: error}));  

};


const Userprofiledeleteexperience = (req, res, next) => {
   
    // checks if email already exists
    sequelize.query(
       // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
        //"SELECT * FROM (SELECT  jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate , ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate not between :startdate and :enddate) AND (position IN (SELECT professions FROM profession_tables WHERE mobileno=:mobileno))",
        "delete FROM `userexperience` WHERE userid=:userid and experience=:experience",
        // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
         {
         replacements: { 
             
           userid: req.body.userid,experience: req.body.experience,},
           type: Sequelize.QueryTypes.SELECT
         }
       )
       .then(dbUser1 => {
         if (dbUser1=='') {
           return res.status(409).json({message: "there is no userrating record for this user"});
           
         } 
         else {
           res.json(dbUser1).status(200);
           
           //return res.status(200).json({message: dbUser1});
         };
     })
       //.then((result1) =>  res.status(200).json(result1))
       .catch((error) =>  res.status(404).json({errorInfo: error}));  

};


const Userprofiledeletelanguagesknown = (req, res, next) => {
  
    // checks if email already exists
    sequelize.query(
       // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
        //"SELECT * FROM (SELECT  jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate , ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate not between :startdate and :enddate) AND (position IN (SELECT professions FROM profession_tables WHERE mobileno=:mobileno))",
        "delete FROM `userlanguageknown` WHERE userid=:userid and languages=:languages",
        // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
         {
         replacements: { 
             
           userid: req.body.userid,languages: req.body.languages,},
           type: Sequelize.QueryTypes.SELECT
         }
       )
       .then(dbUser1 => {
         if (dbUser1=='') {
           return res.status(409).json({message: "there is no userrating record for this user"});
           
         } 
         else {
           res.json(dbUser1).status(200);
           
           //return res.status(200).json({message: dbUser1});
         };
     })
       //.then((result1) =>  res.status(200).json(result1))
       .catch((error) =>  res.status(404).json({errorInfo: error}));  
};





export { Userprofile_retrive,
    Userprofileinsertlanguagesknown,
    Userprofileinsertexperience,
    Userprofileinsertedcucation,
    Userprofileretrivelanguagesknown,
    Userprofileretriveexperience,
    Userprofileretriveedcucation,
    Usereducation_updatechange,
    Userexperience_updatechange,
    Userlanguageknown_updatechange,
    Userprofiledeleteedcucation,
    Userprofiledeleteexperience,
    Userprofiledeletelanguagesknown,
    UserprofileVerificationStatus

};