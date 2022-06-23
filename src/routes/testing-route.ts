import {Request, Response, Router} from "express";
import {
    bloggerCollection,
    commentsCollection,
    ipAddressesCollection,
    postsCollection,
    usersCollection
} from "../repositories/db";

export const testingRoute = Router()

testingRoute.delete('/all-data',async (req: Request, res: Response)=>{

    try {
        await bloggerCollection.deleteMany({})
        await postsCollection.deleteMany({})
        await usersCollection.deleteMany({})
        await commentsCollection.deleteMany({})
        await ipAddressesCollection.deleteMany({})
        res.sendStatus(200)
    }
    catch (e){
        console.log(e)
    }
})