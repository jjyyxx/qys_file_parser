import { BaseToken } from './BaseToken'
import { PairType, TokenType } from './TokenType'

class RepeatSkip extends BaseToken {
    public readonly parts: number[]

    constructor(parts: number[]) {
        super(TokenType.RepeatSkip)
        this.parts = parts
    }
}

export { RepeatSkip }
