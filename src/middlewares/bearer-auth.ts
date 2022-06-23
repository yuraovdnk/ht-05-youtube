import {NextFunction, Request, Response} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../domain/application/jwt-service";


export const bearerAuth = async (req: Request, res: Response, next:NextFunction)=>{
    if(!req.headers.authorization){
        return res.send(401)
    }

    const token = req.headers.authorization.split(' ')[1]
    const userId = await jwtService.getUserIdByToken(token)
    if(userId){
        req.user = await usersService.getUserById(userId)
        next()
        return 
    }
    res.send(401)
}