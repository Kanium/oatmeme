import { MemeService } from '../services/Meme.service'
import { Logger } from '../utils/Logger'

export class MemeController {
    private _logger: Logger
    private _service: MemeService

    constructor() {
        this._logger = new Logger('MemeController')
        this._service = MemeService.instance
    }
}
