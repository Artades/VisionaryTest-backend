
import PostModel from '../models/Post.js';
import post from "../models/Post.js";


export const getAll = async(req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);

    } catch (err) {
         console.log(err);
         res.status(500).json({
             message: 'Failed to find posts'
         })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate(
        {
        _id: postId,
        },
        {
        $inc: { viewsCount: 1 },
        },
        {
        returnDocument: 'after',
        },
            (err, doc) => {
                if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Failed to return a post'
                })
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'A post was not found'
                    })
                }
                res.json(doc);
        }
        ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to find a post'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete({
            _id: postId,
        }, (err, doc) => {
            if (err) {
                 console.log(err);
                 res.status(500).json({
                     message: 'Failed to delete a post'
                 })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'The post was not found'
                })
            }

            res.json({
                success: true
            })
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to find a post'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId,
        }, {
            description: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });

        res.json({
    success: true,
})
    } catch (error) {
         console.log(error);
         res.status(500).json({
             message: 'Failed to update a post'
         })
    }
}




export const create = async(req, res) => {
    try {
        const doc = new PostModel({
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });

        const post = await doc.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create a post'
        })
    }
}



export const complete = async(req, res) => {

    try {
        const postId = req.params.id;


        await PostModel.findByIdAndUpdate(
            {
                _id: postId,
            },
            {
            completed: true,

        }

        );



        res.json({
            success: true,
        })
    } catch (error) {

        console.log(error);
        res.status(500).json({
            message: 'Failed to complete a post'
        })
    }
}

