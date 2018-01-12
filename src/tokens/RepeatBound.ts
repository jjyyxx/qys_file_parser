import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { PairType, TokenType } from './TokenType'

@Token
class RepeatBound extends BaseToken {
    public static pattern = /^(\|\|:|:\|\|)/
    public readonly leftOrRight: PairType

    constructor(matched: RegExpMatchArray) {
        super(TokenType.RepeatBound)
        switch (matched[0]) {
            case '||:':
                this.leftOrRight = PairType.Left
                break
            case ':||':
                this.leftOrRight = PairType.Right
                break
        }
    }

    public toString(): string {
        return this.leftOrRight === PairType.Left ? '||:' : ':||'
    }
}

export { RepeatBound }
