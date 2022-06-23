import {paginateRes, paginateType} from "../repositories/pagination";
import {postsRepository} from "../repositories/posts-repository";
import {bloggerType, CommentType, postsType, UserType} from "../repositories/types";
import {ObjectId} from "mongodb";

export const postsService = {
    async getPosts(query: paginateType): Promise<paginateRes> {
        return await postsRepository.getPosts(query)
    },

    async getPostById(id: ObjectId): Promise<postsType | null> {
        return await postsRepository.getPostById(id)
    },

    async createPost(body: postsType, blogger: bloggerType): Promise<postsType | boolean> {
        const newPost = {
            id: new ObjectId,
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            bloggerId: blogger.id,
            bloggerName: blogger.name
        }

        const result = await postsRepository.createPost({...newPost})
        if (result) {
            return newPost
        }
        return result
    },

    async updatePost(body: postsType, id: ObjectId): Promise<boolean> {
        return await postsRepository.updatePost(body, id)
    },

    async deletePost(id: ObjectId): Promise<boolean> {
        return await postsRepository.deletePost(id)
    },

    async getPostByBloggerId(bloggerId: ObjectId, query: paginateType): Promise<paginateRes> {
        return await postsRepository.getPostByBloggerId(bloggerId, query)
    },
///comment
    async createComment(postId: ObjectId, content: string, user: UserType): Promise<CommentType | boolean> {
        const newComment = {
            id: new ObjectId(),
            content,
            postId,
            userId: user.id,
            userLogin:user.accountData.login,
            addedAt: new Date()
        }
        const comment = await postsRepository.createComment(newComment)
        if (comment) {
            return {
                id: newComment.id,
                content: newComment.content,
                userId: user.id,
                userLogin: newComment.userLogin,
                addedAt: newComment.addedAt
            }
        }
        return false

    },

    async getCommentByPostId(postId: ObjectId, query: paginateType): Promise<paginateRes> {
        return await postsRepository.getCommentByPostId(postId, query)
    }
}