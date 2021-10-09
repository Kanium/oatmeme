import { expect } from 'chai'
import { MemeService } from '../../../src/services/Meme.service'
import { Meme } from '../../../src/models/Meme.model'
import TestContext from '../../../src/utils/TestContext'
import { CreateMemeRequest } from '../../../src/models/Meme.model'
import { ObjectId } from 'mongodb'

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
            let creatorId: ObjectId
            let data: string
            let name: string
            let updoots: number
            let downdoots: number
            let test: Meme
            let item: Meme | null

            before(async () => {
                creatorId = new ObjectId()
                data = 'image/data'
                name = 'test'
                updoots = 1
                downdoots = 1
                const inserted: CreateMemeRequest = {
                    name,
                    data,
                    creatorId,
                    updoots,
                    downdoots
                }
                test = await MemeService.instance.create(inserted)
                item = await MemeService.instance.get(test._id)
            })

            it('will have created value which is an instance of meme', async () => {
                expect(test).to.be.an.instanceOf(Meme)
            })

            it('will have returned value which is an instance of meme', () => {
                expect(item).to.be.an.instanceOf(Meme)
            })

            it('will have the returned model equal the created one', () => {
                expect(test.creatorId).to.be.equal(creatorId)
                expect(test.createdAt).to.below(new Date())
                expect(test.data).to.be.equal(data)
                expect(test.downdoots).to.be.equal(downdoots)
                expect(test.updoots).to.be.equal(updoots)
            })
        })
    })
    // describe(MemeService.prototype.list.name, () => {
    //     /*empty*/
    // })
    
    // describe(MemeService.prototype.list.name, () => {
    //     /*empty*/
    // })
})
