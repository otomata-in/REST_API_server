//import bcrypt from 'bcryptjs';

//import jwt from 'jsonwebtoken';

//import Profileuser from '../models/user.js';
import Profileuser from '../models/profileuser.js';


const Insertprofile = (req, res, next) => {
    // checks if email already exists
    Profileuser.findOne({ where : {
        userid: req.body.userid, 
    }})
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message: "user already exists"});
        } else {
            // password hash
           
                    return Profileuser.create(({
                        email: req.body.email,
                        name: req.body.name,
                        password: passwordHash,
                    }))
                    .then(() => {
                        res.status(200).json({message: "user created"});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: "error while creating the user"});
                    });

        };
    })
    .catch(err => {
        console.log('error', err);
    });
};



export { Insertprofile };