import {Request, Response, Router} from "express";
import {jwtService} from "../domain/application/jwt-service";
import {authService} from "../domain/auth-service";
import {checkIp} from "../middlewares/check-ip";
import {
    ConfirmEmailValidator,
    EmailResendValidator,
    LoginValidator,
    RegistrationValidator
} from "../middlewares/validators/auth-validator";
import {existUser} from "../middlewares/validators/exist-user";



export const authRoute = Router()


authRoute.post('/registration',checkIp,RegistrationValidator,existUser,async (req: Request, res: Response)=>{

    const newUser = await authService.createUser(req.body.login,req.body.email,req.body.password)
    if(newUser){
        res.status(204).send("Email with confirmation code will be send to passed email address")
        return
    }
    res.sendStatus(400)
})

authRoute.post('/registration-confirmation',checkIp,ConfirmEmailValidator,async (req: Request, res: Response)=>{
    console.log(req.body.code)
    const resultConfirmation = await authService.confirmEmail(req.body.code)
    if(resultConfirmation){
        res.sendStatus(204)
        return
    }
    res.sendStatus(400)
})

authRoute.post('/registration-email-resending',checkIp,EmailResendValidator,async (req: Request, res: Response)=>{
    const isResending = await authService.resendEmail(req.body.email)
    if(isResending){
        res.sendStatus(204)
        return
    }
    res.sendStatus(400)
})

authRoute.post('/login',checkIp,LoginValidator, async (req: Request, res: Response)=>{
    const user = await authService.checkCredentials(req.body.login, req.body.password)
    if(user){
        const token = await jwtService.createJWT(user)
        res.status(200).send({token})
        return
    }
    res.sendStatus(401)
})

