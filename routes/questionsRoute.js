const express = require('express');
const questionController = require('../controller/questionController')

const router = express.Router();


router.get('/getAllQuestions', questionController.structureData)

router.post('/comprehensiveQuestion', questionController.createComprehensiveQuestion );

router.post('/clozeQuestion', questionController.createClozeQuestion);

router.post('/categoryQuestion', questionController.createCategoryQuestion)

module.exports = router;