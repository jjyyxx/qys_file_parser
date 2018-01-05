import { BaseToken } from './BaseToken'
import { TokenType } from './TokenType'

class Chord extends BaseToken {
    constructor() {
        super(TokenType.Chord)
    }

    public toString(): string {
        return '&'
    }
}

export { Chord }
