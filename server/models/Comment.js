const {Schema, model} = require("mongoose");

const CommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        default: 5,
    },
},
{timestamps: true}
)

module.exports = model("Comment", CommentSchema)