const express = require('express');
const router = express.Router();
const SauceCtrl = require('../controllers/sauce');

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');//image ref

const Sauce = require('../models/sauce');

//save new sauce in DB
router.post('/', auth, multer, SauceCtrl.createSauce); //add auth

//retrieving the list of sauces
router.get('/', auth, SauceCtrl.viewAllSauces);//add auth

//retrieve only one particular sauce
router.get('/:id', auth, SauceCtrl.viewSauce);//add auth

//update the sauce
router.put('/:id', auth, multer, SauceCtrl.updateSauce);//add auth

//delete sauce
router.delete('/:id', auth, SauceCtrl.deleteSauce);//add auth

//add like or remove like
router.put('/:id/like', [auth], SauceCtrl.likeSauce);//add auth

module.exports = router;