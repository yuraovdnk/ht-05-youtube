import {NextFunction, Request,Response} from "express";
const myUserName = "admin"
const myPassword = "qwerty"
export const basicAuth = (req:Request, res:Response, next:NextFunction)=>{
    const header = req.headers.authorization || ''
    const typeAuth = header.split(/\s+/).shift()
    if(typeAuth !== 'Basic'){
        res.send(401)
        return;
    }
    const token = header.split(/\s+/).pop() || ''
    const auth = Buffer.from(token, 'base64').toString().split(/:/)
    const username = auth.shift()
    const password = auth.pop()
    if(myUserName !== username || myPassword !== password){
        res.status(401).send()
        return
    }

    next()
}