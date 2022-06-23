import {param} from "express-validator/src/middlewares/validation-chain-builders";
import {errorsValidation} from "./validation-errors";

export const idValidate = [
    param('id').isMongoId().withMessage("Incorrect id"),
    errorsValidation
]


