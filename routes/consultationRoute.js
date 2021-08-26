const express = require('express')
const router = express.Router();
const Consultations = require('../model/consultationModel')
const auth = require('../middleware/auth')

// set router param
router.param('cID', (req, res, next, id) => {
    Consultations.findById(id)
    .then(consultation => {
        if (!consultation) {
            return res.status(404).json({
            msg: 'No Consultation Exist for this Patient'
            });
        }
        req.consultation = consultation;
        return next();
    })
    .catch(err => {
        return next(err);
    })
});


// @route POST api/v1/consultations/add
// @desc Add Consultation
// @access Private
router.post('/consultations/add', auth, async (req, res) => {
    const {
        patientName,
        folderNumber,
        patientComplaint,
        doctorAssessment,
        diagnosis,
        drugsPrescribed,
        doctorName
    } = req.body;


        if (!patientName || !folderNumber || !patientComplaint || !doctorAssessment || !diagnosis || !drugsPrescribed || !doctorName) 
        return res.status(400).json({
            msg: 'Please Enter All Fields'
        });

         //CREATE NEW Consultion
         const newConsultation = new Consultations({
            patientName,
            folderNumber,
            patientComplaint,
            doctorAssessment,
            diagnosis,
            drugsPrescribed,
            doctorName
         });
          
        try {
            // Save Consultation to the Database
            await newConsultation.save()
            .then(async savedConsultation => {
                await res.status(201).json({
                    consultation: savedConsultation,
                    msg: 'Success'
                });
            })
            .catch(err => res.status(500).json({msg: 'Server Error'}))

        } catch (err) {
            res.status(500).json({msg: 'Server Error'})
        }
});

// @route GET api/v1/consultations
// @desc Get all Consultations
// @access Public
router.get('/consultations/', auth, (req, res) => {
    Consultations.find({}).sort({'date':-1})
        .then((consultation) => {
        return res.status(200).json(consultation);
    })
    .catch(err => res.status(500).json({msg: 'Server Error'}))
});

// @route GET api/v1/consultations/fID
// @desc Get a Patient Consultations
// @access Public
router.get('/consultations/:fID', (req, res) => {
    const folderNumber = req.params.fID

    Consultations.find({folderNumber})
    .then(consultations => {
        if(consultations.length === 0) {
            return res.status(400).json({msg: "Patient Does Not Exist"})
        }

        res.status(200).json(consultations)
    })
    .catch(err => res.status(500).json({msg: "Server Error"}))
});

// @route PUT api/v1/consultations/cID
// @desc Update a Consultation
// @access Private
router.put('/consultations/:cID', auth, (req, res) => {
    const newUpdate = req.body;
    req.consultation.updateOne(newUpdate, (err, result) => {
        if (err) return err;
        // Finds and re-render the Consultations after update
        Consultations.find({}, (err, consultations, next) => {
            if (err) return next(err);
            return res.status(201).json({
                consultations,
                msg: 'Success'
            });
        }).sort({'date':-1});
    });
         
})
    

module.exports = router