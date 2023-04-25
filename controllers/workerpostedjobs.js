//import bcrypt from 'bcryptjs';

//import jwt from 'jsonwebtoken';

//import Profileuser from '../models/user.js';
import { Sequelize } from 'sequelize';
//import sequelize from '../utils/database.js';

import Jobsposted_table from '../models/jobsposted.js';
import workerpostedjob from '../models/workerpostedjob.js';
import sequelize from '../utils/database.js';
//const { Op } = require('sequelize');
//const sequelize= Sequelize;
//module.createRequire()
const { Op, FLOAT } = Sequelize;
const startedDate = new FLOAT(-30.11);
const endDate = new FLOAT(-39.12);





//????????????         ????????????         ????????????             ????????????         ????????????        ????????????
//JOB TABLE INSERT

const workerpostedjobs_insert = (req, res, next) => {
       
  workerpostedjob.create(({
            reporterid: req.body.reporterid,
            position: req.body.position,
            job: req.body.job,
            locationname: req.body.locationname,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            workinghours: req.body.workinghours,
            jobdate: req.body.jobdate, 
        }))
        .then(() => {
            res.status(200).json({message: "job post created"});
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({message: "error while creating the job post"});
        });
      
  
  
};





const workerpostedjobs_retrive24hourjob = (req, res, next) => {
  sequelize.query(
   // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
    //"SELECT * FROM (SELECT  jobid,reporterid,position,job,locationname,latitude,longitude,workinghours,jobdate , ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM workerpostedjobs HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate between :startdate and :enddate) AND (position=:position)",
    "SELECT * FROM (SELECT  jobid,users.userid,name,position,avgrating,job,locationname,latitude,longitude,verificationstatus,workinghours,image,jobdate, ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM workerpostedjobs,users,userratings,userverificationstatuses WHERE users.userid=workerpostedjobs.reporterid AND workerpostedjobs.reporterid=userratings.userid AND workerpostedjobs.reporterid=userverificationstatuses.userid HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate between :startdate and :enddate) AND (position=:position)",

    
    // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
     {
     replacements: { 
         status1: req.body.latitude,
         status2: req.body.longitude,
         startdate: req.body.currenttime,
         enddate: req.body.endtime,
         position: req.body.position},
       type: Sequelize.QueryTypes.SELECT
     }
   )
   .then(result => {
     if (result=='') {
         return res.status(404).json({message: "user not found"});
     } else {

       
        res.json(result);
        
     };
 })
   //.then((result1) =>  res.status(200).json(result1))
   .catch((error) =>  res.status(404).json({errorInfo: error}));
};

  






export { workerpostedjobs_insert,workerpostedjobs_retrive24hourjob };



















 /*        index nmber 81

                var objs = [];
                 for (var i = 0; i < result.length; i++) {
                   objs.push({
                    jobid: result[i].jobid,
                     reporterid: result[i].reporterid,
                     aboutjob: result[i].aboutjob,
                     position: result[i].position,
                     localarea: result[i].localarea,
                     address: result[i].address,
                     latitude: result[i].latitude,
                     longitude: result[i].longitude,
                     image: result[i].image,
                     providefood: result[i].providefood,
                     contractorwork: result[i].contractorwork,
                     date: result[i].date,
                   });
                 }
                 res.status(200).send(JSON.stringify(objs));
            */













/* 141 

    const location = sequelize.literal(`ST_GeomFromText('jobsposted(${lng} ${lat})', 4326)`);

    User.findAll({
      attributes: [[sequelize.fn('ST_Distance_Sphere', sequelize.literal('geolocation'), location),'distance']],
      order: 'distance',
      limit: 10,
      logging: console.log
    })
    .then(function(instance){
      console.log(instance);
    })





    var lat = parseFloat(req.body.latitude);
    var lng = parseFloat(req.body.longitude);
    var attributes = Object.keys(jobsposted.attributes);

    var location = sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})')`);
    var distance = sequelize.fn('ST_Distance_Sphere', sequelize.literal('geolocation'), location);
    attributes.push([distance,'distance']);

    var query = {
      attributes: attributes,
      order: distance,
      include: {model: Address, as: 'address'},
      where: sequelize.where(distance, {$lte: maxDistance}),
      logging: console.log
    }

*/