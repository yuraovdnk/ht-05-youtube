import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";
import {UserType, UserTypeRes} from "../repositories/types";
import {uuid} from "uuidv4";
import {add} from 'date-fns'
import {emailManager} from "../managers/email-manager";
import {usersRepository} from "../repositories/users-repository";
import {usersCollection} from "../repositories/db";


export const authService = {
    async createUser(login: string, email: string, password: string): Promise<UserTypeRes | boolean> {
        const candidate = await usersRepository.findByLoginOrEmail(login,email)
        if (candidate) {
            return false
        }
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

    async confirmEmail(code: string):Promise<boolean> {
        const user = await usersRepository.findByConfirmCode(code)

        if (!user) return false

        if (user.emailConfirmation.isConfirmed) return false

        if (user.emailConfirmation.confirmationCode !== code) return false

        if (user.emailConfirmation.expirationDate < new Date()) return false

        return await usersRepository.updateConfirm(user.id)

    },

    async resendEmail(email:string):Promise<boolean | null>{
        const user = await usersCollection.findOne({"accountData.email":email})
        if(!user) return false

        if(user.emailConfirmation.isConfirmed) return false

        try {
            await emailManager.sendConfirmMail(user)
            return true
        }
        catch (e){
            return null
        }
    },

    async checkCredentials(login: string, password: string):Promise<UserType | null> {
        const candidate = await usersRepository.findByLoginOrEmail(login)

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
}