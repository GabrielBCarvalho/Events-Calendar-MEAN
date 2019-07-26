import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Event from './models/event.model';
import User from './models/user.model';
import Participants from './models/participants.model';

// App and router
const app = express();
const router = express.Router();

// Cors and bodyparser
app.use(cors());
app.use(bodyParser.json());

// MongoDB
mongoose.connect('mongodb://localhost:27017/calendar');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
});


// -------- ROUTES --------


// Find events from an user given a date
router.route('/events/list-events/:username/:date').get((req, res) =>{
    Event.find({
        $or: [{username: req.params.username, dateBegin: req.params.date}, 
            {username: req.params.username, dateEnd: req.params.date}]
    }, (err, events) => {
        if(err)
            console.log(err);
        else
            res.json(events);
    });
});

// Find all events from an user
router.route('/events/list-all-events/:username').get((req, res) => {
    Event.find({username: req.params.username}, (err, events) => {
        if(err)
            console.log(err);
        else
            res.json(events);
    });
});

// Find an specific event
router.route('/events/:id').get((req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if(err)
            console.log(err);
        else
            res.json(event);
    });
})

// Add an event
router.route('/events/add-event').post((req, res) => {
    let event = new Event(req.body);
    event.save()
        .then(event => {
            res.status(200).json({'event': 'Added successfully!'});
        })
        .catch(err => {
            res.status(400).send('Failed to added a new event.');
        });
});

// Edit an event
router.route('/events/edit-event/:id').post((req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if(!event)
            return next(new Error('Could not load the event.'));
        else{
            event.description = req.body.description;
            event.dateBegin = req.body.dateBegin;
            event.dateEnd = req.body.dateEnd;
            event.username = req.body.username;

            event.save()
                .then(event => {
                    res.json('Update successfully done!');
                })
                .catch(err => {
                    res.status(400).send('Update failed.');
                });
        }
    });
});

// Delete an event
router.route('/events/delete-event/:id').delete((req, res) => {
    Event.findByIdAndRemove({_id: req.params.id}, (err, event) => {
        if(err)
            console.log(err);
        else
            res.json('Event removed successfully!');
    });
});

// Login
router.route('/users/login/').get((req, res) => {
    User.find({username: req.body.username, password: req.body.password}, (err, user) => {
        if(err)
            console.log(err);
        else
            res.json(user);
    });
});

// Register
router.route('/users/register/').post((req, res) => {
    let user = new User(req.body);

    user.save()
        .then(user => {
            res.status(200).json({'user': 'Added successfully!'});
        })
        .catch(err => {
            res.status(400).send('Failed to register a new user.');
        });
});


// Connection to server
app.use('/', router);
app.listen(4000, () => console.log("Express server running on port 4000"));