import {body} from "express-validator";
import {errorsValidation} from "./validation-errors";

const nameValidator = body('name')
    .exists().withMessage("The Name field is required.")
    .isString().withMessage("The Name field must be string")
    .trim()
    .notEmpty().withMessage("Name must be not empty")
    .isLength({min: 1, max: 15})

const youtubeUrlValidator = body('youtubeUrl')
    .exists().withMessage("The YoutubeUrl field is required.")
    .matches('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')
    .withMessage(`The field YoutubeUrl must match the regular expression '^https://([a-zA-Z0-9_-]+\\\\.)+[a-zA-Z0-9_-]+(\\\\/[a-zA-Z0-9_-]+)*\\\\/?$'.`)
    .isLength({
        min: 1,
        max: 100
    }).withMessage("The field YoutubeUrl must be a string or array type with a maximum length of '100'.")

export const bloggersValidate = [
    nameValidator,
    youtubeUrlValidator,
    errorsValidation
]