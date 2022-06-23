import {body} from "express-validator";
import {errorsValidation} from "./validation-errors";


const titleValidation = body('title')
    .exists().withMessage('The Title field is required.')
    .isString().withMessage('The Title field must be string')
    .trim()
    .notEmpty().withMessage("Name must be not empty")
    .isLength({max:30}).withMessage(`The field Title must be a string or array type with a maximum length of \'30\'.`)

const shortDescriptionValidation = body('shortDescription')
    .exists().withMessage('The ShortDescription field is required.')
    .isString().withMessage('The ShortDescription field must be string')
    .trim()
    .notEmpty().withMessage("ShortDescription field must be not empty")
    .isLength({max:30}).withMessage(`The field ShortDescription  must be a string or array type with a maximum length of \'100\'.`)

const contentValidation = body('content')
    .exists().withMessage('The Content field is required.')
    .isString().withMessage('The Content field must be string')
    .trim()
    .notEmpty().withMessage("Content must be not empty")
    .isLength({max:30}).withMessage(`The field Content must be a string or array type with a maximum length of \'100\'.`)


export const postsValidate = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    errorsValidation
]