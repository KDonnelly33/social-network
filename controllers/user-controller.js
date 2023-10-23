const User = require('../models/User');


module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find().populate("thoughts");
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

// create new user
async createUser(req, res) {
    try {
        const user = await User.create(req.body);
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
},
// get single user by _id and populated thought and friend data
async getSingleUser(req, res) {
    try {
        console.log(req.params.id);
        const user = await User.findOne({ _id: req.params.id })
            .select('-__v')
            .populate('friends')
            .populate('thoughts');
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
},

// delete single user by id and all associated thoughts
async deleteUser(req, res) {
    try{
        user = await User.findOneAndRemove({_id: req.params.id});
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        return res.json({ message: 'User deleted!' });
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
},








// update user by id

async editUser(req, res) {
    try {
        user = await User.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
},

// add friend to user

async addFriend(req, res) {
    console.log('you are adding a friend');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends:{_id: req.params.friendId}} },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }

},
// remove friend from user

async removeFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true },
        );
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        return res.json(user);
    } catch (err) {

        console.log(err);
        return res.status(400).json(err);
    }
}


};
