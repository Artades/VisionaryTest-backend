import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({


    description: {
        type: String,
        required: true,
    },
     user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
     },
    imageUrl: String,
}, {
    timestamps: true
});

export default mongoose.model('Post', PostSchema);

