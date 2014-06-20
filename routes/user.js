var express = require('express');
var router = express.Router();
var model = require('./model');

var User = model.User,
    Note = model.Note,
    Share = model.Share;

router.get('/', function (req, res) {

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

router.post('/', function (req, res) {

    User.create({
        id: parseInt(Math.random() * 100000)
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

router.post('/:id/note', function (req, res) {

    User.update({
        id: req.params.id
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

router.delete('/:id', function (req, res) {

    User.remove({
        id: req.params.id
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

router.post('/:id/note/:_id', function (req, res) {

    User.findOneAndUpdate({
        id: req.params.id,
        'note._id': req.params.id
    }, {
        $set: {
            title: 'updated'
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


router.delete('/:id/note/:_id', function (req, res) {

    User.findOneAndUpdate({
        id: req.params.id,
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
        id: id
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