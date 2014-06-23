var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://localhost/sample');

var noteSchema,
    userSchema,
    shareSchema;

var Note,
    User,
    Share;

noteSchema = new Schema({
    title: String,
    note: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    created: {
        type: Date,
        default: Date.now
    },    
    notes: [noteSchema],
    shared: [{
        id: {
            type: Schema.ObjectId,
            ref: 'shareSchema'
        }
    }]
});

shareSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    notes: [noteSchema]
});

Note = mongoose.model('Note', noteSchema);
User = mongoose.model('User', userSchema);
Share = mongoose.model('Share', shareSchema);

module.exports = {
    Note: Note,
    User: User,
    Share: Share
};