//import bcrypt from 'bcryptjs';

//import jwt from 'jsonwebtoken';

//import Profileuser from '../models/user.js';
import { Sequelize } from 'sequelize';
//import sequelize from '../utils/database.js';

import Following from '../models/following.js';
import NumFollowing from '../models/numfollowing.js';

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

const following_add = (req, res, next) => {
  var numoffollowers=0;
  var numoffollowing=0;

  Following.findOne({ where : {
    userid: req.body.userid,
    followingid: req.body.followingid,
}})
.then(dbUser => {
    if (dbUser!=null) {
        return res.status(209).json({message: "this relation alredy exists in jobq"});
    } else {

  Following.create(({
    userid: req.body.userid,
    followingid: req.body.followingid,
  }))
    .then((dbUser) => {
     // res.status(200).json({ message: "following added" });
        sequelize.query(
          "SELECT count(`followingid`) as numoffollowing FROM `followings` WHERE userid=:userid",
          {
            replacements: {

              userid: req.body.userid
            },
            type: Sequelize.QueryTypes.SELECT
          }
        )
          .then(dbUser1 => {
            
              numoffollowing = dbUser1[0].numoffollowing;

              sequelize.query(
                "SELECT count(`userid`) as numoffollowers FROM `followings` WHERE followingid=:userid",
                {
                  replacements: {

                    userid: req.body.userid
                  },
                  type: Sequelize.QueryTypes.SELECT
                }
              )
                .then(dbUser2 => {
                  //res.json(dbUser2).status(200);
                    numoffollowers = dbUser2[0].numoffollowers;

                    NumFollowing.update({
                      numoffollowers: numoffollowers,
                      numoffollowing: numoffollowing,
                    },
                      { where: { userid: req.body.userid } })
                      .then(function (result) {
                        res.json({ result }).status(200);

                      }).catch(function (err) {
                        res.json(err).status(502);
                      });

                  
                })
                .catch((error) => res.status(404).json({ errorInfo: error }));
            
          })
          .catch((error) => res.status(404).json({ errorInfo: error }));
      
    })
    .catch(err => {
      console.log(err);
      res.status(502).json({ message: "error while creating the job post" });
    });
  };
})
.catch(err => {
    console.log('error', err);
    res.status(502).json({message: "error exception"}); 
});




};



const following_unfollow = (req, res, next) => {

  Following.findOne({
    where: {
      userid: req.body.userid,
      followingid: req.body.followingid,

    }
  })
    .then(dbUser => {
      if (dbUser == null) {
        res.status(404).json({ message: "not found" });
      }
      else {
        Following.destroy(({
          userid: req.body.userid,
          followingid: req.body.followingid,
        }))
          .then(() => {
            res.status(200).json({ message: "following added" });
          })
          .catch(err => {
            console.log(err);
            res.status(502).json({ message: "error while creating the job post" });
          });
      };

    }
    )
};






//schedule JOB PROVIDE
const homepagedata1 = (req, res, next) => {
  sequelize.query(
    // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
    //"SELECT * FROM (SELECT  jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate , ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate not between :startdate and :enddate) AND (position IN (SELECT professions FROM profession_tables WHERE userid=:userid))",
    "SELECT `name`,`mobileno`,`categoryrole`, `dob`, `email` FROM `users`,`usertokens` where users.userid=usertokens.userid AND users.userid=:userid",
    // "SELECT userid,name,mobileno,catgoryrole,dob,email FROM users,usertokens WHERE userid=:userid",
    //"SELECT (userid,name,mobileno,catgoryrole,dob,email) FROM users INNER JOIN usertokens ON users.userid = usertokens.userid",

    // "select * from (SELECT `userid`, `name`,`mobileno`,`categoryrole`, `dob`, `email` FROM `users`,`usertokens` WHERE users.userid=usertokens.userid)where users.userid=:userid",
    // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
    {
      replacements: {
        userid: req.body.userid
      },
      type: Sequelize.QueryTypes.SELECT
    }
  )
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "user not found" });
      } else {


        res.status(200).json(result);

      };
    })
    //.then((result1) =>  res.status(200).json(result1))
    .catch((error) => res.status(404).json({ errorInfo: error }));
};


const homepagedataforprofile = (req, res, next) => {
  sequelize.query(
    // 'SELECT jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance where jobdate between :startdate and :enddate',
    //"SELECT * FROM (SELECT  jobid,reporterid,aboutjob,position,localarea,address,image,providefood,contractorwork,jobdate , ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20)AS dummy WHERE (jobdate not between :startdate and :enddate) AND (position IN (SELECT professions FROM profession_tables WHERE userid=:userid))",
    "SELECT name,numfollowings.numoffollowers,numfollowings.numoffollowing,userratings.avgrating,categoryrole,image FROM `users`,`numfollowings`,userratings WHERE users.userid=numfollowings.userid AND users.userid=userratings.userid AND users.userid=:userid",
    // "SELECT userid,name,mobileno,catgoryrole,dob,email FROM users,usertokens WHERE userid=:userid",
    //"SELECT (userid,name,mobileno,catgoryrole,dob,email) FROM users INNER JOIN usertokens ON users.userid = usertokens.userid",

    // "select * from (SELECT `userid`, `name`,`mobileno`,`categoryrole`, `dob`, `email` FROM `users`,`usertokens` WHERE users.userid=usertokens.userid)where users.userid=:userid",
    // 'SELECT DISTINCT aboutjob, jobid,  ( 3959 * acos( cos( radians(:status1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(:status2) ) + sin( radians(:status1) ) * sin( radians( latitude ) ) ) ) AS distance FROM jobsposteds HAVING distance < 25 ORDER BY distance LIMIT 0 , 20 where date between :startdate and :enddate',
    {
      replacements: {
        userid: req.body.userid
      },
      type: Sequelize.QueryTypes.SELECT
    }
  )
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "user not found" });
      } else {


        res.status(200).json(result);

      };
    })
    //.then((result1) =>  res.status(200).json(result1))
    .catch((error) => res.status(404).json({ errorInfo: error }));
};









export { following_add, following_unfollow, homepagedata1,homepagedataforprofile };



















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