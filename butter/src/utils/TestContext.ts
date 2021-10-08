import MongoConnector from './MongoConnector'

export default class TestContext {
    private _connector: MongoConnector | null = null

    public get connector() {
        return this._connector
    }

    public get db() {
        return this._connector?.db
    }

    /**
     * Sets up a new mongo connection with the given configuartion of the instance
     */
    public async setup() {
        this._connector = new MongoConnector(`TEST-DB-${Date.now()}`)
        await this._connector.awaitConnection()
    }

    /**
     * clears the mongo db and closes the conenction that is open
     */
    public async cleanup() {
        if (this.connector) {
            await this.db?.dropDatabase()
            await this.connector.close()
            this._connector = null
        }
    }

    public async delay(milliseconds: number) {
        await new Promise((r) => {
            setTimeout(r, milliseconds)
        })
    }

    /**
     * a utility function to help retrieve errors that are thrown as a result of exceptions
     *
     * @param thrower The function that might throw an error
     * @returns The error that the function threw
     */
    public async catch(thrower: Promise<any> | any): Promise<any | undefined> {
        try {
            await thrower
            return undefined
        } catch (error) {
            return error
        }
    }
}
