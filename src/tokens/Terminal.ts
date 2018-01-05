import { BaseToken } from './BaseToken'
import { TokenType } from './TokenType'

class Terminal extends BaseToken {
    constructor() {
        super(TokenType.Terminal)
    }

    public toString(): string {
        return '||'
    }
}

export { Terminal }
