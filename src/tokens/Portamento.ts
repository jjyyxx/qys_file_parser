import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Portamento extends BaseToken {
    public static pattern = /^~/

    constructor(startIndex: number) {
        super(TokenType.Portamento, startIndex)
    }

    public toString() {
        return '~'
    }
}

export { Portamento }
