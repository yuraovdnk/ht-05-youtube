import {Collection} from "mongodb";
import {UserType} from "./types";

export type paginateType = {
    PageSize:string,
    PageNumber:string,
    SearchNameTerm:string
}
export type paginateRes = {
    pagesCount: number
    page: number,
    pageSize: number,
    totalCount: number,
    items: UserType[]
}
export async function pagination (query:paginateType, filter:object, collection:Collection<any>, options?: object):Promise<paginateRes> {
    let optionObj = {
        projection: {
            _id: false,
            ...options
        }
    }
    let pageSize = +query.PageSize || 10
    let pageNumber = +query.PageNumber || 1

    let skip = pageSize * (pageNumber - 1)

    const items =  await collection.find(filter,optionObj).skip(skip).limit(pageSize).toArray()
    let totalCount = await collection.countDocuments(filter)
    let obj = {
        pagesCount: Math.ceil(totalCount / pageSize),
        page: pageNumber,
        pageSize,
        totalCount,
        items
    }
    return obj
}