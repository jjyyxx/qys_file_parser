import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Terminal extends BaseToken {
    public static pattern = /./
    constructor() {
        super(TokenType.Terminal)
    }

    public toString(): string {
        return '||'
    }
}

export { Terminal }
