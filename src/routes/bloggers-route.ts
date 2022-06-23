import {Request, Response, Router} from "express";
import {bloggersService} from "../domain/bloggers-service";
import {paginateType} from "../repositories/pagination";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {postsService} from "../domain/posts-service";
import {basicAuth} from "../middlewares/basic-auth";
import {postsValidate} from "../middlewares/validators/posts-validator";
import {bloggersValidate} from "../middlewares/validators/bloggers-validator";
import {ObjectId} from "mongodb";
import {idValidate} from "../middlewares/validators/id-validator";


export const bloggersRoute = Router()

bloggersRoute.get('/', async (req: Request, res: Response) => {
    const bloggers = await bloggersService.getBloggers(req.query as paginateType)
    res.status(200).send(bloggers)
})

bloggersRoute.get('/:id',idValidate, async (req: Request, res: Response) => {

    const blogger = await bloggersService.getBloggerById(new ObjectId(req.params.id))
    if (blogger) {
        res.status(200).send(blogger)
        return
    }
    res.sendStatus(404)
})

bloggersRoute.post('/', basicAuth, bloggersValidate, async (req: Request, res: Response) => {
    const newBlogger = await bloggersService.createBlogger(req.body)
    if (newBlogger) {
        res.status(201).send(newBlogger)
        return
    }
    res.sendStatus(404)
})

bloggersRoute.put('/:id', basicAuth,idValidate, bloggersValidate, async (req: Request, res: Response) => {
    const foundBlogger = await bloggersRepository.getBloggerById(new ObjectId(req.params.id))
    if (foundBlogger) {
        const isUpdated = await bloggersService.updateBlogger(new ObjectId(req.params.id), req.body)
        if (isUpdated) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(400)
        return

    }
    res.sendStatus(404)
})

bloggersRoute.delete('/:id', basicAuth,idValidate, async (req: Request, res: Response) => {
    const isDeleted = await bloggersService.deleteBlogger(new ObjectId(req.params.id))
    if (isDeleted) {
        res.sendStatus(204)
        return
    }
    res.sendStatus(404)
})


bloggersRoute.get('/:bloggerId/posts',idValidate, async (req: Request, res: Response) => {
    const bloggerExist = await bloggersService.getBloggerById(new ObjectId(req.params.bloggerId))
    if (bloggerExist) {
        const post = await postsService.getPostByBloggerId(new ObjectId(req.params.bloggerId), req.query as paginateType)
        res.status(200).send(post)
        return
    }
    res.sendStatus(404)
})

bloggersRoute.post('/:bloggerId/posts', basicAuth,idValidate, postsValidate, async (req: Request, res: Response) => {
    const blogger = await bloggersService.getBloggerById(new ObjectId(req.params.bloggerId))
    if (blogger) {
        const createdPost = await postsService.createPost(req.body, blogger)
        return res.status(201).send(createdPost)
    }
    res.sendStatus(404)
})


