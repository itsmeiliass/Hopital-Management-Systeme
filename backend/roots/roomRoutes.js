const express = require('express');
const router = express.Router();
const {
  createRoom,
  getRooms,
  getAvailableRooms,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');

router.post('/', createRoom);
router.get('/', getRooms);
router.get('/available', getAvailableRooms);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

module.exports = router;
