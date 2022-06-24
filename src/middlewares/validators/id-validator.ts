import {param} from "express-validator/src/middlewares/validation-chain-builders";
import {errorsValidation} from "./validation-errors";
import {ObjectId} from "mongodb";

export const idValidate = [
    param('id').custom(value =>{
        try {
            return new ObjectId(value)
        }
        catch (e){
            throw new Error
        }
    }).withMessage("in correct id"),
    errorsValidation
]


