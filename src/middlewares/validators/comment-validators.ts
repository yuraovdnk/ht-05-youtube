import {body} from "express-validator";
import {errorsValidation} from "./validation-errors";

const contentValidators = body('content')
    .exists().withMessage('The content field is required.')
    .isString().withMessage('The content field must be string')
    .trim()
    .notEmpty().withMessage("content must be not empty")
    .isLength({min:20,max:300}).withMessage(`The content Title must be a string or array type with a maximum length of \'30\'.`)


export const commentValidation =[
    contentValidators,
    errorsValidation
]