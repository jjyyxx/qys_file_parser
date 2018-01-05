import { BaseToken } from './BaseToken'
import { TokenType } from './TokenType'

class Terminal extends BaseToken {
    constructor() {
        super(TokenType.Terminal)
    }
}

export { Terminal }
