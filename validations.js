import {body} from 'express-validator';


export const loginValidation = [
    body('email', "Invalid type of email").isEmail(),
    body('password', "Invalid data").isLength({min: 5}),
]


export const registerValidation = [
    body('email', "Invalid type of email").isEmail(),
    body('password', "Invalid data").isLength({min: 5}),
    body('fullName', "Invalid format of name").isLength({min: 3}),
];

export const postCreateValidation =  [
    body('description', "Enter text").isLength({min: 10}).isString(),
    body('imageUrl', "Invalid link").optional().isString(),
];