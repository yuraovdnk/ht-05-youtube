import {Request, Response, Router} from "express";
import {commentsService} from "../domain/comments-service";
import {bearerAuth} from "../middlewares/bearer-auth";
import {ObjectId} from "mongodb";
import {idValidate} from "../middlewares/validators/id-validator";
import {commentValidation} from "../middlewares/validators/comment-validators";


export const commentsRoute = Router()

commentsRoute.get('/:id',idValidate,async (req: Request, res: Response) => {
    const comment = await commentsService.getCommentById(new ObjectId(req.params.id))
    if (comment) {
        res.status(200).send(comment)
        return
    }
    res.sendStatus(404)
})

commentsRoute.put('/:id',bearerAuth,idValidate,commentValidation, async (req: Request, res: Response) => {
    const comment = await commentsService.getCommentById(new ObjectId(req.params.id))

    if (!comment) {
        res.sendStatus(404)
        return
    }

    if (comment.userId.toString() !== req.user!.id.toString()) {
        res.sendStatus(403)
        return
    }
    const isUpdated = await commentsService.updateComment(new ObjectId(req.params.id), req.body.content);
    if (isUpdated) {
        res.sendStatus(204)
        return
    }
})

commentsRoute.delete('/:id', bearerAuth,idValidate, async (req: Request, res: Response) => {
    const comment = await commentsService.getCommentById(new ObjectId(req.params.id))
    if (!comment) {
        res.sendStatus(404)
        return
    }
    if (comment.userId.toString() !== req.user!.id.toString()) {
        res.sendStatus(403)
        return
    }
    const isDeleted = await commentsService.deleteComment(new ObjectId(req.params.id))
    if (isDeleted) {
        res.sendStatus(204)
        return
    }
})