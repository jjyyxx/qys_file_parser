import { BaseToken } from './BaseToken'
import { PairType, TokenType } from './TokenType'

class AppoggiaturaBound extends BaseToken {
    public readonly leftOrRight: PairType

    constructor(leftOrRight: PairType) {
        super(TokenType.AppoggiaturaBound)
        this.leftOrRight = leftOrRight
    }

    public toString(): string {
        return this.leftOrRight === PairType.Left ? '(' : '^)'
    }
}

export { AppoggiaturaBound }
