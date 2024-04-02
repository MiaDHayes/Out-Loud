const Comment = require('../models/comment');


const getAllComments = async (req,res) => {
    try {
        const comment = await Comment.find()
        if (!comment) {
            return res.status(400).json({message: 'Comment not found'})
        }
        return res.status(200).json(comment)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}

const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const comments = await Comment.findById(id);
        if (comments) {
            return res.json(comments);
        }
        return res.status(404).json({message: 'Comment not found!'});
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

const createComment = async (req, res) => {
    try {
        const newComment = new Comment({
            content: req.body.content
        })

        await newComment.save();
        return res.status(201).json({message: "Comment created successfully"});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Failed to create comment"});
    }
}

const updateComment = async (req, res) => {
    const commentId = req.params.id
    const updateFields = req.body
    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, updateFields, { new: true })
        if (!updatedComment) {
            return res.status(404).json({message: 'Comment unable to update'})
        }
        return res.status(200).json(updatedComment)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error.message);
    }
}

const deleteComment = async (req, res) => {
    const commentId = req.params.id
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId)
        if (!deletedComment) {
            return res.status(404).json({message: "Comment not found"});
        }
        return res.status(200).json(deletedComment)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}