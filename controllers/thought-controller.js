const Thought = require('../models/Thought.js')
const User = require('../models/User.js')
module.exports = {
    // create a thought
async createThought(req, res) {

    try{
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate({username: req.body.username},{$push: {thoughts: thought._id}}, {new:true})

        res.json(user);

    } catch(err) {
        res.status(500).json(err);
    }
},

// get all thoughts
async getAllThoughts(req, res) {
    try {
        const thoughts = await Thought.find();
        return res.json(thoughts);
    } catch (err) {

        return res.status(500).json(err);
    }
},

// get a single thought by id
async getSingleThought(req, res) {
    try {
        console.log(req.params.id);
        const thought = await Thought.findOne(req.params.Id )
        .select('-__v');

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' })
        }

        res.json(thought);
    } catch (err) {
    
        return res.status(500).json(err);
    }
},

// update a thought by id

async updateThought(req, res) {
    console.log(req.body);
    try {
    
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        return res.json(thought);
    } catch (err) {
   
        return res.status(500).json(err);
    }
},

// delete a thought by id
async deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndRemove({ _id: req.params.id });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        return res.json({ message: 'Thought deleted!' });
    } catch (err) {

        return res.status(500).json(err);
    }
},

// create a reaction

async createReaction(req, res) {
    try {
        console.log(req.params.id);
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { reactions: req.body } },
            { new: true }
        );
        console.log(thought);
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        return res.json(thought);
    } catch (err) {

        return res.status(500).json(err);
    }

},
// delete a reaction
async deleteReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { _id: req.params.reactionId } }},
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        return res.json({ message: 'Reaction deleted!' });
    } catch (err) {

        return res.status(500).json(err);
    }
},




}