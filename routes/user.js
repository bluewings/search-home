var express = require('express');
var router = express.Router();
var model = require('./model');

var User = model.User,
    Note = model.Note,
    Share = model.Share;

var SUCCESS = 'success',
    ERROR = 'error';

function uid() {

    return (parseInt(Math.random() * 900000000 + 100000000, 10)).toString(36).substr(0, 6);
}


router.get('/', function (req, res) {

    User.find({}, function (err, data) {
        res.jsonp({
            status: SUCCESS,
            data: data
        });
    });
});

router.post('/', function (req, res) {

    User.create({
        userId: uid()
    }, function (err, data) {
        res.jsonp({
            status: SUCCESS,
            data: data
        });
    });
});

router.put('/:userId', function (req, res) {

    User.remove({
        userId: req.params.userId
    }, function (err, data) {
        res.jsonp({
            status: SUCCESS,
            data: data
        });
    });
});

router.delete('/:userId', function (req, res) {

    User.remove({
        userId: req.params.userId
    }, function (err, data) {
        res.jsonp({
            status: SUCCESS,
            data: data
        });
    });
});


router.post('/:userId/note', function (req, res) {

    User.update({
        userId: req.params.userId
    }, {
        $push: {
            notes: {
                title: 'wow_' + (new Date())
            }
        }
    }, function (err, data) {
        res.jsonp({
            code: 200,
            message: 'ok',
            result: {
                data: data
            }
        });
    });
});

router.put('/:userId/note/:_id', function (req, res) {

    var set = {};
    for (var field in req.body) {
        if (req.body.hasOwnProperty(field)) {
            set ['notes.$.' + field] = req.body[field];
        }

    }

    User.update({
        userId: req.params.userId,
        'notes._id': req.params._id
    }, {
        $set: set
        /*{
            'notes.$.title': 'updated'
        }*/
    }, function (err, data) {

        res.jsonp({
            code: 200,
            message: 'ok',
            result: {
                data: data
            }
        });
    });
});


router.delete('/:userId/note/:_id', function (req, res) {

    User.findOneAndUpdate({
        userId: req.params.userId,
    }, {
        $pull: {
            notes: {
                _id: req.params._id
            }
        }
    }, function (err, data) {

        res.jsonp({
            code: 200,
            message: 'ok',
            result: {
                data: data
            }
        });
    });
});

router.get('/addNote', function (req, res) {

    var id = "0.2318615757394582";

    User.update({
        userId: id
    }, {
        $push: {
            notes: {
                title: 'wow_' + (new Date())
            }
        }
    }, function (err, data) {
        res.jsonp({
            code: 200,
            message: 'ok',
            result: {
                data: data
            }
        });
    });

});

router.get('/note', function (req, res) {

    Note.find({}, function (err, data) {

        res.jsonp({
            code: 200,
            message: 'ok',
            result: {
                data: data
            }
        });
    });
});

router.get('/note_save', function (req, res) {

    var note = new Note({
        title: 'title_save',
        title1: 'title_save',
    });
    note.save(function (err) {
        res.jsonp({
            code: 200,
            message: 'ok',
            result: {

            }
        });
    });

});

router.get('/note_create', function (req, res) {

    Note.create({
        title: 'title_create',
        title1: 'title_create',
    }, function (err) {
        res.jsonp({
            code: 200,
            message: 'ok',
            result: {

            }
        });
    });

});
router.get('/note2', function (req, res) {

    Note.remove({}, function (err, affectedRows) {

        res.jsonp({
            code: 200,
            message: 'ok',
            result: {
                affectedRows: affectedRows
            }
        });
    });
});

router.post('/', function (req, res) {

    User.find({}, function (err, data) {

        res.jsonp({
            code: 200,
            message: 'ok',
            result: {
                data: data
            }
        });
    });
});


module.exports = router;