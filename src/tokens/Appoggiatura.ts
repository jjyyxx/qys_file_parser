import { BaseToken } from './BaseToken'
import { PairType, TokenType } from './TokenType'

class Appoggiatura extends BaseToken {
    public readonly LeftOrRight: number

    constructor(LeftOrRight: PairType) {
        super(TokenType.Appoggiatura)
        this.LeftOrRight = LeftOrRight
    }
}

export { Appoggiatura }
