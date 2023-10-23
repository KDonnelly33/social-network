// import router
const router = require('express').Router();
// import thought controller
const {
    createThought,
    getAllThoughts,
    getSingleThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,

} = require('../../controllers/thought-controller');
// /api/thoughts
router.route('/').post(createThought);

router.route('/').get(getAllThoughts);
// /api/thoughts/:id
router.route('/:id').get(getSingleThought);

router.route('/:id').put(updateThought);

router.route('/:id').delete(deleteThought);
//  /api/thoughts/:id/reactions
router.route('/:id/reactions').post(createReaction);
//  /api/thoughts/:id/reactions/:reactionId
router.route('/:id/reactions/:reactionId').delete(deleteReaction);









module.exports = router;