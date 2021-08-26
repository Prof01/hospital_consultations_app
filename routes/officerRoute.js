const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const Officer = require('../model/officerModel')
const jwtSecret = process.env.jwtSecret;

// @route POST api/v1/officer/register
// @desc Register New Officer
// @access Public
router.post('/officer/register', (req, res) => {
    const { fullName, email, password } = req.body;
    //Simple validation
    if(!fullName || !email || !password) {
       return  res.status(400).json({ msg: 'Please enter all fields' })
    }

    const newwEmail = email.toLowerCase();
    //Check for existing officer
    Officer.findOne({ email: newwEmail })
    .then(user => {
        if(user) {
            return res.status(400).json({ msg: 'Officer Already exist' })
        }

        const newOfficer = new Officer({
            fullName,
            email: newwEmail,
            password
        })

        //Create Salt & hash
        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(newOfficer.password, salt, (err, hash) => {
                
                if(err) throw err;
                newOfficer.password = hash;

                newOfficer.save()
                .then(officer => {
                    jwt.sign(
                        { id: officer.id },
                        jwtSecret,
                        { expiresIn: 3600 }, 
                        (err, token) => {
                            if(err) throw err;

                            return res.json({ 
                                token,
                                user: {
                                    id: officer.id,
                                    fullName: officer.fullName,
                                    email: officer.email
                                }
                             })
                        }
                    )
                })
                .catch(err => res.status(400).json({msg: err}))
            })
        })
    })
    .catch(err => res.status(400).json({msg: err}))
    
});


// @route POST api/v1/officer/login
// @desc Officer Login
// @access Public
router.post('/officer/login', (req, res) => {
    const { email, password } = req.body;
    //Simple validation
    if( !email || !password) {
       return res.status(400).json({ msg: 'Please Enter All Fields' })
    }

    //Check for Existing Officer
    Officer.findOne({ email: email.toLowerCase() })
    .then(officer => {
        if(!officer) {
            return res.status(400).json({ msg: 'Officer Doesnot Exist' })
        }

            //Validate Password
            bcrypt.compare(password, officer.password)
                .then(isMatch => {

                    if(!isMatch){ 
                        return res.status(400).json({ msg: "Invalid Credentials" });
                    }

                    jwt.sign(
                        { id: officer.id },
                        jwtSecret,
                        { expiresIn: 3600 }, 
                        (err, token) => {
                            if(err) throw err;

                            res.json({ 
                                token,
                                user: {
                                    id: officer.id,
                                    fullName: officer.fullName,
                                    email: officer.email
                                }
                             })
                        }
                    )
                })
            })
            .catch(err => res.status(400).json({msg: err}))
});


// @route GET api/v1/officer
//@desc Get Officer Data
//@access Private
router.get('/officer', auth, (req, res) => {
    Officer.findById(req.user.id)
        .select('-password')
        .then(officer => res.json(officer))
        .catch(err => res.status(400).json({
            msg: err
        }))
})

module.exports = router;