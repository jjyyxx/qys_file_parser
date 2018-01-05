import { BaseToken } from './BaseToken'
import { TokenType } from './TokenType'

class Tuplet extends BaseToken {
    public readonly count: number

    constructor(count: number) {
        super(TokenType.Tuplet)
        this.count = count
    }
}

export { Tuplet }
