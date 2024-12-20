const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { getStadiums, getMatches, addMatch, addStadium, updateMatch,
    getStadium, getTeam, getTeams
} = require('../controllers/manager');
const router = express.Router()

router.post('/addMatch', verifyToken, addMatch)
router.post('/addStadium', verifyToken, addStadium)
router.put('/updateMatch', verifyToken, updateMatch)
router.get('/allStadium', verifyToken, getStadiums)
router.get('/allMatches', getMatches)
router.get('/stadium/:name', verifyToken, getStadium)
router.get('/team/:id', verifyToken, getTeam)
router.get('/allTeams', verifyToken, getTeams)


module.exports = router;
