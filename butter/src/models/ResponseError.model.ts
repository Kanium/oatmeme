export interface ResponseError extends Error {
    status?: number
}

export class ResponseError extends Error implements ResponseError {
    public status?: number

    constructor(message: string, status?: number, stack?: any) {
        super(message)
        this.status = status ?? 500
        this.stack = stack
    }
}