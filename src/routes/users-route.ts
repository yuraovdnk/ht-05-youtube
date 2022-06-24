import {Router, Request, Response} from "express";
import {usersService} from "../domain/users-service";
import {basicAuth} from "../middlewares/basic-auth";
import {paginateType} from "../repositories/pagination";
import {ObjectId} from "mongodb";
import {idValidate} from "../middlewares/validators/id-validator";


export const usersRoute = Router()


usersRoute.get('/', async (req: Request, res: Response) => {
    const allUsers = await usersService.getAllUsers(req.query as paginateType)
    res.send(allUsers)
})

usersRoute.delete('/:id',basicAuth,idValidate,async (req: Request, res: Response)=>{
   const isDeleted = await usersService.deleteUser(new ObjectId(req.params.id))
    if(isDeleted){
        return res.sendStatus(204)
    }
    res.sendStatus(404)
})


