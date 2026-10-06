const express = require('express');
const router = express.Router();
const wineController = require('../controllers/wineController');

router.get('/', wineController.getWines);
router.post('/', wineController.createWine);
router.put('/:id', wineController.updateWine);
router.delete('/:id', wineController.deleteWine);

module.exports = router;