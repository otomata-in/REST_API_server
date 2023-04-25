//import bcrypt from 'bcryptjs';

//import jwt from 'jsonwebtoken';
import {  Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';
//import Profileuser from '../models/user.js';
import Eventrating from '../models/eventrating.js';
import Userrating from '../models/userrating.js';

const Eventrating_insert = (req, res, next) => {

    Eventrating.create(({
        Eventid: req.body.Eventid,
        rateduserid: req.body.rateduserid,
        avgrating: req.body.avgrating,
        teamrate: req.body.teamrate,
        beharate: req.body.beharate,
        punrate: req.body.punrate,
        hardrate: req.body.hardrate,
        review: req.body.review,
        rateruserid: req.body.rateruserid,
        like: req.body.like,
        dislike: req.body.dislike,
        report: req.body.report,
        reportcomment: req.body.reportcomment,
    }))
    .then(dbUser => {
        if (!dbUser) {
            return res.status(502).json({message: "Error to create RATING EVENT"});
        } 
        else {
            sequelize.query(
                // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
                 //"SELECT * FROM (SELECT  jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate , ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate not between :startdate and :enddate) AND (position IN (SELECT professions FROM profession_tables WHERE mobileno=:mobileno))",
                 "SELECT   AVG(`teamrate`) AS uteamrate, AVG(`beharate`) as ubeharate, AVG(`punrate`) as upunrate, AVG(`hardrate`) as uhardrate, SUM(`like`) as ulike, SUM(`dislike`) as udislike, SUM(`report`) as ureport FROM `eventratings` WHERE rateduserid=:rateduserid",
                 // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
                  {
                  replacements: { 
                      
                    rateduserid: req.body.rateduserid},
                    type: Sequelize.QueryTypes.SELECT
                  }
                )
                .then(dbUser1 => {
                  if (!dbUser1) {
                    return res.status(502).json({message: "there is no userrating record for this user"});
                  } else {
        
                    //return res.status(200).json({message: dbUser1});
               
                   //res.json(dbUser1).status(200);
                      
               
                      
                    var teamratetotal=dbUser1[0].uteamrate;
                    
                    var beharatetotal=dbUser1[0].ubeharate;
                    var punratetotal=dbUser1[0].upunrate;
                    var hardratetotal=dbUser1[0].uhardrate;
                    var liketotal=dbUser1[0].ulike;

                    var disliketotal=dbUser1[0].udislike;
                    var reporttotal=dbUser1[0].ureport;
                    var avgratingtotal=((parseInt(teamratetotal)+parseInt(beharatetotal)+parseInt(punratetotal)+parseInt(hardratetotal))/4);
                    console.log("avgratingtotal"+avgratingtotal);
                    //res.json({message: teamratetotal}).status(200);
                    //var beharatetotal=NUMBER(dbUser1.beharate)+ req.body.beharate;
                    
                         Userrating.update({ 
                        avgrating: avgratingtotal,
                        teamrate: teamratetotal,
                        beharate: beharatetotal,
                        punrate: punratetotal,
                        hardrate: hardratetotal,
                        likes: liketotal,
                        dislikes: disliketotal,
                        reports: reporttotal,},
                        {where: {userid: req.body.rateduserid}})
                        .then(function (result) {
                            res.json({result}).status(200);
        
                        }).catch(function (err) {
                            res.json({result}).status(502);
                    });
                     
                  };
              })
                //.then((result1) =>  res.status(200).json(result1))
                .catch((error) =>  res.status(404).json({errorInfo: error}));














            /*
            res.json({dbUser}).status(200);
            Userrating.findOne({ where : {
                mobileno: req.body.mobileno, 
            }})
            .then(dbUser1 => {
                if (!dbUser1) {
                    return res.status(409).json({message: "there is no userrating record for this user"});
                } 
                else{
                    // var obj1=dbUser1.json;
                    // const obj = JSON.parse(obj1);
                    //console.log(obj.mobileno);
                    //console.log('data-------------!!!!!!!!---!!!---!!!!', dbUser1.body.mobileno);
                    //res.status(200).json(dbUser1.mobileno);
                    
                    var avgratingtotal=(Number(dbUser1.avgrating)+ Number(req.body.avgrating))/2;
                    var teamratetotal=(Number(dbUser1.teamrate)+ Number(req.body.teamrate))/2;
                    
                    var beharatetotal=(Number(dbUser1.beharate)+ Number(req.body.beharate))/2;
                    var punratetotal=(Number(dbUser1.punrate)+ Number(req.body.punrate))/2;
                    var hardratetotal=(Number(dbUser1.hardrate)+ Number(req.body.hardrate))/2;
                    var liketotal=Number(dbUser1.like)+ Number(req.body.like);

                    var disliketotal=Number(dbUser1.dislike)+ Number(req.body.dislike);
                    var reporttotal=Number(dbUser1.report)+ Number(req.body.report);
                    avgratingtotal=((teamratetotal+beharatetotal+punratetotal+hardratetotal)/4);
                    //var beharatetotal=NUMBER(dbUser1.beharate)+ req.body.beharate;

                         Userrating.update({ 
                        avgrating: avgratingtotal,
                        teamrate: teamratetotal,
                        beharate: beharatetotal,
                        punrate: punratetotal,
                        hardrate: hardratetotal,
                        likes: liketotal,
                        dislikes: disliketotal,
                        reports: reporttotal,},
                        {where: {mobileno: req.body.mobileno}})
                        .then(function (result) {
                            res.json({result}).status(200);
        
                        }).catch(function (err) {
                            res.json({result}).status(502);
                    });
                
                }
                
            })
            .catch(err => {
                console.log('error', err);
                res.status(1000).json({message: "error exception"}); 
            });  
            */
        }; 
    })
    .catch(err => {
        console.log('error', err);
        res.status(502).json({message: "total"});
    });
      

}



export { Eventrating_insert };





/* Eventrating.create(({
                        mobileno: req.body.mobileno,
                        Eventid: req.body.Eventid,
                        rateduserid: req.body.rateduserid,
                        avgrating: req.body.avgrating,
                        teamrate: req.body.teamrate,
                        beharate: req.body.beharate,
                        punrate: req.body.punrate,
                        hardrate: req.body.hardrate,
                        review: req.body.review,
                        rateruserid: req.body.rateruserid,
                        like: req.body.like,
                        dislike: req.body.dislike,
                        report: req.body.report,
                        reportcomment: req.body.reportcomment,
                        
                    }))

                    */

















                    /*
                     sequelize.query(
        // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
         "INSERT INTO `eventratings`(`mobileno`, `Eventid`, `rateduserid`, `avgrating`, `teamrate`, `beharate`, `punrate`, `hardrate`, `review`, `rateruserid`, `like`, `dislike`, `report`, `reportcomment`) VALUES (:mobileno, :Eventid, :rateduserid, :avgrating, :teamrate, :beharate, :punrate, :hardrate, :review, :rateruserid, :like, :dislike, :report, :reportcomment)",
         // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
          {
          replacements: { 
            mobileno: req.body.mobileno,
            Eventid: req.body.Eventid,
            rateduserid: req.body.rateduserid,
            avgrating: req.body.avgrating,
            teamrate: req.body.teamrate,
            beharate: req.body.beharate,
            punrate: req.body.punrate,
            hardrate: req.body.hardrate,
            review: req.body.review,
            rateruserid: req.body.rateruserid,
            like: req.body.like,
            dislike: req.body.dislike,
            report: req.body.report,
            reportcomment: req.body.reportcomment,
            },
            type: Sequelize.QueryTypes.SELECT
          }
        );
       
            console.log(results);
            res.status(404).json({message: metadata});
     
*/