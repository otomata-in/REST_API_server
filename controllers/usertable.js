//import bcrypt from 'bcryptjs';

//import jwt from 'jsonwebtoken';

//import Profileuser from '../models/user.js';
import User from '../models/user.js';
import Userrating from '../models/userrating.js';
import NumFollowing from '../models/numfollowing.js';

import Usertoken from '../models/userToken.js';
import {  Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';


const Usertable_registertoken = (req, res, next) => {

    var val;
    var uid;
    var usid;

    // checks if email already exists
    Usertoken.findOne({ where : {
        mobileno: req.body.mobileno, 
    }})
    .then(dbUser => {
       if(dbUser==null)
       {
            //generating randowm number and creating user id
            var val = Math.floor(1 + Math.random() * 9);
            //var otpcode=val;
           var uid=`${Date.now()}${val}`;
           var usid=parseInt(uid);
           console.log('uid generated isv** ** ** ** ** ** **'+usid);
        //res.status(300).json({dbUser});  
            Usertoken.create(({
                mobileno: req.body.mobileno,
                userid: usid, 
            }))
            .then(() => {
            //var flag=1200;
           // res.status(200).json({message: "user created"});
                Usertoken.findOne({ where : {
                mobileno: req.body.mobileno, 
                }})
                .then(dbUser => {
                res.status(200).json(dbUser);
                })
                .catch(err => {
                console.log('error', err);
                res.status(502).json({message: "error while register the user in"}); 
                });
    
            })
            .catch(err => {
                var flag=1502;
                res.status(502).json({message: "error while creating the user"+err});
            }); 
       }
       else{
        res.status(209).json(dbUser);
       }
  
     })
 .catch(err => {
     console.log('error', err);
     res.status(502).json({message: "error exception"}); 
 });
};











const User_otpgenerate = (req, res, next) => {

        try{
            var val = Math.floor(10000 + Math.random() * 90000);
            console.log(val);
            var otpcode=val;
            return res.status(200).json({otpcode:otpcode});
        }
    catch{
     console.log('error', err);
     return res.status(502).json({message: "error exception"}); 
 }
};






const Usertable_update = (req, res, next) => {

    User.findOne({ where : {
        userid: req.body.userid,
    }})
    .then(dbUser => {
       if(dbUser!=null)
       {
  // res.json(req.body[1]).status(200);
        User.update({ 
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
            email: req.body.email,
            locationaddress: req.body.locationaddress,
            image: req.body.image,
            },
            {where: { userid: req.body.userid}
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
/*
const Usertable_registertoken = (req, res, next) => {
    // checks if email already exists
    sequelize.query(
        // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
         //"SELECT * FROM (SELECT  jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate , ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate not between :startdate and :enddate) AND (position IN (SELECT professions FROM profession_tables WHERE mobileno=:mobileno))",
         "SELECT * FROM `userratings` WHERE tokenid=:tokenid",
         // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
          {
          replacements: { 
              
            tokenid: req.body.tokenid,},
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



*/















const Usertable_insert1 = (req, res, next) => {
     // checks if email already exists
     User.findOne({ where : {
        userid: req.body.userid, 
    }})
    .then(dbUser => {
        if (dbUser!=null) {
            return res.status(209).json({message: "this profile exists in jobq"});
        } else {
            // password hash
           
                    User.create(({
                        userid: req.body.userid,
                        name: req.body.name,
                        dob: req.body.dob,
                        gender: req.body.gender,
                        email: "",
                        locationaddress: "",
                        categoryrole: req.body.categoryrole,
                        image: "",
                       
                    }))
                    .then(() => {
                        var flag=1200;
                        res.status(200).json({message: "user created"});
                    })
                    .catch(err => {
                        var flag=1502;
                        //console.log(err);
                       res.status(502).json({message: "error while creating the user"});
                    });
   


        };
    })
    .catch(err => {
        console.log('error', err);
        res.status(502).json({message: "error exception"}); 
    });
  
};





const Usertable_insert = (req, res, next) => {
    // checks if email already exists
    User.findOne({ where : {
       userid: req.body.userid, 
   }})
   .then(dbUser => {
       if (dbUser!=null) {
           return res.status(209).json({message: "this profile exists in jobq"});
       } else {
           // password hash
           sequelize.query(
            // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
             //"SELECT * FROM (SELECT  jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate , ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate not between :startdate and :enddate) AND (position IN (SELECT professions FROM profession_tables WHERE mobileno=:mobileno))",
            // "SELECT * FROM `userlanguageknown` WHERE tokenid=:tokenid",
            "INSERT INTO `userverificationstatuses`(`userid`, `verificationstatus`) VALUES (:userid,:status)", {
                replacements: { 
                  userid: req.body.userid,
                  name: req.body.name,
                  dob: req.body.dob,
                  gender: req.body.gender,
                  email: "",
                  locationaddress: "",
                  categoryrole: req.body.categoryrole,
                  image: "",
                  status:"0" ,},
                  type: Sequelize.QueryTypes.INSERT
                })
                .then(dbUser1 => {
                  //  res.json(dbUser1).status(200);
                  sequelize.query(
                    "INSERT INTO `users`(`userid`, `name`, `dob`, `gender`, `email`, `locationaddress`, `categoryrole`, `image`) VALUES (:userid, :name, :dob, :gender, :email, :locationaddress, :categoryrole, :image)",
                // "UPDATE `userverificationstatuses` SET `verificationstatus`=:status WHERE tokenid=:tokenid",
                 // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
                  {
                  replacements: { 
                    userid: req.body.userid,
                    name: req.body.name,
                    dob: req.body.dob,
                    gender: req.body.gender,
                    email: "",
                    locationaddress: "",
                    categoryrole: req.body.categoryrole,
                    image: "",
                    status:"0" ,},
                    type: Sequelize.QueryTypes.INSERT
                  }
                )
                .then(dbUser1 => {
                    //res.json(dbUser1).status(200);
                    sequelize.query(
                        "INSERT INTO `userratings`(`userid`, `avgrating`, `teamrate`, `beharate`, `punrate`, `hardrate`, `review`, `likes`, `dislikes`, `reports`) VALUES (:userid,0,0,0,0,0,'',0,0,0)",
                        //"INSERT INTO `users`(`tokenid`, `name`, `dob`, `gender`, `email`, `locationaddress`, `categoryrole`, `image`) VALUES (:tokenid, :name, :dob, :gender, :email, :locationaddress, :categoryrole, :image)",
                    // "UPDATE `userverificationstatuses` SET `verificationstatus`=:status WHERE tokenid=:tokenid",
                     // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
                      {
                      replacements: { 
                        userid: req.body.userid,
                       },
                        type: Sequelize.QueryTypes.INSERT
                      }
                    )
                    .then(dbUser1 => {
                        sequelize.query(
                            "INSERT INTO `numfollowings`( `userid`, `numoffollowers`, `numoffollowing`) VALUES (:userid,0,0)",
                            //"INSERT INTO `userratings`(`userid`, `avgrating`, `teamrate`, `beharate`, `punrate`, `hardrate`, `review`, `likes`, `dislikes`, `reports`) VALUES (:userid,0,0,0,0,0,'',0,0,0)",
                            //"INSERT INTO `users`(`tokenid`, `name`, `dob`, `gender`, `email`, `locationaddress`, `categoryrole`, `image`) VALUES (:tokenid, :name, :dob, :gender, :email, :locationaddress, :categoryrole, :image)",
                        // "UPDATE `userverificationstatuses` SET `verificationstatus`=:status WHERE tokenid=:tokenid",
                         // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
                          {
                          replacements: { 
                            userid: req.body.userid,
                           },
                            type: Sequelize.QueryTypes.INSERT
                          }
                        )
                        .then(dbUser1 => {
                            res.status(200).json({message: "sucess"});  
                        })
                        .catch((error) =>  res.status(502).json({errorInfo: error})); 
                    })
                    .catch((error) =>  res.status(502).json({errorInfo: error})); 
                 })
                 .catch((error) =>  res.status(502).json({errorInfo: error})); 
             })
            .catch((error) =>  res.status(502).json({errorInfo: error}));  


       };
   })
   .catch(err => {
       console.log('error', err);
       res.status(502).json({message: "error exception"}); 
   });
 
};



export { Usertable_insert,Usertable_registertoken,Usertable_update,User_otpgenerate,Usertable_insert1 };
