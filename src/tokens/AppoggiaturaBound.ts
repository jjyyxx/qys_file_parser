import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { PairType, TokenType } from './TokenType'

@Token
class AppoggiaturaBound extends BaseToken {
    public static pattern = /./
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
