export const deleteEmpty = (object: { [key: string]: any }) => {
    for (const key of Object.keys(object)) {
        if (!object[key]) {
            delete object[key]
        }
    }

    return object
}
