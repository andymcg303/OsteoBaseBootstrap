const Patient = require('../models/patient');
const moment  = require("moment");

module.exports = {
    // Patients Index
    async getPatients(req, res, next){
        if(req.query.keyword) {
            let escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            const regex = new RegExp(escapeRegex(req.query.keyword), 'gi');
            let foundPatients = await Patient.find({surname: regex});
            res.json(foundPatients);
        } else {
            // if there wasn't any query string keyword then..
            let allPatients = await Patient.find({});
            if(req.xhr) {
                res.json(allPatients);
            } else {
                res.render("./patients/index", {patients: allPatients, moment: moment});
            }
        }
    },

    // Patients Create
    async createPatient(req, res, next){
        let newPatient = await Patient.create(req.body.patient);
        res.json(newPatient);
    },

    // Patient Show
    async showPatient(req, res, next){
        let foundPatient = await Patient.findById(req.params.id)
            .populate({
                path: 'medhists', 
                options: { sort: { '_id': -1 }}})
            .populate({
                path: 'interviews', 
                options: { sort: { '_id': -1 }}})
            .populate({
                path: 'clinicals', 
                options: { sort: { '_id': -1 }}})
            .exec();
            res.render("./patients/show", {patient: foundPatient, moment: moment});
    },

    // Patient Update
    async updatePatient(req, res, next){
        let updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body.patient, {new: true});
        res.json(updatedPatient);
    },

    // Patient Delete
    async deletePatient(req, res, next){
        let foundPatient = await Patient.findById(req.params.id);
        await foundPatient.remove();
        res.redirect("/patients");
    }
}
