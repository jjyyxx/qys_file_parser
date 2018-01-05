import { BaseToken } from './BaseToken'
import { TokenType } from './TokenType'

class Measure extends BaseToken {
    constructor() {
        super(TokenType.Measure)
    }
}

export { Measure }
