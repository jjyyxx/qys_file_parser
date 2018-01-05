import { BaseToken } from './BaseToken'
import { PairType, TokenType } from './TokenType'

class RepeatBound extends BaseToken {
    public readonly leftOrRight: PairType

    constructor(leftOrRight: PairType) {
        super(TokenType.RepeatBound)
        this.leftOrRight = leftOrRight
    }

    public toString(): string {
        return this.leftOrRight === PairType.Left ? '||:' : ':||'
    }
}

export { RepeatBound }
