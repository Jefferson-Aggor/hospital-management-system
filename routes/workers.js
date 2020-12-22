const express = require('express')
const router = express.Router();

const { getWorkers,getWorker,updateWorker,deleteWorker,registerWorker } = require('../controllers/workers')

// Get all workers
router.route('/').get(getWorkers).post(registerWorker);

router.route('/:_id').get(getWorker).put(updateWorker).delete(deleteWorker);

module.exports = router;