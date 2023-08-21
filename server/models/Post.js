const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        required: true,
        default: true,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
},
    { timestamps: true });

module.exports = model("Post", PostSchema);