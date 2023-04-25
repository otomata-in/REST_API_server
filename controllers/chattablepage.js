//import bcrypt from 'bcryptjs';

//import jwt from 'jsonwebtoken';

//import Profileuser from '../models/user.js';
import { Sequelize } from 'sequelize';
//import sequelize from '../utils/database.js';

import chattable from '../models/chattable.js';
import sequelize from '../utils/database.js';
//const { Op } = require('sequelize');
//const sequelize= Sequelize;
//module.createRequire()
const { Op, FLOAT } = Sequelize;

//const startedDate = new FLOAT(-30.11);
//const endDate = new FLOAT(-39.12);





//????????????         ????????????         ????????????             ????????????         ????????????        ????????????
//JOB TABLE INSERT

const chattable_insert = (req, res, next) => {
       
            chattable.create(({
              senderid: req.body.senderid,
              reciverid: req.body.reciverid,
              message: req.body.message,
              senddate: req.body.senddate,
              sendtime: req.body.sendtime,
              recivedate: req.body.recivedate,
              recivetime: req.body.recivetime,
              messageststus: req.body.messageststus,
        }))
        .then(() => {
            res.status(200).json({message: "message uploaded"});
        })
        .catch(err => {
            console.log(err);
            res.status(502).json({message: "error while sending meaasage"});
        });
      
  
  
};





//????????????         ????????????         ????????????             ????????????         ????????????        ????????????

//NEAR BY JOB PROVIDE
const chattablehome_retrive = (req, res, next) => {

     sequelize.query(
     // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
     // "SELECT * FROM (SELECT  senderid,reciverid,message,senddate,sendtime,recivedate,recivetime,messageststus FROM chattable HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate between :startdate and :enddate) AND (position IN (SELECT professions FROM profession_tables WHERE tokenid=:tokenid))",
     //"SELECT  (SELECT name FROM user where tokenid=senderid),reciverid,message,senddate,sendtime,recivedate,recivetime,messageststus FROM chattable where reciverid=:reciverid",
      "SELECT pz.name, f.message,f.senddate, f.sendtime,f.recivedate, f.recivetime, f.messageststus FROM user pz INNER JOIN chattable f ON pz.tokenid = f.senderid WHERE f.reciverid=:reciverid f.senddate=:senddate ORDER BY f.sendtime",
     // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
        {
        replacements: { 
          reciverid: req.body.reciverid},
          type: Sequelize.QueryTypes.SELECT
        }
      )
      .then(result => {
        if (!result) {
            return res.status(404).json({message: "no data history"});
        } else {

          
           res.json(result);
           
        };
    })
      //.then((result1) =>  res.status(200).json(result1))
      .catch((error) => 
       res.status(404).json({errorInfo: error})
      );
};





export { 
  chattable_insert,
  chattablehome_retrive
 };



















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