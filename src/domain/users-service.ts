
import {ObjectId} from "mongodb";
import {usersRepository} from "../repositories/users-repository";
import {UserType, UserTypeRes} from "../repositories/types";
import {paginateRes, paginateType} from "../repositories/pagination";


export const usersService = {

    async getAllUsers(query:paginateType):Promise<paginateRes>{
        return await usersRepository.getAllUsers(query)
    },

    async deleteUser(id: ObjectId): Promise<boolean> {
        return await usersRepository.deleteUser(id)
    },

    async getUserById(id: ObjectId): Promise<UserType | null> {//for delete
        return usersRepository.findById(id)
    }

}