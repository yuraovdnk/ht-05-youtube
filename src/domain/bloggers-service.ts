import {bloggersRepository} from "../repositories/bloggers-repository";
import {paginateRes, paginateType} from "../repositories/pagination";
import {bloggerType} from "../repositories/types";
import {ObjectId} from "mongodb";

export const bloggersService = {
    async getBloggers(query: paginateType): Promise<paginateRes> {
        return await bloggersRepository.getBloggers(query)
    },

    async getBloggerById(id: ObjectId): Promise<bloggerType | null> {
        return bloggersRepository.getBloggerById(id)
    },

    async createBlogger(body: bloggerType): Promise<bloggerType> {
        const newBlogger = {
            id: new ObjectId(),
            name: body.name,
            youtubeUrl: body.youtubeUrl
        }
        await bloggersRepository.createBlogger({...newBlogger})
        return newBlogger
    },

    async updateBlogger(id: ObjectId, body: bloggerType): Promise<boolean> {
        return await bloggersRepository.updateBlogger(id, body)
    },

    async deleteBlogger(id: ObjectId): Promise<boolean> {
        return await bloggersRepository.deleteBlogger(id)
    },
}