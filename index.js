import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import {registerValidation, loginValidation, postCreateValidation} from './validations.js';
import {UserController, PostController} from './controllers/index.js'
import { handleValidationErrors, checkAuth } from './utils/index.js';
import multer from "multer";
import * as fs from "fs";



mongoose.connect(
    process.env.MONGODB_URI
).then(() => console.log('\x1b[32m%s\x1b[0m','DB is OK'))
    .catch((err) => console.log(`You have an error --- ${err}`))



const app = express();

const storage = multer.diskStorage({
    destination: ( _, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.get('/', (req, res) => {
    res.send(`<h1> Hello, my name is Visionary<h1/>`)
});
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
//Uploading function
app.post('/upload',checkAuth , upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
});
//Functions of registration and login;
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
// //Functions of posts;
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
// Edit a task
// app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);



app.listen(process.env.PORT || 8888, (err) => {
    if (err) {
        return console.error(err)
    }
    console.log('\x1b[32m%s\x1b[0m', 'Server is OK');
});



