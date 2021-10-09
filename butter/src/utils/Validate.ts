import { ObjectId } from 'mongodb'
import { isNumber, isString } from 'lodash'

export class ValidationError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export default class Validate {
    public static String(value: any, property: string, dontThrow?: boolean) {
        if (value && isString(value)) {
            return value
        }

        if (dontThrow) {
            return ''
        }

        throw new ValidationError(`property ${property} is not a string`)
    }

    public static ObjectId(value: any, property: string, dontThrow?: boolean) {
        if (value) {
            try {
                const ob = new ObjectId(value)
                if (ob instanceof ObjectId && ob.equals(value)) {
                    return value
                }
            } catch (e) {}
        }

        if (dontThrow) {
            return new ObjectId()
        }

        throw new ValidationError(`property ${property} is not an ObjectId`)
    }

    public static Number(value: any, property: string, dontThrow?: boolean) {
        if (value && isNumber(value)) {
            return value
        }

        if (dontThrow) {
            return 0
        }

        throw new ValidationError(`property ${property} is not a number`)
    }
}
