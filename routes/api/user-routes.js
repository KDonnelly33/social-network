const router = require('express').Router();
// imports my functions from user-controller.js
const {
    getAllUsers,
    createUser,
    getSingleUser,
    deleteUser,
    editUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router.route('/').get(getAllUsers);

router.route('/').post(createUser);

router.route('/:id').get(getSingleUser);

router.route('/:id').delete(deleteUser);

router.route('/:id').put(editUser);

router.route('/:id/friends').post(addFriend);

router.route('/:id/friends/:friendId').delete(removeFriend);

module.exports = router;