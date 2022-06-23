import {ObjectId, WithId} from "mongodb";

export type ipAdressesType = {
    ip: string,
    endpoint: string,
    date: Date
}

export type bloggerType = {
    id: ObjectId
    name: string
    youtubeUrl: string
}
export type postsType = {
    id: ObjectId
    title: string
    shortDescription: string
    content: string
    bloggerId: ObjectId
}
export type AccountDataType = {
    login: string,
    email: string,
    passwordHash: string,
    createdAt: Date,
}
export type UserType = {
    id: ObjectId
    accountData: AccountDataType,
    emailConfirmation: EmailConfirmationType
}

type EmailConfirmationType = {
    confirmationCode: string,
    expirationDate: Date,
    isConfirmed: boolean
}

export type UserTypeRes = {
    id: ObjectId,
    login: string
}
export type CommentType = {
    id: ObjectId,
    content: string,
    userId: ObjectId,
    postId?: ObjectId,
    userLogin?: string,
    addedAt: Date
}

