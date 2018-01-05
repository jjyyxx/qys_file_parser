import { BaseToken } from './BaseToken'
import { TokenType } from './TokenType'

class Chord extends BaseToken {
    constructor() {
        super(TokenType.Chord)
    }
}

export { Chord }
