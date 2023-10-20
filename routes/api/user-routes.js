const router = require('express').Router();
// imports my functions from user-controller.js
const {
    getAllUsers,
    createUser,
    getSingleUser,
    deleteUser,
    editUser,
    addFriend,
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router.route('/').get(getAllUsers);

router.route('/').post(createUser);

router.route('/:id').get(getSingleUser);

router.route('/:id').delete(deleteUser);

router.route('/:id').put(editUser);

router.route('/:id/friends').post(addFriend);

module.exports = router;