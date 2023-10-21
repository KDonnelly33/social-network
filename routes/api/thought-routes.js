const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getSingleThought,
    updateThought,
    deleteThought,

} = require('../../controllers/thought-controller');

router.route('/').post(createThought);

router.route('/').get(getAllThoughts);

router.route('/:id').get(getSingleThought);

router.route('/:id').put(updateThought);

router.route('/:id').delete(deleteThought);









module.exports = router;