import {UserType} from "../repositories/types";
import {emailAdapter} from "../adapters/email-adapter";

export const emailManager = {
    async sendConfirmMail(user:UserType){
        const t = await emailAdapter.sendEmail(user)
        console.log(t)
        return t
    }
}