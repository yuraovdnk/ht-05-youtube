import {NextFunction, Request, Response} from "express";
import {authService} from "../../domain/auth-service";

export const existUser = async (req: Request, res: Response, next: NextFunction) => {

    let field = null;
    let message = null;
    const findByLogin = await authService.findByLogin(req.body.login)
    if(findByLogin){
        field = 'login'
        message = 'Login is exist'
    }
    const findByEmail = await authService.findByEmail(req.body.email)
    if (findByEmail) {
        field = 'email'
        message = 'email is exist'
    }

    if (field) {
        return res.status(400).send({
            errorsMessages: [
                {
                    message,
                    field
                }
            ]
        })
    }

    next()



}