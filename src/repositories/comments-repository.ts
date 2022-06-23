import {commentsCollection} from "./db";
import {CommentType} from "./types";
import {ObjectId} from "mongodb";


export const commentsRepository = {
    async getCommentById(id: ObjectId):Promise<CommentType | null> {
        return await commentsCollection.findOne({id})
    },
    async updateComment(id: ObjectId, content: string):Promise<boolean> {
        const result = await commentsCollection.updateOne({id},{$set:{content}})
        return result.acknowledged
    },
    async deleteComment(id: ObjectId):Promise<boolean> {
       const result = await commentsCollection.deleteOne({id})
        return result.acknowledged
    }
}