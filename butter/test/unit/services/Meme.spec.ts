import { expect } from 'chai'
import { MemeService } from '../../../src/services/Meme.service'
import TestContext from '../../../src/utils/TestContext'

class MemeTestContext extends TestContext {
    public memes: MemeService | undefined

    public async setup() {
        await super.setup()
        this.memes = MemeService.instanceWithConnection(this.connector!)
        const waitTime = 500
        console.log(`Waiting for ${waitTime}ms.`)
        await this.delay(waitTime)
    }

    public async cleanup() {
        if (await this.memes?.collection.countDocuments()) {
            await this.memes?.collection.drop()
        }
        await super.cleanup()
        const waitTime = 500
        console.log(`Waiting for ${waitTime}ms.`)
        await this.delay(waitTime)
    }

    public async createDummyData() {
        /* empty */
    }
}

describe(MemeService.name, () => {
    describe(MemeService.prototype.create.name, () => {
        let context: MemeTestContext

        before(async () => {
            context = new MemeTestContext()
            await context.setup()
        })

        after(async () => {
            await context.cleanup()
        })

        describe('when creating a meme', () => {
            before(async () => {
                /* empty */
            })

            it.only('will have created value which is an instance of meme', () => {
                console.log('in this test')
            })

            it('will have returned value which is an instance of meme')

            it('will have the returned model equal the created one')
        })
    })
})
