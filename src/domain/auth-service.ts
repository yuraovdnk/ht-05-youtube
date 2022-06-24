import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";
import {UserType, UserTypeRes} from "../repositories/types";
import {uuid} from "uuidv4";
import {add} from 'date-fns'
import {emailManager} from "../managers/email-manager";
import {usersRepository} from "../repositories/users-repository";


export const authService = {
    async createUser(login: string, email: string, password: string): Promise<UserTypeRes | boolean> {
        const passwordHash = await this.generateHash(password)
        const newUser = {
            id: new ObjectId(),
            accountData: {
                login,
                email,
                passwordHash,
                createdAt: new Date()
            },
            emailConfirmation: {
                confirmationCode: uuid(),
                expirationDate: add(new Date(), {
                    hours: 1
                }),
                isConfirmed: false
            }
        }
        const resultCreated = await usersRepository.createUser(newUser)
        try {
             await emailManager.sendConfirmMail(newUser)
        } catch (e) {

            await usersRepository.deleteUser(newUser.id)
            return false
        }
        return resultCreated
    },

    async confirmEmail(user: UserType,code: string):Promise<boolean> {

        if (user.emailConfirmation.isConfirmed) return false

        if (user.emailConfirmation.confirmationCode !== code) return false

        if (user.emailConfirmation.expirationDate < new Date()) return false

        return await usersRepository.updateConfirm(user.id)

    },

    async resendEmail(user:UserType):Promise<boolean | null>{
        if(user.emailConfirmation.isConfirmed) return false
        const newConfirmCode = uuid()
        await usersRepository.updateCode(user.id,newConfirmCode)
        const userWithUpdated = await usersRepository.findByConfirmCode(newConfirmCode)
        try {
            await emailManager.sendConfirmMail(userWithUpdated!)
            return true
        }
        catch (e){
            return null
        }
    },
    async findByLogin(login:string):Promise<UserType | null>{
        return await usersRepository.findByLogin(login)
    },

    async findByEmail(email:string):Promise<UserType | null>{
        return await usersRepository.findByEmail(email)
    },
    async checkCredentials(login: string, password: string):Promise<UserType | null> {
        const candidate = await usersRepository.findByLogin(login)

        if (!candidate) {
            return null
        }
        if(!candidate.emailConfirmation.isConfirmed) return null

        const validPassword = await bcrypt.compare(password,candidate.accountData.passwordHash)

        if (!validPassword) {
            return null
        }
        return candidate
    },

    async generateHash(password: string) {
        const hash = await bcrypt.hash(password, 10)
        return hash
    },

    async finUserByCode(code:string):Promise<UserType | null>{
        return await usersRepository.findByConfirmCode(code)
    }
}