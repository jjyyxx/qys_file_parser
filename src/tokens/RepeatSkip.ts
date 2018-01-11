import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { PairType, TokenType } from './TokenType'

@Token
class RepeatSkip extends BaseToken {
    public static pattern = /./
    public readonly parts: number[]

    constructor(parts: number[]) {
        super(TokenType.RepeatSkip)
        this.parts = parts
    }

    public toString(): string {
        return `[${this.parts.map((value) => value.toString() + '.').reduce((pre, cur) => pre + cur)}]`
    }
}

export { RepeatSkip }
