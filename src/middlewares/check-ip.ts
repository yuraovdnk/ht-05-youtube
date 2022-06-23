import {NextFunction, Request, Response} from "express";
import {ipAddressesCollection, usersCollection} from "../repositories/db";
import {subSeconds} from "date-fns";

export const checkIp = async (req: Request, res: Response, next: NextFunction) => {

    const ipQuery = {
        ip: req.ip,
        endpoint: req.baseUrl + req.path,
        date: new Date()
    }
    await ipAddressesCollection.insertOne(ipQuery)

    let currentDate = new Date()
    const pastDate = subSeconds(currentDate, 10)

    const count = await ipAddressesCollection.countDocuments({
        ip: ipQuery.ip,
        endpoint: ipQuery.endpoint,
        date: {$gte: pastDate, $lte: currentDate}
    })
    console.log(count)
    await ipAddressesCollection.deleteMany({
        ip: ipQuery.ip,
        endpoint: ipQuery.endpoint,
        date: {$lt: pastDate}
    })
    if (count > 5) {
        res.sendStatus(429)
        return
    }
    next()
}