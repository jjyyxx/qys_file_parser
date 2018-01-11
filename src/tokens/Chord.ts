import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Chord extends BaseToken {
    public static pattern = /./
    constructor() {
        super(TokenType.Chord)
    }

    public toString(): string {
        return '&'
    }
}

export { Chord }
