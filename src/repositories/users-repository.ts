import {usersCollection} from "./db";
import {UserType, UserTypeRes} from "./types";
import {paginateType, pagination, paginateRes} from "./pagination";
import {ObjectId} from "mongodb";


export const usersRepository = {
    async  createUser(newUser: UserType): Promise<boolean> {
        const result = await usersCollection.insertOne(newUser)
        return result.acknowledged
    },

    async getAllUsers(query: paginateType):Promise<paginateRes>{
        const filter = {}
        const options = {id:1,"accountData.login":1}
        const users = await pagination(query, filter, usersCollection, options)
        return users
    },

    async findByLogin(login:string):Promise<UserType | null>{
        return await usersCollection.findOne({"accountData.login":login})
    },

    async findByEmail(email:string):Promise<UserType | null>{
        return await usersCollection.findOne({"accountData.email":email})
    },

    async findById(id: ObjectId):Promise<UserType | null>{
        return await usersCollection.findOne({id})
    },

    async deleteUser(id: ObjectId):Promise<boolean>{
        const res = await usersCollection.deleteOne({id})
        return res.acknowledged
    },

    async findByConfirmCode(code:string):Promise<UserType | null>{
        return await usersCollection.findOne({"emailConfirmation.confirmationCode":code})
    },

    async updateConfirm(id:ObjectId):Promise<boolean>{
        const res = await usersCollection.updateOne({id},{$set:{"emailConfirmation.isConfirmed":true}})
        return res.acknowledged
    },
    async updateCode(id:ObjectId,code:string):Promise<boolean>{
        const res = await usersCollection.updateOne({id},{$set:{"emailConfirmation.confirmationCode":code}})
        return res.acknowledged
    }


}