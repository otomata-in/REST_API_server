//import bcrypt from 'bcryptjs';

//import jwt from 'jsonwebtoken';

//import Profileuser from '../models/user.js';
import Profession_table from '../models/Profession_table.js';


const Profession_insert = (req, res, next) => {

    return Profession_table.create(({
        userid: req.body.userid,
        professions: req.body.professions,
        
    }))
    .then(() => {
        res.status(200).json({message: "user created"});
    })
    .catch(err => {
        console.log(err);
        res.status(502).json({message: "error while creating the user"});
    });
  
};


const Profession_retrive = (req, res, next) => {
    // checks if email already exists
   Profession_table.findAll({
        where: {userid: req.body.userid}
    }).then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "user not found"});
        } else {
            res.json(dbUser);
           
        };
    })
    .catch(err => {
        console.log('error', err);
    });
    
/*
    Profession_table.findAll = (req, res) => {
        Profession_table.getAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving customers."
            });
          else res.send(data);
        });
      };

      */
};


const Profession_bulkinsert = (req, res, next) => {

    const insertdriver = req.body;
    //const insertpainter = req.body.painter;
    //const insertkulli = req.body.kulli;
    //const insertcontractor = req.body.contractor;
    //const insertdriver = req.body.driver;
   
    //res.status(200).json({message: authHeader});
    Profession_table.bulkCreate((insertdriver))
    .then(() => {
        res.status(200).json({message: "user created"});
    })
    .catch(err => {
        console.log(err);
        res.status(502).json({message: "error while creating the user"});
    });
   
   /* Profession_table.create(({
        mobileno: req.body.mobileno,
        professions: req.body.professions,
        
    }))
    .then(() => {
        res.status(200).json({message: "user created"});
    })
    .catch(err => {
        console.log(err);
        res.status(502).json({message: "error while creating the user"});
    });
    */

};








export { Profession_insert,Profession_retrive,Profession_bulkinsert  };