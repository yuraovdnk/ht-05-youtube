import {commentsRepository} from "../repositories/comments-repository";
import {CommentType} from "../repositories/types";
import {ObjectId} from "mongodb";


export const commentsService = {

    async getCommentById(id:ObjectId):Promise<CommentType | null>{
        const comment = await commentsRepository.getCommentById(id)
        if(comment){
            return {
                id:comment.id ,
                content: comment.content,
                userId: comment.userId,
                userLogin: comment.userLogin,
                addedAt: comment.addedAt
            }
        }
        return null
    },

    async updateComment(id: ObjectId,content:string):Promise<boolean> {
        return await commentsRepository.updateComment(id,content)
    },
    async deleteComment(id: ObjectId):Promise<boolean> {
        return await commentsRepository.deleteComment(id)

    }
}