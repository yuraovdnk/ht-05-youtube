
export function errorsGenerator(message:string,field:string){
    return {
        errorsMessages: [
            {
                message,
                field
            }
        ]
    }
}