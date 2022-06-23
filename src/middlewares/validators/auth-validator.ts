import {body} from "express-validator";
import {errorsValidation} from "./validation-errors";
import {usersCollection} from "../../repositories/db";


export const loginValidator = body('login')
    .exists().withMessage('The Login field is required.')
    .isString().withMessage('The Login field must be string')
    .notEmpty().withMessage("Login must be not empty")
    .isLength({min: 3, max: 10}).withMessage(`The field Login must be a string of \'30\'.`)

export const passwordValidator = body('password')
    .exists().withMessage('The password field is required.')
    .isString().withMessage('The password field must be string')
    .notEmpty().withMessage("password must be not empty")
    .isLength({min: 6, max: 20}).withMessage(`The field password must be a string of \'20\'.`)

export const emailValidator = body('email')
    .exists().withMessage('The email field is required.')
    .isString().withMessage('The email field must be string')
    .notEmpty().withMessage("Email must be not empty")
    .isEmail().withMessage("The field Email must match the regular expression '^[\\\\w-\\\\.]+@([\\\\w-]+\\\\.)+[\\\\w-]{2,4}$'.")

export const confirmCodeValidator = body('code')
    .exists().withMessage('The code field is required.')
    .isString().withMessage('The code field must be string')
    .notEmpty().withMessage("code must be not empty")

export const LoginValidator = [
    loginValidator,
    passwordValidator,
    errorsValidation
]
export const RegistrationValidator = [

    loginValidator.custom(async value =>{
        const res = await usersCollection.findOne({"accountData.login":value})
        if(res) return Promise.reject()
    }).withMessage("user with such login is exist "),

    emailValidator.custom(async value =>{
        const res = await usersCollection.findOne({"accountData.email":value})
        if(res) return Promise.reject()
    }).withMessage("user with such email is exist "),

    passwordValidator,
    errorsValidation
]
export const EmailResendValidator = [
    emailValidator,
    errorsValidation
]
export const ConfirmEmailValidator = [
    confirmCodeValidator,
    errorsValidation
]

