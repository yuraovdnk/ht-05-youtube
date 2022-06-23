import {MongoClient} from "mongodb";
import {bloggerType, CommentType, ipAdressesType, postsType, UserType} from "./types";
import {settings} from "../settings";


const client = new MongoClient(settings.MONGODB)
export const db = client.db('youtube')
export const bloggerCollection = db.collection<bloggerType>("bloggers")
export const postsCollection = db.collection<postsType>("posts")
export const usersCollection = db.collection<UserType>("users")
export const commentsCollection = db.collection<CommentType>("comments")
export const ipAddressesCollection = db.collection<ipAdressesType>("ip-addresses")

export async function runDb() {
    try {
        await client.connect()
        console.log("Succesfully connected to "+ settings.MONGODB)

    } catch (e) {
        console.log("Not connected to db", e)
        console.log(settings.MONGODB)
        await client.close()
    }
}